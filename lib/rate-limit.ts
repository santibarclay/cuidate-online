import { NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitData {
  [ip: string]: RateLimitEntry;
}

// Configuration
const RATE_LIMIT_MAX = 3; // Maximum requests per window
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const RATE_LIMIT_FILE = path.join(process.cwd(), 'rate-limit.json');

async function loadRateLimitData(): Promise<RateLimitData> {
  try {
    const data = await fs.readFile(RATE_LIMIT_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is invalid, return empty object
    return {};
  }
}

async function saveRateLimitData(data: RateLimitData): Promise<void> {
  try {
    await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving rate limit data:', error);
  }
}

function getClientIP(request: NextRequest): string {
  // Try to get IP from various headers (Vercel, CloudFlare, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp.trim();
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  
  // Fallback to a default IP for development
  return '127.0.0.1';
}

function cleanupExpiredEntries(data: RateLimitData): RateLimitData {
  const now = Date.now();
  const cleaned: RateLimitData = {};
  
  for (const [ip, entry] of Object.entries(data)) {
    if (entry.resetTime > now) {
      cleaned[ip] = entry;
    }
  }
  
  return cleaned;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  error?: string;
}

export async function checkRateLimit(request: NextRequest): Promise<RateLimitResult> {
  try {
    const ip = getClientIP(request);
    const now = Date.now();
    
    console.log('Rate limit check for IP:', ip);
    
    // Load current data
    let data = await loadRateLimitData();
    
    // Clean up expired entries
    data = cleanupExpiredEntries(data);
    
    // Get or create entry for this IP
    let entry = data[ip];
    
    if (!entry) {
      // First request from this IP
      entry = {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW
      };
      data[ip] = entry;
      
      await saveRateLimitData(data);
      
      return {
        allowed: true,
        remaining: RATE_LIMIT_MAX - 1,
        resetTime: entry.resetTime
      };
    }
    
    // Check if window has expired
    if (now >= entry.resetTime) {
      // Reset the window
      entry.count = 1;
      entry.resetTime = now + RATE_LIMIT_WINDOW;
      data[ip] = entry;
      
      await saveRateLimitData(data);
      
      return {
        allowed: true,
        remaining: RATE_LIMIT_MAX - 1,
        resetTime: entry.resetTime
      };
    }
    
    // Check if limit exceeded
    if (entry.count >= RATE_LIMIT_MAX) {
      const resetDate = new Date(entry.resetTime);
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        error: `Límite de ${RATE_LIMIT_MAX} consultas por 24 horas excedido. Reinicia el ${resetDate.toLocaleDateString('es-AR')} a las ${resetDate.toLocaleTimeString('es-AR')}.`
      };
    }
    
    // Increment count
    entry.count += 1;
    data[ip] = entry;
    
    await saveRateLimitData(data);
    
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX - entry.count,
      resetTime: entry.resetTime
    };
    
  } catch (error) {
    console.error('Rate limiting error:', error);
    // In case of error, allow the request (fail open)
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX - 1,
      resetTime: Date.now() + RATE_LIMIT_WINDOW
    };
  }
}

export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.resetTime.toString(),
  };
}