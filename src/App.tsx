import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './DashboardScreen/Sidebar';
import MainContent from './DashboardScreen/MainContent';
import TopBar from './DashboardScreen/TopBar';
import UserSettings from './DashboardScreen/UserSettings';
import Clients from './DashboardScreen/Clients';
import Videos from './DashboardScreen/Videos';
import Seasons from './DashboardScreen/Seasons';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
    return user ? element : <Navigate to="https://platform.draminesaid.com/" replace />;
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-dashboard-background text-white">
        <Sidebar user={user} />
        <div className="flex-1 ml-72">
          <TopBar />
          <Routes>
            <Route path="/" element={<MainContent user={user} />} />
            <Route path="/app/settings" element={<ProtectedRoute element={<UserSettings user={user} />} />} />
            <Route path="/app/clients" element={<ProtectedRoute element={<Clients user={user} />} />} />
            <Route path="/app/upload" element={<ProtectedRoute element={<Videos user={user} />} />} />
            <Route path="/app/seasons" element={<ProtectedRoute element={<Seasons />} />} />
            <Route path="/app" element={<MainContent user={user} />} />
          </Routes>
          <footer className="p-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} <a href="http://draminesaid.com" className="hover:text-primary">draminesaid.com</a>
          </footer>
        </div>
      </div>
    </Router>
  );
};

export default App;