import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function DisclaimerPage() {
  useEffect(() => {
    const existing = document.getElementById('disclaimer-structured-data');
    if (existing) document.head.removeChild(existing);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'disclaimer-structured-data';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://shopearnings.com/disclaimer',
      url: 'https://shopearnings.com/disclaimer',
      name: 'Disclaimer — Shopearnings.com TikTok Shop Profit Calculator',
      description:
        'Disclaimer for Shopearnings.com. This is an independent calculator tool not affiliated with TikTok or TikTok Shop. All results are estimates only.',
      inLanguage: 'en-US',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shopearnings.com/' },
          { '@type': 'ListItem', position: 2, name: 'Disclaimer', item: 'https://shopearnings.com/disclaimer' },
        ],
      },
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('disclaimer-structured-data');
      if (el) document.head.removeChild(el);
    };
  }, []);

  const sections = [
    {
      title: 'Independence from TikTok',
      icon: <ShieldCheck className="w-5 h-5" />,
      color: 'amber',
      content: [
        'Shopearnings.com is an independent web tool created by Ehsan Mohi Ud Din.',
        'This website is not affiliated with, endorsed by, sponsored by, or associated with TikTok, TikTok Shop, ByteDance Ltd., or any of their subsidiaries or affiliates.',
        'The name "TikTok Shop" is referenced solely to describe the platform for which this calculator provides fee estimates. All trademarks, service marks, and trade names belong to their respective owners.',
      ],
    },
    {
      title: 'Estimation Purposes Only',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'blue',
      content: [
        'All results produced by this calculator are estimates only and should not be treated as financial advice, guaranteed earnings, or exact profit projections.',
        'Actual payouts from TikTok Shop may differ due to promotional adjustments, partial refunds, payout timing, currency conversions, platform policy changes, or fees not accounted for in this tool.',
        'This tool does not have access to your TikTok Seller Center account and cannot reflect your specific negotiated rates, account status, or individual fee arrangements.',
      ],
    },
    {
      title: 'Fee Information Accuracy',
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'green',
      content: [
        'All fee structures displayed on this website are based on publicly available information sourced from TikTok Seller Center documentation and public announcements.',
        'Fee rates are subject to change at any time by TikTok without notice. Shopearnings.com makes no guarantee that the fee information displayed is current or complete.',
        'Always verify the latest fee rates, commission structures, and policy details directly in your TikTok Seller Center before making any pricing or business decisions.',
      ],
    },
    {
      title: 'No Financial or Legal Advice',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'red',
      content: [
        'Nothing on this website constitutes financial, legal, tax, or business advice.',
        'This tool is provided for informational and educational purposes only to help sellers understand the potential cost structure of selling on TikTok Shop.',
        'You should consult a qualified professional before making any significant business, financial, or legal decisions.',
      ],
    },
    {
      title: 'Data & Privacy',
      icon: <ShieldCheck className="w-5 h-5" />,
      color: 'purple',
      content: [
        'This tool does not require you to log in, create an account, or connect to any TikTok system.',
        'Data entered into this calculator (product costs, prices, fees) is processed entirely in your browser and is not stored, transmitted, or shared with any third party by Shopearnings.com.',
      ],
    },
    {
      title: 'Limitation of Liability',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'gray',
      content: [
        'Shopearnings.com and its creator accept no responsibility or liability for any loss, damage, or business decisions arising from the use of or reliance on the information or estimates provided by this tool.',
        'Use of this website is entirely at your own risk.',
      ],
    },
  ];

  const colorMap: Record<string, { bg: string; icon: string; border: string; heading: string; accent: string }> = {
    amber:  { bg: 'bg-amber-50',  icon: 'bg-amber-500',  border: 'border-amber-100',  heading: 'text-amber-900',  accent: 'bg-amber-400' },
    blue:   { bg: 'bg-blue-50',   icon: 'bg-blue-500',   border: 'border-blue-100',   heading: 'text-blue-900',   accent: 'bg-blue-400' },
    green:  { bg: 'bg-green-50',  icon: 'bg-green-500',  border: 'border-green-100',  heading: 'text-green-900',  accent: 'bg-green-400' },
    red:    { bg: 'bg-red-50',    icon: 'bg-red-500',    border: 'border-red-100',    heading: 'text-red-900',    accent: 'bg-red-400' },
    purple: { bg: 'bg-purple-50', icon: 'bg-purple-500', border: 'border-purple-100', heading: 'text-purple-900', accent: 'bg-purple-400' },
    gray:   { bg: 'bg-gray-50',   icon: 'bg-gray-600',   border: 'border-gray-200',   heading: 'text-gray-900',   accent: 'bg-gray-400' },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-6">
          {/* Icon — spring bounce entrance */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
            className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center flex-shrink-0"
            aria-hidden="true"
          >
            <ShieldCheck className="w-6 h-6 text-white" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <h1 className="text-4xl font-black">Disclaimer</h1>
            <p className="text-gray-500 text-sm mt-1">Last updated: March 2026</p>
          </motion.div>
        </div>

        {/* Primary banner — scale spring in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.3 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-5"
        >
          <p className="text-amber-900 font-semibold leading-relaxed text-sm">
            <strong>Shopearnings.com is an independent calculator tool.</strong> This website
            is <strong>not affiliated with, endorsed by, or associated with TikTok or TikTok Shop</strong>.
            All results are estimates provided for educational purposes only.
          </p>
        </motion.div>
      </motion.header>

      {/* ── ANIMATED PROGRESS LINE ──────────────────────────────────────────── */}
      <div className="relative">
        {/* Left timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-100" aria-hidden="true">
          <motion.div
            className="w-full bg-gradient-to-b from-[#FF0050] to-purple-400 rounded-full"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* ── SECTIONS ────────────────────────────────────────────────────────── */}
        <div className="space-y-5 pl-10">
          {sections.map((section, i) => {
            const c = colorMap[section.color];
            const fromLeft = i % 2 === 0;
            return (
              <motion.section
                key={i}
                initial={{ opacity: 0, x: fromLeft ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                aria-labelledby={`disclaimer-section-${i}`}
                className={`${c.bg} border ${c.border} rounded-2xl p-6 relative overflow-hidden`}
              >
                {/* Animated left accent bar on hover */}
                <motion.div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${c.accent} rounded-l-2xl`}
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{ originY: 0 }}
                  aria-hidden="true"
                />

                {/* Timeline dot */}
                <div
                  className={`absolute -left-[2.65rem] top-6 w-3 h-3 rounded-full ${c.icon} border-2 border-white`}
                  aria-hidden="true"
                />

                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className={`w-9 h-9 rounded-xl ${c.icon} text-white flex items-center justify-center flex-shrink-0`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 + i * 0.1 }}
                    aria-hidden="true"
                  >
                    {section.icon}
                  </motion.div>
                  <h2 id={`disclaimer-section-${i}`} className={`font-black text-lg ${c.heading}`}>
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-2.5">
                  {section.content.map((point, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.6 + i * 0.1 + j * 0.06 }}
                      className="flex items-start gap-2.5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" aria-hidden="true" />
                      <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            );
          })}
        </div>
      </div>

      {/* ── FOOTER NOTE ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="mt-10 border border-gray-200 rounded-2xl p-5 bg-gray-50 text-center"
        role="note"
      >
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-700">Shopearnings.com</span> — Created by{' '}
          <span className="font-semibold text-gray-700">Ehsan Mohi Ud Din</span>.
          Independent tool — not affiliated with TikTok or TikTok Shop.
          For questions, refer to the{' '}
          <span className="font-semibold text-gray-700">Privacy Policy</span> and{' '}
          <span className="font-semibold text-gray-700">Terms of Service</span> pages.
        </p>
      </motion.div>

    </div>
  );
}
