import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Brain, User } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm Quantiva's AI assistant. I can help you analyze stocks, sectors, market trends, and provide investment insights. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Based on current market analysis, I can provide insights on that topic. Let me analyze the latest data and trends for you...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-112px)] flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">AI Chat Assistant</h1>
        <div className="flex items-center space-x-2 text-sm text-dark-300">
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
          <span>AI Online</span>
        </div>
      </div>

      <div className="flex-1 rounded-2xl p-px bg-gradient-to-b from-dark-700/80 to-transparent flex flex-col">
        <div className="bg-dark-800/80 backdrop-blur-xl rounded-[15px] h-full flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.type === 'user' ? 'bg-primary-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Brain className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`p-4 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-dark-700/50 text-white'
                  }`}>
                    <p>{message.content}</p>
                    <span className={`text-xs mt-2 block ${
                      message.type === 'user' ? 'text-primary-100' : 'text-dark-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-6 border-t border-dark-600/50">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about stocks, market trends, or investment strategies..."
                className="flex-1 px-4 py-3 bg-dark-700/50 border border-dark-600/50 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-200"
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-200 flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIChat;
