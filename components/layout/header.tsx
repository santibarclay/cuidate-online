'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu, User } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isLandingPage = pathname === '/';
  
  if (isLandingPage) {
    return null; // Don't show header on landing page
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-security-blue" />
            <span className="text-xl font-bold text-gray-900">{SITE_NAME}</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                pathname === '/dashboard' 
                  ? 'text-security-blue' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/leaderboard"
              className={`text-sm font-medium transition-colors ${
                pathname === '/leaderboard' 
                  ? 'text-security-blue' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Ranking
            </Link>
            <Link 
              href="/profile"
              className={`text-sm font-medium transition-colors ${
                pathname === '/profile' 
                  ? 'text-security-blue' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="h-5 w-5" />
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link 
              href="/dashboard"
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                pathname === '/dashboard'
                  ? 'text-security-blue bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/leaderboard"
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                pathname === '/leaderboard'
                  ? 'text-security-blue bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Ranking
            </Link>
            <Link 
              href="/profile"
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                pathname === '/profile'
                  ? 'text-security-blue bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Perfil
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}