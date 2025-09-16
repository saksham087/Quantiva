import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Watchlist from './pages/Watchlist';
import AIChat from './pages/AIChat';

// Placeholder components for other pages
const MarketNews = () => <div className="text-gray-900 dark:text-white">Market News Page</div>;
const AIInsightsPage = () => <div className="text-gray-900 dark:text-white">AI Insights Page</div>;
const Analytics = () => <div className="text-gray-900 dark:text-white">Analytics Page</div>;
const Settings = () => <div className="text-gray-900 dark:text-white">Settings Page</div>;

const AppRoutes: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading Quantiva...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Landing />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="news" element={<MarketNews />} />
        <Route path="insights" element={<AIInsightsPage />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="chat" element={<AIChat />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="font-inter">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
