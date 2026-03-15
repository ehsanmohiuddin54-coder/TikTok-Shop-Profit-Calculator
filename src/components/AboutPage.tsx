import React, { useEffect } from 'react';
import { motion, Variants } from 'motion/react';
import {
  Target,
  ShieldCheck,
  Calculator,
  Award,
  CheckCircle2,
  Sparkles,
  Info,
  Globe,
  Zap,
  Lock,
} from 'lucide-react';

export default function AboutPage() {
  // ── Structured data for About page ──────────────────────────────────────────
  useEffect(() => {
    const existing = document.getElementById('about-structured-data');
    if (existing) document.head.removeChild(existing);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'about-structured-data';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://shopearnings.com/about',
          url: 'https://shopearnings.com/about',
          name: 'About TikTok Shop Profit Calculator — Independent Tool by Ehsan Mohi Ud Din',
          description:
            'Shopearnings.com is an independent calculator tool created by Ehsan Mohi Ud Din to help online sellers estimate potential profit margins when selling through TikTok Shop. Not affiliated with TikTok.',
          inLanguage: 'en-US',
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://shopearnings.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'About',
                item: 'https://shopearnings.com/about',
              },
            ],
          },
        },
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://shopearnings.com/#app',
          name: 'TikTok Shop Profit Calculator',
          url: 'https://shopearnings.com',
          description:
            'An independent calculator tool created by Ehsan Mohi Ud Din to help TikTok Shop sellers in the US, UK, and EU estimate net profit after platform fees, FBT costs, and affiliate commissions. Not affiliated with TikTok.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          creator: {
            '@type': 'Person',
            name: 'Ehsan Mohi Ud Din',
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        },
      ],
    });
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('about-structured-data');
      if (el) document.head.removeChild(el);
    };
  }, []);

  // ── Animation variants ───────────────────────────────────────────────────────
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer: Variants = {
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      <article aria-labelledby="about-heading">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <header className="text-center mb-14">
          <motion.h1
            id="about-heading"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-4xl md:text-5xl font-black mb-6"
          >
            About{' '}
            <span className="text-[#FF0050]">
              TikTok Shop Profit Calculator
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            An independent, free tool to help online sellers understand their true
            profitability on TikTok Shop — before they list or promote a product.
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ delay: 0.4, duration: 0.8 }}
            aria-hidden="true"
            className="h-1 bg-gradient-to-r from-[#FF0050] to-transparent mx-auto mt-6 rounded-full"
          />
        </header>

        {/* ── ABOUT THIS TOOL ───────────────────────────────────────────────── */}
        <motion.section
          aria-labelledby="about-tool-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="bg-gray-50 rounded-3xl p-8 md:p-10 mb-10 border border-gray-100"
        >
          <div className="flex items-start gap-4 mb-6">
            <div
              aria-hidden="true"
              className="w-11 h-11 rounded-2xl bg-black flex items-center justify-center flex-shrink-0"
            >
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2
                id="about-tool-heading"
                className="text-2xl font-black mb-1"
              >
                About This Tool
              </h2>
              <p className="text-sm text-gray-400">shopearnings.com</p>
            </div>
          </div>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>Shopearnings.com</strong> is an independent web tool created by{' '}
              <strong>Ehsan Mohi Ud Din</strong> to help online sellers estimate potential
              profit margins when selling products through TikTok Shop.
            </p>
            <p>
              The goal of this tool is to provide a <strong>simple and transparent</strong> way
              for sellers to understand product profitability before launching or promoting
              products — covering all key costs including platform commission, fulfillment,
              affiliate commissions, and ad spend across US, UK, and EU markets.
            </p>
            <p className="text-sm text-gray-500">
              All fee structures displayed are based on publicly available information and are
              subject to change. Always verify current rates directly with TikTok Shop before
              making pricing or business decisions.
            </p>
          </div>
        </motion.section>

        {/* ── TRANSPARENCY & INDEPENDENCE ───────────────────────────────────── */}
        <motion.section
          aria-labelledby="transparency-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="bg-amber-50 border border-amber-200 rounded-3xl p-8 md:p-10 mb-10"
        >
          <div className="flex items-start gap-4 mb-6">
            <div
              aria-hidden="true"
              className="w-11 h-11 rounded-2xl bg-amber-500 flex items-center justify-center flex-shrink-0"
            >
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2
                id="transparency-heading"
                className="text-2xl font-black text-amber-900 mb-1"
              >
                Transparency &amp; Independence
              </h2>
              <p className="text-sm text-amber-600">Our commitment to honesty</p>
            </div>
          </div>

          {/* Primary independence statement */}
          <div className="bg-white border border-amber-200 rounded-2xl p-5 mb-5">
            <p className="text-amber-900 font-semibold leading-relaxed">
              This website is <strong>not affiliated with, endorsed by, or associated
              with TikTok or TikTok Shop</strong>. Shopearnings.com is an independent
              third-party calculator tool.
            </p>
          </div>

          <ul className="space-y-3" aria-label="Transparency commitments">
            {[
              'All fee rates are sourced from publicly available TikTok Seller Center documentation and may not reflect real-time changes.',
              'Profit estimates are approximations only — actual payouts may vary based on returns, adjustments, promotions, and platform policy updates.',
              'No login, account access, or connection to TikTok systems is required or used by this tool.',
              'This tool does not collect, store, or share any seller data entered into the calculator.',
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.07 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2
                  className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-sm text-amber-800 leading-relaxed">{item}</p>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* ── WHAT THIS TOOL DOES ───────────────────────────────────────────── */}
        <motion.section
          aria-labelledby="features-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="mb-10"
        >
          <h2
            id="features-heading"
            className="text-2xl font-black mb-6 text-center"
          >
            What This Tool Does
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <Calculator className="w-5 h-5" aria-hidden="true" />,
                title: 'Profit Estimation',
                desc: 'Enter your product cost, selling price, and other expenses to instantly estimate your net profit per unit after all TikTok Shop fees.',
              },
              {
                icon: <Target className="w-5 h-5" aria-hidden="true" />,
                title: 'Break-Even Pricing',
                desc: 'Find the minimum price you need to sell at to avoid losing money, factoring in platform commission, shipping, and creator commissions.',
              },
              {
                icon: <Globe className="w-5 h-5" aria-hidden="true" />,
                title: 'Multi-Region Support',
                desc: 'Calculate profits for US, UK, and EU5 markets with the correct local fee structures, VAT treatment, and new seller discount periods.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  aria-hidden="true"
                  className="w-10 h-10 rounded-xl bg-[#FF0050]/10 text-[#FF0050] flex items-center justify-center mb-4"
                >
                  {item.icon}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── REGIONAL FEE COVERAGE ─────────────────────────────────────────── */}
        <section aria-labelledby="regions-heading" className="mb-10">
          <h2
            id="regions-heading"
            className="text-2xl font-bold mb-6 text-center"
          >
            Regional TikTok Shop Fee Coverage
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                region: 'US',
                bg: 'bg-blue-50',
                border: 'border-blue-100',
                noteColor: 'text-blue-700',
                iconBg: 'bg-blue-600',
                flag: '🇺🇸',
                desc: 'US TikTok Shop fees: 6% unified commission, 5% for jewelry and pre-owned, $5 refund fee cap, and 30-day new seller discount periods.',
                note: 'Covers all US TikTok Shop seller fee structures',
              },
              {
                region: 'UK',
                bg: 'bg-red-50',
                border: 'border-red-100',
                noteColor: 'text-red-700',
                iconBg: 'bg-red-600',
                flag: '🇬🇧',
                desc: 'UK TikTok Shop: 9% standard commission, 5% electronics, 1.8% new seller rate for 90 days, and VAT-inclusive fee calculations.',
                note: 'Includes UK VAT treatment and new seller rates',
              },
              {
                region: 'EU',
                bg: 'bg-yellow-50',
                border: 'border-yellow-100',
                noteColor: 'text-yellow-700',
                iconBg: 'bg-yellow-600',
                flag: '🇪🇺',
                desc: 'EU5 markets: 9% standard rate (effective Jan 8, 2026), 7% for electronics and beauty tech, 4% new seller discount for 60 days, and country-specific VAT.',
                note: 'Covers DE, FR, IT, ES, NL with local VAT rates',
              },
            ].map((item, i) => (
              <motion.article
                key={i}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`${item.bg} p-6 rounded-2xl border ${item.border}`}
                aria-label={`TikTok Shop ${item.region} fee coverage`}
              >
                <div
                  aria-hidden="true"
                  className={`w-10 h-10 rounded-full ${item.iconBg} text-white flex items-center justify-center mb-4 text-lg`}
                >
                  {item.flag}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.region} Market</h3>
                <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                <p className={`text-xs ${item.noteColor} font-medium`}>{item.note}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <motion.section
          aria-labelledby="cta-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            id="cta-heading"
            className="text-2xl font-bold mb-4"
          >
            Ready to Calculate Your TikTok Shop Profit?
          </h2>

          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Use our free calculator to set prices that actually make money —
            understanding every fee before you list your product.
          </p>

          <motion.div
            className="inline-flex items-center px-6 py-3 bg-[#FF0050] text-white rounded-full text-sm font-bold cursor-default relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
              style={{ opacity: 0.2 }}
            />
            <Calculator className="w-4 h-4 mr-2" aria-hidden="true" />
            <span>Free TikTok Shop Profit Calculator · Updated for 2026</span>
            <motion.span
              aria-hidden="true"
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.span>
          </motion.div>

          {/* Trust signals — factual only */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-6 text-sm text-gray-400">
            {[
              { icon: <Lock className="w-3.5 h-3.5 text-green-500" aria-hidden="true" />, text: 'Free · No signup' },
              { icon: <Zap className="w-3.5 h-3.5 text-yellow-500" aria-hidden="true" />, text: 'Instant results' },
              { icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />, text: 'Independent tool' },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {item.icon}
                {item.text}
              </span>
            ))}
          </div>
        </motion.section>

        {/* ── BOTTOM DISCLAIMER ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          role="note"
          aria-label="Independence disclaimer"
          className="border border-gray-200 rounded-2xl px-6 py-5 bg-gray-50 text-center"
        >
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="font-semibold text-gray-700">Independent Tool:</span>{' '}
            Shopearnings.com is created and maintained by{' '}
            <span className="font-semibold text-gray-700">Ehsan Mohi Ud Din</span> as an
            independent calculator tool. This website is{' '}
            <strong>not affiliated with, endorsed by, or associated with TikTok or TikTok Shop</strong>.
            All content is provided for educational and estimation purposes only.
          </p>
        </motion.div>

      </article>
    </div>
  );
}
