import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';

const timeRanges = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

const generateChartData = (range: string) => {
  const points = range === '1D' ? 24 : range === '1W' ? 7 : range === '1M' ? 30 : range === '3M' ? 90 : range === '1Y' ? 365 : 1825;
  const basePrice = 2500;
  
  return Array.from({ length: points }, (_, i) => ({
    time: new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    price: parseFloat((basePrice + faker.number.float({ min: -200, max: 200 })).toFixed(2))
  }));
};

const StockChart: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState('1M');
  const [chartData] = useState(() => generateChartData(selectedRange));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-px bg-gradient-to-b from-dark-700/80 to-transparent h-full"
    >
      <div className="bg-dark-800/80 backdrop-blur-xl rounded-[15px] p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Stock Chart</h3>
          <div className="flex space-x-1 bg-dark-700/50 rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                  selectedRange === range
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-grow h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9E9E9E' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9E9E9E' }}
                domain={['dataMin - 20', 'dataMax + 20']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(18, 18, 18, 0.9)',
                  border: '1px solid #2C2C2C',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#3B82F6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPrice)"
                dot={false}
                activeDot={{ r: 4, fill: '#3B82F6', stroke: '#000', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default StockChart;
