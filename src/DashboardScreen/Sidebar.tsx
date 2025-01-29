import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Upload,
  Calendar,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface SidebarProps {
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const menuItems = [
    { path: '/app/', icon: LayoutDashboard, label: 'Tableau de bord' },
    { path: '/app/settings', icon: Settings, label: 'Paramètres' },
    { path: '/app/clients', icon: Users, label: 'Clients' },
    { path: '/app/upload', icon: Upload, label: 'Vidéos' },
    { path: '/app/seasons', icon: Calendar, label: 'Saisons' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-primary rounded-lg text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full bg-dashboard-sidebar text-gray-600 overflow-hidden transition-all duration-300 ${
          isOpen ? 'w-72' : 'w-0'
        } ${isMobile ? 'z-40' : ''}`}
        data-color="purple"
      >
        {/* Background overlay with gradient and image */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#9b87f5]/30 to-[#7E69AB]/30 z-0"
          style={{ 
            backgroundImage: 'url(/lovable-uploads/822785e2-1af0-42b6-b6a6-adde97b0442b.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
            opacity: 0.1
          }} 
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-10 flex items-center justify-center h-16">
            <img 
              src="/lovable-uploads/822785e2-1af0-42b6-b6a6-adde97b0442b.png" 
              alt="Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => isMobile && setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon 
                      size={20} 
                      className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'}
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight 
                    size={16} 
                    className={`transform transition-transform duration-200 ${
                      isActive ? 'text-white rotate-90' : 'text-gray-400 group-hover:text-primary'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Bottom section with gradient border */}
          <div className="mt-auto pt-6 border-t border-gray-200/10">
            <div className="text-sm text-gray-500 text-center">
              Version 1.0.0
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;