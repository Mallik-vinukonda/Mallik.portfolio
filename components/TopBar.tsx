import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery } from 'lucide-react';

const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="h-7 bg-[#1D1D1D] text-gray-300 flex justify-between items-center px-4 text-xs font-ubuntu shadow-md z-50 relative select-none">
      <div className="flex items-center space-x-4">
        <span className="font-bold hover:text-white cursor-pointer">Activities</span>
        <span className="hover:text-white cursor-pointer">Mallik Portfolio</span>
      </div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 font-medium">
        {formatDate(time)}
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 hover:bg-[#333] px-2 py-1 rounded cursor-pointer">
          <span className="hidden md:inline">en</span>
          <Wifi size={14} />
          <Volume2 size={14} />
          <Battery size={14} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;