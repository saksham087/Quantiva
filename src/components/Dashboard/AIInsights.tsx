import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface Insight {
  type: 'bullish' | 'bearish' | 'neutral' | 'warning';
  title: string;
  description: string;
  confidence: number;
}

const insights: Insight[] = [
  {
    type: 'bullish',
    title: 'Strong Q4 Earnings Expected',
    description: 'AI analysis suggests robust earnings growth based on recent sector trends and company fundamentals.',
    confidence: 87
  },
  {
    type: 'neutral',
    title: 'Technical Analysis',
    description: 'Stock is currently trading near key resistance levels. Breakout above ₹2,650 could signal further upside.',
    confidence: 72
  },
  {
    type: 'warning',
    title: 'Market Volatility Alert',
    description: 'Increased options activity suggests potential volatility in the near term. Consider position sizing.',
    confidence: 93
  }
];

const getInsightIcon = (type: string) => {
  switch (type) {
    case 'bullish': return <TrendingUp className="w-4 h-4 text-success-500" />;
    case 'bearish': return <TrendingUp className="w-4 h-4 text-danger-500 rotate-180" />;
    case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    default: return <Info className="w-4 h-4 text-primary-500" />;
  }
};

const getInsightColor = (type: string) => {
  switch (type) {
    case 'bullish': return 'border-success-500/30 bg-success-500/10';
    case 'bearish': return 'border-danger-500/30 bg-danger-500/10';
    case 'warning': return 'border-yellow-500/30 bg-yellow-500/10';
    default: return 'border-primary-500/30 bg-primary-500/10';
  }
};

const AIInsights: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl p-px bg-gradient-to-b from-dark-700/80 to-transparent h-full"
    >
      <div className="bg-dark-800/80 backdrop-blur-xl rounded-[15px] p-6 h-full flex flex-col">
        <div className="flex items-center space-x-2 mb-6">
          <Brain className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-semibold text-white">AI Insights</h3>
          <div className="ml-auto">
            <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded-full">
              Live Analysis
            </span>
          </div>
        </div>

        <div className="space-y-4 flex-grow">
          {insights.map((insight, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`p-4 rounded-xl border ${getInsightColor(insight.type)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{insight.title}</h4>
                    <span className="text-xs px-2 py-1 bg-dark-700 rounded-full text-dark-300">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-sm text-dark-300">{insight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-dark-600/50">
          <button className="w-full py-2 px-4 bg-primary-500/10 hover:bg-primary-500/20 text-primary-400 rounded-lg transition-all duration-200 text-sm font-medium">
            View Detailed Analysis
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AIInsights;
