'use client';

import { ChevronDown, Gamepad2 } from 'lucide-react';

interface InteractiveIndicatorProps {
  onClick?: () => void;
  text?: string;
}

export function InteractiveIndicator({ onClick, text = "Práctica interactiva disponible" }: InteractiveIndicatorProps) {
  return (
    <div 
      className="md:hidden fixed bottom-4 left-4 right-4 z-40 animate-bounce"
      onClick={onClick}
    >
      <div className="bg-gradient-to-r from-security-blue to-green-500 text-white p-3 rounded-lg shadow-lg flex items-center justify-center space-x-2 cursor-pointer">
        <Gamepad2 className="h-5 w-5" />
        <span className="text-sm font-medium">{text}</span>
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
}