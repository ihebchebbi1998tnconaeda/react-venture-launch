
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Sidebar from './DashboardScreen/Sidebar';
import MainContent from './DashboardScreen/MainContent';
import TopBar from './DashboardScreen/TopBar';
import UserSettings from './DashboardScreen/UserSettings';
import Clients from './DashboardScreen/Clients';
import Videos from './DashboardScreen/Videos';
import Seasons from './DashboardScreen/Seasons';
import LoginPage from './pages/LoginPage';
import NotActivePage from './pages/NotActivePage';
import { useIsMobile } from './hooks/use-mobile';

const prefetchUsers = async () => {
  const response = await axios.get('https://plateform.draminesaid.com/app/get_usersnew.php?page=1&limit=10', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to fetch users");
  }
  
  return response.data;
};

const App = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user?.id) {
      // Prefetch users data as soon as user is logged in
      queryClient.prefetchQuery({
        queryKey: ['users', 1, 10, ''],
        queryFn: () => prefetchUsers(),
        staleTime: 1000 * 60 * 5, // 5 minutes
      });
    }
  }, [user?.id, queryClient]);

  const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
    return user?.id ? element : <Navigate to="/" replace />;
  };

  const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex min-h-screen bg-dashboard-background text-white">
        <Sidebar user={user} />
        <div className={`flex-1 ${isMobile ? 'ml-0' : 'ml-72'} transition-all duration-300`}>
          <TopBar />
          {children}
          <footer className="p-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} <a href="http://draminesaid.com" className="hover:text-primary">draminesaid.com</a>
          </footer>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={user?.id ? <Navigate to="/app" replace /> : <LoginPage />} />
        <Route path="/not-active" element={<NotActivePage />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute
              element={
                <AuthLayout>
                  <MainContent user={user} />
                </AuthLayout>
              }
            />
          }
        />
        <Route
          path="/app/clients"
          element={
            <ProtectedRoute
              element={
                <AuthLayout>
                  <Clients user={user} />
                </AuthLayout>
              }
            />
          }
        />
        <Route
          path="/app/settings"
          element={
            <ProtectedRoute
              element={
                <AuthLayout>
                  <UserSettings user={user} />
                </AuthLayout>
              }
            />
          }
        />
        <Route
          path="/app/upload"
          element={
            <ProtectedRoute
              element={
                <AuthLayout>
                  <Videos user={user} />
                </AuthLayout>
              }
            />
          }
        />
        <Route
          path="/app/seasons"
          element={
            <ProtectedRoute
              element={
                <AuthLayout>
                  <Seasons />
                </AuthLayout>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
