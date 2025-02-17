import React, { useState, useEffect } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);

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

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full bg-white shadow-xl transition-all duration-300 ease-in-out z-40
          ${isOpen ? 'w-72 translate-x-0' : isMobile ? '-translate-x-full w-72' : 'w-72'}`}
      >
        {/* Content */}
        <div className="relative flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center justify-center">
            <img 
              src="/lovable-uploads/822785e2-1af0-42b6-b6a6-adde97b0442b.png" 
              alt="Logo" 
              className="h-18 w-auto object-contain"
            />
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => isMobile && setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
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

          {/* Bottom section */}
          <div className="p-6 border-t border-gray-200">
            <div className="text-sm text-center text-gray-500">
              Version 1.0.0
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;