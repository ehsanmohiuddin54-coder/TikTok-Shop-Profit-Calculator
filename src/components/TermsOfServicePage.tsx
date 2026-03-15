import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, AlertCircle, ShieldCheck, RefreshCw, Scale, Mail } from 'lucide-react';

export default function TermsOfServicePage() {
  useEffect(() => {
    const existing = document.getElementById('terms-structured-data');
    if (existing) document.head.removeChild(existing);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'terms-structured-data';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://shopearnings.com/terms',
      url: 'https://shopearnings.com/terms',
      name: 'Terms of Service — Shopearnings.com',
      description:
        'Terms of Service for Shopearnings.com. Independent TikTok Shop profit calculator tool. By using this tool you agree to these terms.',
      inLanguage: 'en-US',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shopearnings.com/' },
          { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://shopearnings.com/terms' },
        ],
      },
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('terms-structured-data');
      if (el) document.head.removeChild(el);
    };
  }, []);

  const sections = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Acceptance of Terms',
      content: `By accessing and using Shopearnings.com, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website. These terms apply to all visitors and users of the site.`,
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: 'Nature of the Service',
      points: [
        'Shopearnings.com is a free, independent, browser-based calculator tool designed to help online sellers estimate potential profit margins when selling through TikTok Shop.',
        'This website is not affiliated with, endorsed by, or associated with TikTok, TikTok Shop, ByteDance Ltd., or any of their subsidiaries.',
        'The service is provided free of charge and requires no account creation or personal information to use.',
        'All calculations are performed in your browser. No data you enter is transmitted to or stored on our servers.',
      ],
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: 'Disclaimer of Warranties',
      points: [
        'This tool is provided "as is" without any warranties, express or implied.',
        'We do not guarantee that the fee structures, commission rates, or calculation results are accurate, complete, or up to date.',
        'All results are estimates only. Actual TikTok Shop payouts may differ based on platform policy changes, individual account settings, promotions, returns, and other factors.',
        'We make no guarantee of any particular outcome or profit from using this tool or from selling on TikTok Shop.',
      ],
    },
    {
      icon: <Scale className="w-5 h-5" />,
      title: 'Limitation of Liability',
      points: [
        'To the fullest extent permitted by law, Shopearnings.com and its operator shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of or reliance on this tool.',
        'This includes, without limitation, any loss of profit, revenue, data, goodwill, or business opportunities.',
        'Use of this website is entirely at your own risk.',
      ],
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Intellectual Property',
      points: [
        'The design, code, content, and structure of Shopearnings.com are the intellectual property of the site operator unless otherwise noted.',
        'You may not reproduce, duplicate, copy, sell, or exploit any portion of the website without express written permission.',
        'TikTok, TikTok Shop, and related marks are trademarks of their respective owners. Their use on this site is purely descriptive and does not imply any affiliation or endorsement.',
      ],
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: 'Acceptable Use',
      points: [
        'You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others.',
        'You must not attempt to interfere with the operation of the website, reverse-engineer its code, or use automated tools to scrape or overload the service.',
        'You must not use this website to mislead others about TikTok Shop fees or represent the calculator results as official TikTok data.',
      ],
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: 'Changes to These Terms',
      content: `We reserve the right to update these Terms of Service at any time. Updated terms will be posted on this page with a revised date. Continued use of the website after changes are posted constitutes your acceptance of the updated terms. These terms were last updated in March 2026.`,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Contact',
      content: `If you have any questions about these Terms of Service, please reach out via the contact information available on this website. This website is operated as an independent personal project.`,
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
            <FileText className="w-6 h-6 text-white" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <h1 className="text-4xl font-black">Terms of Service</h1>
            <p className="text-gray-500 text-sm mt-1">Last updated: March 2026</p>
          </motion.div>
        </div>

        {/* Summary banner — scale spring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.3 }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-5"
        >
          <p className="text-blue-900 font-semibold leading-relaxed text-sm">
            By using Shopearnings.com you agree to these terms. This is a free, independent
            calculator tool — <strong>not affiliated with TikTok or TikTok Shop</strong>.
            All results are estimates only and do not constitute financial or legal advice.
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
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.07)', transition: { duration: 0.2 } }}
              aria-labelledby={`terms-section-${i}`}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative overflow-hidden"
            >
              {/* Left accent bar on hover */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF0050] rounded-l-2xl"
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
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.45 + i * 0.08 }}
                  aria-hidden="true"
                >
                  {section.icon}
                </motion.div>
                <h2 id={`terms-section-${i}`} className="font-black text-lg text-gray-900">
                  {section.title}
                </h2>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
              >
                {'content' in section && section.content && (
                  <p className="text-sm text-gray-700 leading-relaxed">{section.content}</p>
                )}
                {'points' in section && section.points && (
                  <ul className="space-y-2.5">
                    {section.points.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + i * 0.08 + j * 0.05 }}
                        className="flex items-start gap-2.5"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" aria-hidden="true" />
                        <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
                      </motion.li>
                    ))}
                  </ul>
                )}
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
