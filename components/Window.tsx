import React from 'react';
import { X, Minus, Square } from 'lucide-react';
import { WindowAction } from '../types';

interface WindowProps {
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  onAction: (action: WindowAction) => void;
  onFocus: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const Window: React.FC<WindowProps> = ({
  title,
  isOpen,
  isMinimized,
  zIndex,
  onAction,
  onFocus,
  children,
  width = "w-11/12 md:w-3/4",
  height = "h-3/4"
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        ${width} ${height} bg-[#333] rounded-t-lg shadow-2xl border border-gray-700 flex flex-col overflow-hidden transition-all duration-200
        ${isMinimized ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100 animate-popIn'}
      `}
      style={{ zIndex }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div className="h-10 bg-[#2c2c2c] border-b border-black flex items-center justify-between px-3 select-none">
        <span className="text-gray-200 font-ubuntu font-medium text-sm text-center w-full ml-16">
            {title}
        </span>
        
        <div className="flex items-center space-x-2">
            {/* Ubuntu style controls */}
            <button 
                onClick={(e) => { e.stopPropagation(); onAction('MINIMIZE'); }}
                className="w-5 h-5 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center text-white transition-colors"
            >
                <Minus size={10} />
            </button>
            <button 
                className="w-5 h-5 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center text-white transition-colors"
            >
                <Square size={8} />
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); onAction('CLOSE'); }}
                className="w-5 h-5 rounded-full bg-orange-600 hover:bg-orange-500 flex items-center justify-center text-white transition-colors"
            >
                <X size={10} />
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#F7F7F7] overflow-auto custom-scrollbar text-gray-900 relative">
        {children}
      </div>
    </div>
  );
};

export default Window;