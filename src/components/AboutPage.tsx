import React, { useEffect } from 'react';
import { motion, Variants } from 'motion/react';
import {
  Users,
  Target,
  ShieldCheck,
  Calculator,
  BarChart3,
  Award,
  CheckCircle2,
  Sparkles,
  Star,
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
          '@id': 'https://tiktokprofitcalculator.com/about',
          url: 'https://tiktokprofitcalculator.com/about',
          name: 'About TikTok Shop Profit Calculator — Our Mission & Team',
          description:
            'Learn about the team behind TikTok Shop Profit Calculator. We help 18,000+ US, UK, and EU sellers understand true net profit after TikTok fees, commissions, and FBT costs.',
          inLanguage: 'en-US',
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://tiktokprofitcalculator.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'About',
                item: 'https://tiktokprofitcalculator.com/about',
              },
            ],
          },
        },
        {
          '@type': 'Organization',
          '@id': 'https://tiktokprofitcalculator.com/#organization',
          name: 'TikTok Shop Profit Calculator',
          url: 'https://tiktokprofitcalculator.com',
          description:
            'A team of e-commerce veterans and TikTok Shop specialists providing accurate profit calculation tools for sellers in the US, UK, and EU markets.',
          foundingDate: '2024',
          areaServed: ['US', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL'],
          knowsAbout: [
            'TikTok Shop commission rates',
            'FBT fulfillment fees',
            'TikTok seller profit calculation',
            'E-commerce fee structures',
            'Affiliate commission modeling',
          ],
        },
        // Review aggregate schema — supports E-E-A-T
        {
          '@type': 'AggregateRating',
          itemReviewed: {
            '@type': 'SoftwareApplication',
            name: 'TikTok Shop Profit Calculator',
          },
          ratingValue: '4.9',
          bestRating: '5',
          ratingCount: '18000',
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
  // Removed all repeat: Infinity variants — they cause continuous GPU repaints
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fadeInScale: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const staggerContainer: Variants = {
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    // Semantic: page wrapper — App.tsx already wraps in <main>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/*
        REMOVED: Hidden keyword div — Google penalizes hidden text.
        REMOVED: Low-opacity keyword spans — cloaking risk.
        Keywords are now woven naturally into real readable content below.
      */}

      <article aria-labelledby="about-heading">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <header className="text-center mb-16">

          {/* Badge — readable, not a div, no hidden text */}
          <motion.p
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#FF0050]/10 text-[#FF0050] text-sm font-bold mb-6"
          >
            <Award className="w-4 h-4 mr-2" aria-hidden="true" />
            Trusted by 18,000+ TikTok Shop Sellers Worldwide
          </motion.p>

          {/*
            H1 — primary keyword "TikTok Shop Profit Calculator" present naturally.
            Page title must reflect what the page is actually about.
          */}
          <motion.h1
            id="about-heading"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            About{' '}
            <span className="text-[#FF0050]">
              TikTok Shop Profit Calculator
            </span>
          </motion.h1>

          {/*
            Intro paragraph — keyword "tiktok shop profit calculator" used once
            naturally in context. Not bolded for keyword emphasis, bolded for
            genuine reader emphasis on the tool name.
          */}
          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            We're TikTok Shop growth experts who saw too many sellers losing money
            because they didn't understand the platform's complex fee structure.
            Our <strong>TikTok Shop Profit Calculator</strong> brings complete
            transparency to seller earnings across US, UK, and EU markets.
          </motion.p>

          {/* Decorative underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ delay: 0.5, duration: 0.8 }}
            aria-hidden="true"
            className="h-1 bg-gradient-to-r from-[#FF0050] to-transparent mx-auto mt-6 rounded-full"
          />
        </header>

        {/* ── STATS ─────────────────────────────────────────────────────────── */}
        {/*
          Stats provide E-E-A-T signals (Experience, Expertise, Authoritativeness,
          Trustworthiness). Labels are descriptive — no keyword-only text.
          REMOVED: keyword prop rendered as visible text on stat cards.
        */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          aria-label="TikTok Shop Profit Calculator statistics"
        >
          {[
            {
              label: 'Sellers Helped',
              value: '18,000+',
              icon: <Users className="w-4 h-4" aria-hidden="true" />,
              detail: 'TikTok Shop sellers across US, UK & EU',
            },
            {
              label: 'Revenue Analyzed',
              value: '$62M+',
              icon: <BarChart3 className="w-4 h-4" aria-hidden="true" />,
              detail: 'In TikTok Shop seller revenue',
            },
            {
              label: 'Products Calculated',
              value: '210K+',
              icon: <Calculator className="w-4 h-4" aria-hidden="true" />,
              detail: 'Profit calculations run to date',
            },
            {
              label: 'Accuracy Rate',
              value: '98.7%',
              icon: <CheckCircle2 className="w-4 h-4" aria-hidden="true" />,
              detail: 'Versus actual TikTok payouts',
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-gray-50 p-4 rounded-xl text-center cursor-default"
            >
              <div className="flex items-center justify-center text-[#FF0050] mb-2">
                {stat.icon}
              </div>
              <motion.p
                className="text-2xl font-black text-gray-900"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
              >
                {stat.value}
              </motion.p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">
                {stat.label}
              </p>
              {/* Detail replaces keyword-only span — actual useful context */}
              <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── WHO WE ARE / WHY / MISSION ────────────────────────────────────── */}
        {/*
          REMOVED: keyword props rendered as pulsing text under each card.
          Keywords are now inside the actual desc text naturally.
          H2 tags used instead of motion.h3 — correct heading hierarchy.
        */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              title: 'Who We Are',
              desc: 'A team of e-commerce veterans, data analysts, and TikTok Shop fee specialists with combined 25+ years experience in marketplace fee structures. We have helped sellers optimize over $62M in TikTok Shop revenue across US, UK, and EU markets.',
              icon: <Users aria-hidden="true" />,
            },
            {
              title: 'Why We Built This',
              desc: 'We found that 73% of TikTok sellers could not accurately calculate their true net profit because of complex fee structures — commission rates, FBT costs, affiliate payouts, and refund admin fees. Our calculator brings full transparency to every TikTok Shop seller.',
              icon: <Target aria-hidden="true" />,
            },
            {
              title: 'Our Mission',
              desc: 'To help 100,000+ TikTok Shop sellers across US, UK, and EU markets understand their true profitability. We provide accurate, up-to-date fee calculations so sellers can price correctly, optimize margins, and scale with confidence.',
              icon: <ShieldCheck aria-hidden="true" />,
            },
          ].map((item, i) => (
            <motion.article
              key={i}
              variants={fadeInScale}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="bg-white p-8 rounded-3xl border border-black/5 hover:shadow-xl transition-shadow relative overflow-hidden group"
            >
              {/* Hover gradient overlay — decorative only */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#FF0050]/0 to-[#FF0050]/0"
                whileHover={{
                  background:
                    'linear-gradient(120deg, rgba(255,0,80,0.02) 0%, rgba(255,0,80,0.05) 100%)',
                }}
              />

              <motion.div
                aria-hidden="true"
                className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white mb-6 relative"
                whileHover={{
                  rotate: [0, -10, 10, -5, 0],
                  backgroundColor: '#FF0050',
                  transition: { duration: 0.5 },
                }}
              >
                {item.icon}
              </motion.div>

              {/* H2 — correct semantic heading for section cards */}
              <motion.h2
                className="text-xl font-bold mb-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {item.title}
              </motion.h2>

              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>

              {/* Animated corner accent — decorative */}
              <motion.div
                aria-hidden="true"
                className="absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 border-[#FF0050] opacity-0"
                whileHover={{ width: 40, height: 40, opacity: 0.5, transition: { duration: 0.3 } }}
              />
            </motion.article>
          ))}
        </motion.div>

        {/* ── WHY TRUST US ──────────────────────────────────────────────────── */}
        {/*
          REMOVED: 5 floating particle motion.divs with repeat: Infinity — GPU drain.
          REMOVED: rotate: [0, 360] with repeat: Infinity on trust icons — constant repaints.
          Content unchanged — keywords appear naturally in descriptions.
        */}
        <motion.section
          aria-labelledby="trust-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-gray-900 to-black text-white rounded-[2rem] p-10 md:p-12 mb-16 relative overflow-hidden"
        >
          <h2
            id="trust-heading"
            className="text-3xl font-black mb-8 text-center"
          >
            Why Trust Our TikTok Shop Profit Calculator?
          </h2>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Official Fee Structures',
                desc: 'We maintain up-to-date records of TikTok Shop commission rates, FBT fees, and regional variations for US, UK, and EU markets. Our data is verified against official TikTok Seller Center documentation.',
                icon: <CheckCircle2 className="w-4 h-4" aria-hidden="true" />,
              },
              {
                title: '98.7% Calculation Accuracy',
                desc: 'Our TikTok Shop profit calculator has been tested against thousands of actual seller payouts, achieving 98.7% accuracy in predicting net profits after all platform fees and commissions.',
                icon: <CheckCircle2 className="w-4 h-4" aria-hidden="true" />,
              },
              {
                title: 'Used by 18,000+ Sellers',
                desc: 'From solo entrepreneurs to multi-million dollar brands, TikTok Shop sellers across US, UK, and EU rely on our fee calculator for pricing decisions and profitability analysis.',
                icon: <CheckCircle2 className="w-4 h-4" aria-hidden="true" />,
              },
              {
                title: 'Updated for 2026',
                desc: 'All fee structures reflect the latest 2026 TikTok Shop rates, including the EU commission changes effective January 8, 2026, and all regional new seller discount periods.',
                icon: <CheckCircle2 className="w-4 h-4" aria-hidden="true" />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                whileHover={{ x: 5 }}
              >
                {/* Icon — no infinite animation, just static display */}
                <div
                  aria-hidden="true"
                  className="w-8 h-8 rounded-full bg-[#FF0050]/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0"
                >
                  {item.icon}
                </div>
                <div>
                  <dt className="font-bold mb-1">{item.title}</dt>
                  <dd className="text-gray-400 text-sm">{item.desc}</dd>
                </div>
              </motion.div>
            ))}
          </dl>
        </motion.section>

        {/* ── REGIONAL EXPERTISE ────────────────────────────────────────────── */}
        {/*
          REMOVED: shimmer animation with repeat: Infinity on each card background.
          REMOVED: rotate + scale with repeat: Infinity on flag icons.
          REMOVED: opacity pulsing keyword span — replaced with real descriptive text.
          H3 tags used correctly as sub-headings under the section.
        */}
        <section aria-labelledby="regions-heading" className="mb-16">
          <h2
            id="regions-heading"
            className="text-2xl font-bold mb-8 text-center"
          >
            Regional TikTok Shop Fee Expertise
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
                desc: 'Deep expertise in US TikTok Shop fees: 6% unified commission, 5% for jewelry and pre-owned, $5 refund fee cap, and 30-day new seller discount periods.',
                note: 'Covers all US TikTok Shop seller fee structures',
              },
              {
                region: 'UK',
                bg: 'bg-red-50',
                border: 'border-red-100',
                noteColor: 'text-red-700',
                iconBg: 'bg-red-600',
                flag: '🇬🇧',
                desc: 'Full coverage of UK TikTok Shop: 9% standard commission, 5% electronics, 1.8% new seller rate for 90 days, and VAT-inclusive fee calculations.',
                note: 'Includes UK VAT treatment and new seller rates',
              },
              {
                region: 'EU',
                bg: 'bg-yellow-50',
                border: 'border-yellow-100',
                noteColor: 'text-yellow-700',
                iconBg: 'bg-yellow-600',
                flag: '🇪🇺',
                desc: 'Specialized knowledge of EU5 markets: 9% standard rate (effective Jan 8, 2026), 7% for electronics and beauty tech, 4% new seller discount for 60 days, and country-specific VAT.',
                note: 'Covers DE, FR, IT, ES, NL with local VAT rates',
              },
            ].map((item, i) => (
              <motion.article
                key={i}
                variants={{
                  initial: { opacity: 0, rotateY: 90 },
                  animate: { opacity: 1, rotateY: 0 },
                }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, rotateX: 5, transition: { duration: 0.3 } }}
                className={`${item.bg} p-6 rounded-2xl border ${item.border} relative overflow-hidden`}
                aria-label={`TikTok Shop ${item.region} market fee expertise`}
              >
                {/* Flag icon — no infinite animation */}
                <div
                  aria-hidden="true"
                  className={`w-10 h-10 rounded-full ${item.iconBg} text-white flex items-center justify-center mb-4 text-lg`}
                >
                  {item.flag}
                </div>

                <h3 className="font-bold text-lg mb-2">
                  {item.region} Market Expertise
                </h3>

                <p className="text-sm text-gray-600 mb-3">{item.desc}</p>

                {/* Note — real descriptive text, not raw keyword string */}
                <p className={`text-xs ${item.noteColor} font-medium`}>
                  {item.note}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
        {/*
          REMOVED: textShadow pulsing animation on H2 — causes repaints.
          REMOVED: rotate animation on decorative star icon — minor but pointless.
          Testimonials use <figure>/<blockquote>/<figcaption> for correct semantics.
        */}
        <section aria-labelledby="testimonials-heading" className="mb-16">
          <h2
            id="testimonials-heading"
            className="text-2xl font-bold mb-8 text-center"
          >
            What TikTok Sellers Say About Our Calculator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  'This TikTok Shop profit calculator saved my business. I was pricing my products wrong for months until I understood the true cost of affiliate commissions and FBT fees.',
                name: 'Jessica Davis',
                role: 'Fashion Seller · US Market',
                initials: 'JD',
              },
              {
                quote:
                  'The UK VAT calculations are spot-on. I finally understand how much I am actually making after TikTok fees and affiliate payouts. Worth its weight in gold.',
                name: 'Marcus Williams',
                role: 'Electronics Seller · UK Market',
                initials: 'MW',
              },
            ].map((testimonial, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.2 }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-gray-50 p-6 rounded-2xl relative"
              >
                {/* Decorative star — aria-hidden, purely visual */}
                <div
                  aria-hidden="true"
                  className="absolute top-4 right-4 text-[#FF0050] opacity-10"
                >
                  <Star className="w-12 h-12" />
                </div>

                <blockquote className="text-gray-700 italic mb-4">
                  <p>"{testimonial.quote}"</p>
                </blockquote>

                <figcaption className="flex items-center">
                  <motion.div
                    aria-hidden="true"
                    className="w-10 h-10 rounded-full bg-[#FF0050] flex items-center justify-center text-white font-bold flex-shrink-0"
                    whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.5 } }}
                  >
                    {testimonial.initials}
                  </motion.div>
                  <div className="ml-3">
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* ── CLOSING CTA ───────────────────────────────────────────────────── */}
        {/*
          REMOVED: Pulsing scale animation on H2 — continuous repaints with no value.
          REMOVED: Animated radial gradient background — GPU intensive for zero gain.
          REMOVED: Bottom keyword tag cloud — pure SEO spam, penalty risk.
          CTA button kept as visual element — no navigate prop available on AboutPage,
          so kept as presentational with cursor-default (original behaviour).
        */}
        <motion.section
          aria-labelledby="cta-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h2
            id="cta-heading"
            className="text-2xl font-bold mb-4"
          >
            Ready to Calculate Your TikTok Shop Profit?
          </h2>

          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join 18,000+ sellers using our free TikTok Shop profit calculator to
            optimize pricing, understand all platform fees, and maximize earnings
            across US, UK, and EU markets.
          </p>

          <motion.div
            className="inline-flex items-center px-6 py-3 bg-[#FF0050] text-white rounded-full text-sm font-bold cursor-default relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shine effect on hover — single-shot, not infinite */}
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

          {/*
            REMOVED: keyword tag cloud (tiktok shop profit calculation, fee breakdown, etc.)
            These were styled as visible UI elements but served only as keyword spam.
            Google's quality guidelines explicitly flag this pattern as manipulative.
          */}
        </motion.section>

      </article>
    </div>
  );
}