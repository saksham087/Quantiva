import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  summary: string;
}

const generateNews = (): NewsItem[] => {
  const sentiments: ('positive' | 'negative' | 'neutral')[] = ['positive', 'negative', 'neutral'];
  const sources = ['Economic Times', 'Bloomberg', 'Reuters', 'Moneycontrol', 'CNBC', 'Business Standard'];
  
  return Array.from({ length: 6 }, (_, i) => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    source: sources[Math.floor(Math.random() * sources.length)],
    time: `${Math.floor(Math.random() * 60)} minutes ago`,
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    summary: faker.lorem.paragraph()
  }));
};

const NewsFeed: React.FC = () => {
  const [news] = React.useState(generateNews);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-success-500';
      case 'negative': return 'bg-danger-500';
      default: return 'bg-gray-500';
    }
  };

  const getSentimentLabel = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'Positive';
      case 'negative': return 'Negative';
      default: return 'Neutral';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl p-px bg-gradient-to-b from-dark-700/80 to-transparent"
    >
      <div className="bg-dark-800/80 backdrop-blur-xl rounded-[15px] p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Market News</h3>
          <button className="text-primary-400 hover:text-primary-500 text-sm font-medium transition-colors duration-200">
            View All
          </button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {news.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className="p-4 rounded-lg bg-dark-700/30 hover:bg-dark-700/50 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getSentimentColor(item.sentiment)}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-primary-500/20 text-primary-400 rounded-full">
                      {getSentimentLabel(item.sentiment)}
                    </span>
                    <div className="flex items-center space-x-2 text-xs text-dark-400">
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-white mb-2 group-hover:text-primary-400 transition-colors duration-200">
                    {item.title}
                  </h4>
                  
                  <p className="text-sm text-dark-300 mb-2 line-clamp-2">
                    {item.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-400">{item.source}</span>
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-primary-500 transition-colors duration-200" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsFeed;
