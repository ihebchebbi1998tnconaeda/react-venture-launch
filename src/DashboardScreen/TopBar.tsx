import React from 'react';
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';
import { toast } from '@/components/ui/use-toast';

const TopBar = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.clear();
    
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    
    // Redirect to login page
    window.location.href = '/';
  };

  return (
    <div className={`fixed top-0 ${isMobile ? 'left-0 right-0' : 'right-0 left-72'} h-16 bg-dashboard-topbar border-b border-border/40 flex items-center justify-between px-6 z-10 transition-all duration-300`}>
      <div className="flex items-center">
       
      </div>
      <button 
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-600"
      >
        <LogOut className="h-5 w-5" />
        <span className="text-sm font-medium hidden sm:inline">Déconnecter</span>
      </button>
    </div>
  );
};

export default TopBar;