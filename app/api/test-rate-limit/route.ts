import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing rate limit...');
    
    const rateLimitResult = await checkRateLimit(request);
    const headers = getRateLimitHeaders(rateLimitResult);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: rateLimitResult.error,
          remaining: rateLimitResult.remaining,
          resetTime: new Date(rateLimitResult.resetTime).toISOString()
        },
        { 
          status: 429, 
          headers 
        }
      );
    }

    return NextResponse.json({
      message: 'Rate limit test passed',
      remaining: rateLimitResult.remaining,
      resetTime: new Date(rateLimitResult.resetTime).toISOString(),
      allowedRequests: true
    }, {
      headers
    });

  } catch (error) {
    console.error('Rate limit test error:', error);
    return NextResponse.json(
      { error: 'Test failed' },
      { status: 500 }
    );
  }
}