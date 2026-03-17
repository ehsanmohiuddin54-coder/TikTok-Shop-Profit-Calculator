import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Menu, X } from 'lucide-react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CalculatorPage from './components/CalculatorPage';
import AboutPage from './components/AboutPage';
import FAQPage from './components/FAQPage';
import DisclaimerPage from './components/DisclaimerPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';

function AppInner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const goTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navLinks = [
    { label: 'Home',       path: '/' },
    { label: 'Calculator', path: '/calculator' },
    { label: 'About',      path: '/about' },
    { label: 'FAQ',        path: '/faq' },
    { label: 'Disclaimer', path: '/disclaimer' },
  ];

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans">

      {/* ── NAVIGATION ──────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => goTo('/')}
            >
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform group-hover:bg-[#FF0050] group-hover:rotate-3">
                <Calculator className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                TikTokShop<span className="text-[#FF0050]">Profit</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map(({ label, path }) => (
                <button
                  key={path}
                  onClick={() => goTo(path)}
                  className={`relative text-sm font-medium transition-all duration-300 hover:scale-110 ${
                    currentPath === path
                      ? 'text-[#FF0050] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-[#FF0050] after:rounded-full'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => goTo('/calculator')}
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
                {navLinks.map(({ label, path }) => (
                  <button
                    key={path}
                    onClick={() => goTo(path)}
                    className="block w-full text-left px-3 py-4 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all hover:pl-6"
                  >
                    {label}
                  </button>
                ))}
                <div className="pt-4">
                  <button
                    onClick={() => goTo('/calculator')}
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

      {/* ── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/"           element={<LandingPage onStart={() => goTo('/calculator')} />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/about"      element={<AboutPage />} />
              <Route path="/faq"        element={<FAQPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/privacy"    element={<PrivacyPolicyPage />} />
              <Route path="/terms"      element={<TermsOfServicePage />} />
              <Route path="*"           element={<LandingPage onStart={() => goTo('/calculator')} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── DISCLAIMER BANNER ───────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-t border-gray-200 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            <span className="font-semibold text-gray-700">Disclaimer:</span>{' '}
            Shopearnings.com is an independent calculator tool designed to help sellers estimate
            potential profits from TikTok Shop sales. This website is not affiliated with,
            endorsed by, or associated with TikTok or TikTok Shop. All fee structures and rates
            are based on publicly available information and are subject to change. Always verify
            current fees directly with TikTok Shop.{' '}
            <button
              onClick={() => goTo('/disclaimer')}
              className="underline hover:text-[#FF0050] transition-colors font-medium"
            >
              Read full disclaimer
            </button>
          </p>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-black/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
                  <Calculator className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-lg tracking-tight">
                  TikTokShop<span className="text-[#FF0050]">Profit</span>
                </span>
              </div>
              <p className="text-gray-500 max-w-sm leading-relaxed mb-4">
                An independent profit calculator tool for TikTok Shop sellers.
                Created by <span className="font-medium text-gray-700">Ehsan Mohi Ud Din</span>.
                Not affiliated with TikTok or TikTok Shop.
              </p>
              {/* SEO keywords */}
              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                {[
                  'TikTok Shop Profit Calculator',
                  'TikTok Shop Calculator',
                  'TikTok Shop Calculator UK',
                  'TikTok Shop Fee Calculator UK',
                  'TikTok Shop Revenue Calculator',
                  'TikTok Seller Profit Calculator',
                  'TikTok Shop Fee Calculator',
                  'TikTok Shop Earnings Calculator',
                  'TikTok Shop Commission Calculator',
                  'TikTok Shop Cost Calculator',
                  'Free TikTok Profit Calculator',
                  'TikTok Shop Calculator 2026',
                  'TikTok Shop Profit Calculator Online',
                  'Best TikTok Shop Profit Calculator',
                ].map((kw, i, arr) => (
                  <React.Fragment key={kw}>
                    <span className="hover:text-[#FF0050] transition-colors cursor-default">{kw}</span>
                    {i < arr.length - 1 && <span className="text-gray-300">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Product links */}
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-400">Product</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Calculator', path: '/calculator' },
                  { label: 'Features',   path: '/' },
                  { label: 'About Us',   path: '/about' },
                  { label: 'FAQ',        path: '/faq' },
                  { label: 'Disclaimer', path: '/disclaimer' },
                ].map(({ label, path }) => (
                  <li key={label}>
                    <button onClick={() => goTo(path)} className="text-gray-600 hover:text-[#FF0050] transition-colors hover:pl-1">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal links */}
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-400">Legal</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Privacy Policy',    path: '/privacy' },
                  { label: 'Terms of Service',  path: '/terms' },
                  { label: 'Disclaimer',        path: '/disclaimer' },
                ].map(({ label, path }) => (
                  <li key={label}>
                    <button onClick={() => goTo(path)} className="text-gray-600 hover:text-[#FF0050] transition-colors hover:pl-1">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-black/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2026 TikTok Shop Profit Calculator by Ehsan Mohi Ud Din. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <button onClick={() => goTo('/disclaimer')} className="hover:text-[#FF0050] transition-colors">Disclaimer</button>
              <span>·</span>
              <button onClick={() => goTo('/privacy')} className="hover:text-[#FF0050] transition-colors">Privacy Policy</button>
              <span>·</span>
              <button onClick={() => goTo('/terms')} className="hover:text-[#FF0050] transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}