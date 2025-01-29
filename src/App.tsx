import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './DashboardScreen/Sidebar';
import MainContent from './DashboardScreen/MainContent';
import TopBar from './DashboardScreen/TopBar';
import UserSettings from './DashboardScreen/UserSettings';
import Clients from './DashboardScreen/Clients';
import Videos from './DashboardScreen/Videos';
import Seasons from './DashboardScreen/Seasons';
import LoginPage from './pages/LoginPage';
import NotActivePage from './pages/NotActivePage';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
    return user?.id ? element : <Navigate to="/" replace />;
  };

  const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex min-h-screen bg-dashboard-background text-white">
        <Sidebar user={user} />
        <div className="flex-1 ml-72">
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