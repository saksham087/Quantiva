import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';

interface Stock {
  symbol: string;
  name: string;
  sentiment: number;
  change: number;
}

const generateStockData = (): Stock[] => {
  const symbols = ['RELIANCE', 'TCS', 'INFY', 'HDFC', 'ICICI', 'SBI', 'WIPRO', 'ADANI', 'BAJAJ', 'MARUTI'];
  const names = ['Reliance Ind.', 'Tata Cons.', 'Infosys', 'HDFC Bank', 'ICICI Bank', 'SBI', 'Wipro', 'Adani Ent.', 'Bajaj Finance', 'Maruti Suzuki'];
  
  return symbols.map((symbol, index) => ({
    symbol,
    name: names[index],
    sentiment: faker.number.float({ min: -1, max: 1 }),
    change: faker.number.float({ min: -5, max: 5 })
  }));
};

const SentimentHeatmap: React.FC = () => {
  const [stocks] = React.useState(generateStockData);

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.3) return 'bg-success-500/20 text-success-400 border-success-500/30';
    if (sentiment < -0.3) return 'bg-danger-500/20 text-danger-400 border-danger-500/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getSentimentLabel = (sentiment: number) => {
    if (sentiment > 0.5) return 'Very Bullish';
    if (sentiment > 0.2) return 'Bullish';
    if (sentiment > -0.2) return 'Neutral';
    if (sentiment > -0.5) return 'Bearish';
    return 'Very Bearish';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl p-px bg-gradient-to-b from-dark-700/80 to-transparent"
    >
      <div className="bg-dark-800/80 backdrop-blur-xl rounded-[15px] p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Sentiment Heatmap</h3>
          <span className="text-xs px-2 py-1 bg-dark-700 rounded-full text-dark-300">
            Top 10 Stocks
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stocks.map((stock, index) => (
            <motion.div 
              key={stock.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              className={`p-3 rounded-lg border ${getSentimentColor(stock.sentiment)} transition-all duration-200 hover:scale-105 hover:bg-opacity-30 cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-medium text-sm text-white">{stock.symbol}</div>
                  <div className="text-xs opacity-75">{stock.name}</div>
                </div>
                <div className="text-right">
                  <div className={`flex items-center space-x-1 text-xs ${
                    stock.change >= 0 ? 'text-success-400' : 'text-danger-400'
                  }`}>
                    {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{stock.change > 0 ? '+' : ''}{stock.change.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              <div className="text-xs font-medium opacity-75">
                {getSentimentLabel(stock.sentiment)}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <span className="text-dark-300">Bullish</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-dark-300">Neutral</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-danger-500 rounded-full"></div>
            <span className="text-dark-300">Bearish</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SentimentHeatmap;
