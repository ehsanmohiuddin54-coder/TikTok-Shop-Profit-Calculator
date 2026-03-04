import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Info, Home, Menu, X, ChevronRight, TrendingUp, DollarSign, PieChart, Download, HelpCircle } from 'lucide-react';
import LandingPage from './components/LandingPage';
import CalculatorPage from './components/CalculatorPage';
import AboutPage from './components/AboutPage';
import FAQPage from './components/FAQPage';

type Page = 'home' | 'calculator' | 'about' | 'faq';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => navigate('home')}
            >
              {/* Logo preserved - calculator icon remains */}
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform group-hover:bg-[#FF0050] group-hover:rotate-3">
                <Calculator className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight">TikTokShop<span className="text-[#FF0050]">Profit</span></span>
            </div>

            {/* Desktop Nav with enhanced hover effects */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigate('home')}
                className={`relative text-sm font-medium transition-all duration-300 hover:scale-110 ${
                  currentPage === 'home' 
                    ? 'text-[#FF0050] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-[#FF0050] after:rounded-full' 
                    : 'text-gray-600 hover:text-black hover:after:absolute hover:after:bottom-[-4px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-black/20 hover:after:rounded-full'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => navigate('calculator')}
                className={`relative text-sm font-medium transition-all duration-300 hover:scale-110 ${
                  currentPage === 'calculator' 
                    ? 'text-[#FF0050] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-[#FF0050] after:rounded-full' 
                    : 'text-gray-600 hover:text-black hover:after:absolute hover:after:bottom-[-4px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-black/20 hover:after:rounded-full'
                }`}
              >
                Calculator
              </button>
              <button 
                onClick={() => navigate('about')}
                className={`relative text-sm font-medium transition-all duration-300 hover:scale-110 ${
                  currentPage === 'about' 
                    ? 'text-[#FF0050] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-[#FF0050] after:rounded-full' 
                    : 'text-gray-600 hover:text-black hover:after:absolute hover:after:bottom-[-4px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-black/20 hover:after:rounded-full'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => navigate('faq')}
                className={`relative text-sm font-medium transition-all duration-300 hover:scale-110 ${
                  currentPage === 'faq' 
                    ? 'text-[#FF0050] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-[#FF0050] after:rounded-full' 
                    : 'text-gray-600 hover:text-black hover:after:absolute hover:after:bottom-[-4px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-black/20 hover:after:rounded-full'
                }`}
              >
                FAQ
              </button>
              <button 
                onClick={() => navigate('calculator')}
                className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#FF0050] transition-all duration-300 hover:shadow-lg hover:shadow-[#FF0050]/20 hover:scale-105 active:scale-95 hover:rotate-1"
              >
                Launch Calculator
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-black transition-transform hover:scale-110"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-black/5 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                <button 
                  onClick={() => navigate('home')}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all hover:pl-6"
                >
                  Home
                </button>
                <button 
                  onClick={() => navigate('calculator')}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all hover:pl-6"
                >
                  Calculator
                </button>
                <button 
                  onClick={() => navigate('about')}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all hover:pl-6"
                >
                  About
                </button>
                <button 
                  onClick={() => navigate('faq')}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all hover:pl-6"
                >
                  FAQ
                </button>
                <div className="pt-4">
                  <button 
                    onClick={() => navigate('calculator')}
                    className="w-full bg-black text-white px-5 py-4 rounded-xl text-center font-bold hover:bg-[#FF0050] transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Launch Calculator
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && <LandingPage onStart={() => navigate('calculator')} />}
            {currentPage === 'calculator' && <CalculatorPage />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'faq' && <FAQPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer with keywords added */}
      <footer className="bg-white border-t border-black/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
                  <Calculator className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-lg tracking-tight">TikTokShop<span className="text-[#FF0050]">Profit</span></span>
              </div>
              <p className="text-gray-500 max-w-sm leading-relaxed mb-4">
                The most accurate profit calculator for TikTok Shop sellers. Built by experts to help you scale profitably.
              </p>
              {/* Keywords section - visually subtle but present for SEO */}
              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span className="hover:text-[#FF0050] transition-colors cursor-default">TikTok Shop Profit Calculator</span>
                <span className="text-gray-300">•</span>
                <span className="hover:text-[#FF0050] transition-colors cursor-default">TikTok Shop Calculator</span>
                <span className="text-gray-300">•</span>
                <span className="hover:text-[#FF0050] transition-colors cursor-default">TikTok Seller Profit Calculator</span>
                <span className="text-gray-300">•</span>
                <span className="hover:text-[#FF0050] transition-colors cursor-default">TikTok Shop Fee Calculator</span>
                <span className="text-gray-300">•</span>
                <span className="hover:text-[#FF0050] transition-colors cursor-default">TikTok Shop Earnings Calculator</span>
                <span className="text-gray-300">•</span>
                <span className="hover:text-[#FF0050] transition-colors cursor-default">TikTok Shop Revenue Calculator</span>
                <span className="text-gray-300">•</span>
                <span className="hover:text-[#FF0050] transition-colors cursor-default">TikTok Shop Commission Calculator</span>
                <span className="text-gray-300">•</span>
                <span className="hover:text-[#FF0050] transition-colors cursor-default">TikTok Shop Cost Calculator</span>
                <span className="text-gray-300">•</span>
                <span className="hover:text-[#FF0050] transition-colors cursor-default">Free TikTok Profit Calculator</span>
                <span className="text-gray-300">•</span>
                <span className="hover:text-[#FF0050] transition-colors cursor-default">TikTok Shop Calculator 2026</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-400">Product</h4>
              <ul className="space-y-4">
                <li><button onClick={() => navigate('calculator')} className="text-gray-600 hover:text-[#FF0050] transition-colors hover:pl-1">Calculator</button></li>
                <li><button onClick={() => navigate('home')} className="text-gray-600 hover:text-[#FF0050] transition-colors hover:pl-1">Features</button></li>
                <li><button onClick={() => navigate('about')} className="text-gray-600 hover:text-[#FF0050] transition-colors hover:pl-1">About Us</button></li>
                <li><button onClick={() => navigate('faq')} className="text-gray-600 hover:text-[#FF0050] transition-colors hover:pl-1">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-400">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-600 hover:text-[#FF0050] transition-colors hover:pl-1">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#FF0050] transition-colors hover:pl-1">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2026 TikTok Shop Profit Calculator. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-black transition-colors hover:scale-110 inline-block">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors hover:scale-110 inline-block">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors hover:scale-110 inline-block">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}