'use client';

import Link from 'next/link';

interface LinkifiedTextProps {
  text: string;
  className?: string;
}

export function LinkifiedText({ text, className }: LinkifiedTextProps) {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  
  // Split text by URLs and create array of text and link parts
  const parts = text.split(urlRegex);
  
  return (
    <span className={`break-words ${className || ''}`}>
      {parts.map((part, index) => {
        // If part matches URL pattern, render as link
        if (urlRegex.test(part)) {
          return (
            <Link
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-security-blue hover:underline font-medium inline-flex items-center break-all"
            >
              <span className="break-all">{part}</span>
              <svg className="w-3 h-3 ml-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          );
        }
        // Otherwise render as normal text
        return part;
      })}
    </span>
  );
}