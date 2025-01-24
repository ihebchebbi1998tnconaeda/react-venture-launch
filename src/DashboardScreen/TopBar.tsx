import React from 'react';
import { Bell, User, Search } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="fixed top-0 right-0 left-64 h-16 bg-dashboard-topbar border-b border-border/40 flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-full bg-gray-50 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 text-sm text-gray-600"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <Bell className="h-5 w-5 text-gray-500 hover:text-primary" />
        </button>
        <div className="h-8 w-[1px] bg-border/40 mx-2"></div>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <User className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-600">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;