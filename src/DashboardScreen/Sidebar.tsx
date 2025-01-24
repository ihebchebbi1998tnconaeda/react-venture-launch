import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  History, 
  Users, 
  Upload,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/app/', icon: LayoutDashboard, label: 'Tableau de bord' },
    { path: '/app/settings', icon: Settings, label: 'Paramètres' },
    { path: '/app/history', icon: History, label: 'Historique' },
    { path: '/app/clients', icon: Users, label: 'Clients' },
    { path: '/app/upload', icon: Upload, label: 'Vidéos' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-dashboard-sidebar border-r border-border/40 text-gray-600 p-4">
      <div className="mb-8 flex items-center gap-2">
        <h1 className="text-xl font-bold text-primary">Tableau de bord</h1>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-primary text-white shadow-md'
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
    </div>
  );
};

export default Sidebar;