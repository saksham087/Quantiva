import React from 'react';
import StockHeader from '../components/Dashboard/StockHeader';
import StockChart from '../components/Dashboard/StockChart';
import AIInsights from '../components/Dashboard/AIInsights';
import SentimentHeatmap from '../components/Dashboard/SentimentHeatmap';
import NewsFeed from '../components/Dashboard/NewsFeed';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  // Mock data for Reliance Industries
  const stockData = {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Limited',
    price: 2547.85,
    change: 23.45,
    changePercent: 0.93
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <StockHeader {...stockData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StockChart />
        </div>
        <div>
          <AIInsights />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentHeatmap />
        <NewsFeed />
      </div>

      {/* Floating Generate Report Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 font-medium flex items-center space-x-2 z-50"
      >
        <span>Generate Report</span>
      </motion.button>
    </motion.div>
  );
};

export default Dashboard;
