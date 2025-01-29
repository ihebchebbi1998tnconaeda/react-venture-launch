import React from 'react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className="fixed top-0 right-0 left-72 h-16 bg-dashboard-topbar border-b border-border/40 flex items-center justify-between px-6 z-10">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/822785e2-1af0-42b6-b6a6-adde97b0442b.png" 
          alt="Logo" 
          className="h-8 w-auto"
        />
      </div>
      <div className="flex items-center">
        <Link 
          to="/app/settings" 
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <User className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-600">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;