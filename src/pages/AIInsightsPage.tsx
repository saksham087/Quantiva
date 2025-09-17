import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Search } from 'lucide-react';
import { faker } from '@faker-js/faker';

type InsightType = 'Bullish' | 'Bearish' | 'Warning' | 'Opportunity';

interface Insight {
  id: string;
  ticker: string;
  companyName: string;
  type: InsightType;
  title: string;
  summary: string;
  confidence: number;
  keyFactors: string[];
  timestamp: Date;
}

const generateMockInsights = (count: number): Insight[] => {
  const types: InsightType[] = ['Bullish', 'Bearish', 'Warning', 'Opportunity'];
  const tickers = ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 'SBIN', 'WIPRO', 'ADANIENT', 'BAJFINANCE', 'MARUTI'];
  
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    ticker: faker.helpers.arrayElement(tickers),
    companyName: faker.company.name(),
    type: faker.helpers.arrayElement(types),
    title: faker.lorem.sentence(5),
    summary: faker.lorem.paragraph(2),
    confidence: faker.number.int({ min: 60, max: 98 }),
    keyFactors: Array.from({ length: 3 }, () => faker.lorem.words(4)),
    timestamp: faker.date.recent({ days: 7 }),
  }));
};

const InsightIcon: React.FC<{ type: InsightType }> = ({ type }) => {
  const iconProps = { className: "w-5 h-5" };
  switch (type) {
    case 'Bullish': return <TrendingUp {...iconProps} />;
    case 'Bearish': return <TrendingDown {...iconProps} />;
    case 'Warning': return <AlertTriangle {...iconProps} />;
    case 'Opportunity': return <Lightbulb {...iconProps} />;
    default: return <Brain {...iconProps} />;
  }
};

const InsightColors: Record<InsightType, { text: string, bg: string, border: string }> = {
  'Bullish': { text: 'text-success-400', bg: 'bg-success-500/10', border: 'border-success-500/30' },
  'Bearish': { text: 'text-danger-400', bg: 'bg-danger-500/10', border: 'border-danger-500/30' },
  'Warning': { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  'Opportunity': { text: 'text-primary-400', bg: 'bg-primary-500/10', border: 'border-primary-500/30' },
};

const AIInsightsPage: React.FC = () => {
  const [insights] = useState(() => generateMockInsights(12));
  const [filter, setFilter] = useState<InsightType | 'All'>('All');

  const filteredInsights = insights.filter(insight => filter === 'All' || insight.type === filter);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary-400" />
            AI Insights Hub
          </h1>
          <p className="text-dark-300 mt-1">Explore AI-driven market analysis and opportunities.</p>
        </div>
        <div className="relative min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ticker or keyword..."
            className="w-full pl-10 pr-4 py-2.5 bg-dark-800/80 border border-dark-600/80 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {(['All', 'Bullish', 'Bearish', 'Warning', 'Opportunity'] as const).map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              filter === type
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-dark-700/50 text-dark-300 hover:bg-dark-700 hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredInsights.map((insight, index) => {
          const colors = InsightColors[insight.type];
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className={`rounded-2xl p-px bg-gradient-to-b from-dark-700/80 to-transparent group`}
            >
              <div className={`bg-dark-800/80 backdrop-blur-xl rounded-[15px] p-6 h-full flex flex-col justify-between border ${colors.border} hover:border-primary-500/50 transition-all duration-300`}>
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-white">{insight.ticker}</h3>
                      <p className="text-sm text-dark-400 truncate">{insight.companyName}</p>
                    </div>
                    <div className={`flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                      <InsightIcon type={insight.type} />
                      <span>{insight.type}</span>
                    </div>
                  </div>

                  <h4 className="font-medium text-white mb-2 leading-tight">{insight.title}</h4>
                  <p className="text-sm text-dark-300 line-clamp-3 mb-4">{insight.summary}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-dark-300">Confidence Score</span>
                      <span className={`${colors.text} font-semibold`}>{insight.confidence}%</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-1.5">
                      <div className={`bg-gradient-to-r ${colors.text === 'text-success-400' ? 'from-green-500 to-green-400' : colors.text === 'text-danger-400' ? 'from-red-500 to-red-400' : colors.text === 'text-yellow-400' ? 'from-yellow-500 to-yellow-400' : 'from-blue-500 to-blue-400'} h-1.5 rounded-full`} style={{ width: `${insight.confidence}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <h5 className="font-semibold text-dark-200">Key Factors:</h5>
                    <ul className="space-y-1.5 pl-1">
                      {insight.keyFactors.map((factor, i) => (
                        <li key={i} className="flex items-center gap-2 text-dark-300 text-xs">
                          <div className={`w-1 h-1 rounded-full ${colors.bg.replace('/10', '/80')}`}></div>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-dark-600/50 flex items-center justify-between text-xs text-dark-400">
                  <span>{new Date(insight.timestamp).toLocaleDateString()}</span>
                  <button className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AIInsightsPage;
