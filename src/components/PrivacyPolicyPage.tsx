import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, Database, Mail, RefreshCw, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    const existing = document.getElementById('privacy-structured-data');
    if (existing) document.head.removeChild(existing);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'privacy-structured-data';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://shopearnings.com/privacy',
      url: 'https://shopearnings.com/privacy',
      name: 'Privacy Policy — Shopearnings.com',
      description:
        'Privacy Policy for Shopearnings.com. Learn how this independent TikTok Shop profit calculator handles your data. No account required, no data stored.',
      inLanguage: 'en-US',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shopearnings.com/' },
          { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://shopearnings.com/privacy' },
        ],
      },
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('privacy-structured-data');
      if (el) document.head.removeChild(el);
    };
  }, []);

  const sections = [
    {
      icon: <Eye className="w-5 h-5" />,
      title: 'What Information We Collect',
      content: (
        <div className="space-y-3 text-sm text-gray-700">
          <p><strong className="text-gray-900">Calculator inputs:</strong> Any data you enter into the calculator (product prices, costs, fee percentages) is processed entirely within your browser. This data is never sent to our servers, stored, or shared.</p>
          <p><strong className="text-gray-900">Usage analytics:</strong> We may collect anonymous usage data such as page views, browser type, and general geographic region through third-party analytics tools (e.g. Google Analytics). This data does not identify you personally.</p>
          <p><strong className="text-gray-900">No account required:</strong> Shopearnings.com does not require you to create an account, log in, or provide any personal information to use the calculator.</p>
        </div>
      ),
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: 'How We Use Information',
      content: (
        <div className="space-y-3 text-sm text-gray-700">
          <p>Anonymous analytics data is used solely to understand how the tool is used so we can improve it. We do not:</p>
          <ul className="space-y-1.5 pl-4">
            {[
              'Sell, rent, or share your data with third parties for marketing purposes.',
              'Use your calculator inputs for any purpose other than displaying results to you in your browser.',
              'Store personally identifiable information on our servers.',
              'Connect to your TikTok Seller Center or any TikTok account.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: 'Cookies',
      content: (
        <div className="space-y-3 text-sm text-gray-700">
          <p>Shopearnings.com may use cookies or local browser storage for:</p>
          <ul className="space-y-1.5 pl-4">
            {[
              'Remembering your last-used calculator settings (region, fulfillment type) for convenience. This data stays in your browser only.',
              'Anonymous analytics tracking via third-party services such as Google Analytics.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>You can disable cookies in your browser settings. This will not affect the core functionality of the calculator.</p>
        </div>
      ),
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: 'Third-Party Services',
      content: (
        <div className="space-y-3 text-sm text-gray-700">
          <p>This website may use the following third-party services which have their own privacy policies:</p>
          <ul className="space-y-1.5 pl-4">
            {[
              'Google Analytics — for anonymous usage statistics.',
              'Google Fonts or similar — for typography loading.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>Shopearnings.com is not responsible for the privacy practices of these third-party services.</p>
        </div>
      ),
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: 'Changes to This Policy',
      content: (
        <div className="space-y-3 text-sm text-gray-700">
          <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date. Continued use of the website after changes constitutes acceptance of the updated policy.</p>
          <p>This policy was last updated in <strong className="text-gray-900">March 2026</strong>.</p>
        </div>
      ),
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Contact',
      content: (
        <div className="space-y-3 text-sm text-gray-700">
          <p>If you have any questions about this Privacy Policy, please reach out via the contact information available on this website.</p>
          <p>This website is operated as an independent personal project.</p>
        </div>
      ),
    },
  ];

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
          {/* Icon spring bounce */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
            className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center flex-shrink-0"
            aria-hidden="true"
          >
            <Lock className="w-6 h-6 text-white" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <h1 className="text-4xl font-black">Privacy Policy</h1>
            <p className="text-gray-500 text-sm mt-1">Last updated: March 2026</p>
          </motion.div>
        </div>

        {/* Summary banner — scale spring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.3 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-5"
        >
          <p className="text-green-900 font-semibold leading-relaxed text-sm">
            <strong>Short version:</strong> Shopearnings.com does not collect, store, or share any personal data
            you enter into the calculator. No account is required to use this tool.
            This is an independent tool — not connected to TikTok or TikTok Shop in any way.
          </p>
        </motion.div>
      </motion.header>

      {/* ── SECTIONS ────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {sections.map((section, i) => {
          const fromLeft = i % 2 === 0;
          return (
            <motion.section
              key={i}
              initial={{ opacity: 0, x: fromLeft ? -28 : 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.07)', transition: { duration: 0.2 } }}
              aria-labelledby={`privacy-section-${i}`}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative overflow-hidden"
            >
              {/* Left accent bar revealed on hover */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 bg-black rounded-l-2xl"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.22 }}
                style={{ originY: 0 }}
                aria-hidden="true"
              />

              <div className="flex items-center gap-3 mb-4">
                {/* Icon bounce */}
                <motion.div
                  className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.45 + i * 0.09 }}
                  aria-hidden="true"
                >
                  {section.icon}
                </motion.div>
                <h2 id={`privacy-section-${i}`} className="font-black text-lg text-gray-900">
                  {section.title}
                </h2>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.09 }}
              >
                {section.content}
              </motion.div>
            </motion.section>
          );
        })}
      </div>

      {/* ── FOOTER NOTE ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="mt-10 border border-gray-200 rounded-2xl p-5 bg-gray-50 text-center"
        role="note"
      >
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-700">Shopearnings.com</span> — Independent tool.
          Not affiliated with TikTok or TikTok Shop.
        </p>
      </motion.div>

    </div>
  );
}
