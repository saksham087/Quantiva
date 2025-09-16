import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface StockHeaderProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockHeader: React.FC<StockHeaderProps> = ({ symbol, name, price, change, changePercent }) => {
  const isPositive = change >= 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl p-px bg-gradient-to-b from-dark-700/80 to-transparent"
    >
      <div className="bg-dark-800/80 backdrop-blur-xl rounded-[15px] p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-white">{symbol}</h1>
              <span className="text-dark-400">•</span>
              <span className="text-dark-300">{name}</span>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-3xl font-bold text-white">₹{price.toFixed(2)}</span>
              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                isPositive 
                  ? 'bg-success-500/20 text-success-500' 
                  : 'bg-danger-500/20 text-danger-500'
              }`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm font-medium">
                  {isPositive ? '+' : ''}₹{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-dark-400">Market Status</div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white">Market Open</span>
            </div>
            <div className="text-xs text-dark-400 mt-1">Last updated: 2 mins ago</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StockHeader;
