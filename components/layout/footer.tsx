import Link from 'next/link';
import { Shield } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-security-blue" />
            <span className="text-lg font-semibold text-gray-900">{SITE_NAME}</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600">
            <Link href="/about" className="hover:text-gray-900">
              Sobre Santiago
            </Link>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>
            {SITE_NAME} © 2025 - Un proyecto de{' '}
            <a 
              href="https://www.linkedin.com/in/santibarclay/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-security-blue hover:underline"
            >
              Santiago Barclay
            </a>
          </p>
          <p className="mt-1 text-xs">
            Desarrollado 100% con IA • Powered by{' '}
            <a 
              href="https://akua.la" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-security-blue hover:underline"
            >
              Akua
            </a>
            {' '}• Built with{' '}
            <a 
              href="https://claude.ai/code" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-security-blue hover:underline"
            >
              Claude Code
            </a>
          </p>
          <p className="mt-2">
            Protegé tu vida digital, paso a paso 🛡️
          </p>
        </div>
      </div>
    </footer>
  );
}