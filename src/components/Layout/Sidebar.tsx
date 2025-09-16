import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, BarChart3, BookOpen, Brain, Home, List, Settings, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Watchlist', href: '/watchlist', icon: List },
  { name: 'Market News', href: '/news', icon: BookOpen },
  { name: 'AI Insights', href: '/insights', icon: Brain },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'AI Chat', href: '/chat', icon: TrendingUp },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar: React.FC = () => {
  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-64 bg-dark-800/60 backdrop-blur-xl border-r border-dark-700/80 h-screen fixed left-0 top-0 z-40"
    >
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Quantiva</span>
          </div>
        </div>
        
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    `group flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-dark-700 text-white'
                        : 'text-dark-300 hover:bg-dark-700/50 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
