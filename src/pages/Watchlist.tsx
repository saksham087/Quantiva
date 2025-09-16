import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Star, Plus } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface WatchlistStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sentiment: number;
}

const generateWatchlistData = (): WatchlistStock[] => {
  const stocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries' },
    { symbol: 'TCS', name: 'Tata Consultancy Services' },
    { symbol: 'INFY', name: 'Infosys Limited' },
    { symbol: 'HDFC', name: 'HDFC Bank' },
    { symbol: 'ICICI', name: 'ICICI Bank' },
    { symbol: 'ADANI', name: 'Adani Enterprises' }
  ];

  return stocks.map(stock => ({
    ...stock,
    price: faker.number.float({ min: 500, max: 3000 }),
    change: faker.number.float({ min: -50, max: 50 }),
    changePercent: faker.number.float({ min: -5, max: 5 }),
    sentiment: faker.number.float({ min: -1, max: 1 })
  }));
};

const Watchlist: React.FC = () => {
  const [watchlistStocks] = React.useState(generateWatchlistData);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">My Watchlist</h1>
        <button className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-all duration-200">
          <Plus className="w-4 h-4" />
          <span>Add Stock</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchlistStocks.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="rounded-2xl p-px bg-gradient-to-b from-dark-700/80 to-transparent group"
          >
            <div className="bg-dark-800/80 backdrop-blur-xl rounded-[15px] p-6 h-full hover:bg-dark-700/60 transition-colors duration-200 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-primary-400 transition-colors duration-200">
                    {stock.symbol}
                  </h3>
                  <p className="text-sm text-dark-300">{stock.name}</p>
                </div>
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    ₹{stock.price.toFixed(2)}
                  </span>
                  <div className={`flex items-center space-x-1 ${
                    stock.change >= 0 ? 'text-success-400' : 'text-danger-400'
                  }`}>
                    {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm font-medium">
                      {stock.change > 0 ? '+' : ''}₹{stock.change.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    stock.changePercent >= 0 ? 'text-success-400' : 'text-danger-400'
                  }`}>
                    {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      stock.sentiment > 0.2 ? 'bg-success-500' : stock.sentiment < -0.2 ? 'bg-danger-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-xs text-dark-400">
                      {stock.sentiment > 0.2 ? 'Bullish' : stock.sentiment < -0.2 ? 'Bearish' : 'Neutral'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-dark-600/50">
                  <div className="h-16 bg-dark-700/30 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-dark-400">Mini Chart Placeholder</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Watchlist;
