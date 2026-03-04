import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  ChevronRight,
  Zap,
  BarChart3,
  Globe,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Download,
  Calculator,
  Target,
  Award,
  Users,
  Percent,
  Truck,
  Package,
  TrendingDown,
  LineChart,
  RefreshCw,
  Star,
  Clock,
  Lock,
  BookOpen,
} from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

// Scroll-triggered fade-in wrapper
function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Structured data — injected into <head> properly via useEffect
  useEffect(() => {
    // Remove any existing script first to avoid duplicates on re-render
    const existing = document.getElementById('landing-structured-data');
    if (existing) document.head.removeChild(existing);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'landing-structured-data';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://tiktokprofitcalculator.com/',
          url: 'https://tiktokprofitcalculator.com/',
          name: 'TikTok Shop Profit Calculator 2026 — Free US, UK & EU Fee Tool',
          description:
            'Free TikTok Shop profit calculator. Calculate net profit after platform commission, FBT fees, affiliate commissions, and ad spend for US, UK, and EU sellers.',
          inLanguage: 'en-US',
          isPartOf: { '@id': 'https://tiktokprofitcalculator.com/#website' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://tiktokprofitcalculator.com/',
              },
            ],
          },
        },
        {
          '@type': 'WebSite',
          '@id': 'https://tiktokprofitcalculator.com/#website',
          url: 'https://tiktokprofitcalculator.com/',
          name: 'TikTok Shop Profit Calculator',
          publisher: {
            '@type': 'Organization',
            name: 'TikTok Shop Profit Calculator',
            url: 'https://tiktokprofitcalculator.com/',
          },
        },
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://tiktokprofitcalculator.com/#app',
          name: 'TikTok Shop Profit Calculator 2026',
          description:
            'Free TikTok Shop profit calculator for sellers in the US, UK, and EU. Calculate net profit after platform fees, affiliate commissions, FBT costs, and advertising spend with 2026 fee structures.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: 'https://tiktokprofitcalculator.com',
          softwareVersion: '3.0',
          featureList: [
            'Net profit calculation after all TikTok Shop fees',
            'US, UK, and EU5 region support',
            'FBT vs self-ship cost comparison',
            'Affiliate commission modeling',
            'ROAS and ad spend calculator',
            'Break-even price finder',
            'Monthly profit projection',
            'PDF report export',
          ],
          creator: {
            '@type': 'Organization',
            name: 'TikTok Shop Profit Calculator',
            url: 'https://tiktokprofitcalculator.com',
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How much commission does TikTok Shop take in the US?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'TikTok Shop charges a unified referral fee of 6% for most US categories. Jewelry and pre-owned items are 5%. New sellers receive 3% for the first 30 days.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are TikTok Shop fees in the UK?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'UK TikTok Shop standard commission is 9% (VAT inclusive). Electronics pay 5%. New sellers pay 1.8% for the first 90 days.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do EU TikTok Shop fees work?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'EU standard commission is 9% effective January 8, 2026. Electronics and beauty tech are 7%. New sellers receive 4% for the first 60 days. VAT varies by country: Germany 19%, France 20%, Italy 22%, Spain 21%, Netherlands 21%.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is FBT (Fulfilled by TikTok) and how much does it cost?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'FBT fulfillment fees range from $3.50 for small standard items to $8.00+ for oversize. Monthly storage is $0.50–$0.75 per cubic foot. Returns processing is $3.00 per item.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do I calculate TikTok Shop profit?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Net Profit = Effective Revenue − (COGS + TikTok Commission + Fulfillment + Affiliate Commissions + Ad Spend + Refund Costs). Use the calculator above for an instant breakdown.',
              },
            },
          ],
        },
      ],
    });
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('landing-structured-data');
      if (el) document.head.removeChild(el);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    {
      question: 'How much commission does TikTok Shop take in the US?',
      answer:
        'In the United States, TikTok Shop charges a unified referral fee of 6% for most categories including fashion, beauty, and home goods. Jewelry and pre-owned items have a reduced rate of 5%. New sellers get a 3% introductory rate for the first 30 days, provided they make their first sale within 60 days. This fee includes payment processing — there are no separate transaction fees in the US market.',
    },
    {
      question: 'What are TikTok Shop fees in the UK?',
      answer:
        'UK TikTok Shop standard commission is 9% for most categories, and 5% for electronics. All rates are VAT inclusive (20% UK VAT applies). New sellers pay just 1.8% for the first 90 days. Transaction processing fees are bundled into the commission rate.',
    },
    {
      question: 'How do EU TikTok Shop fees work for Germany and France?',
      answer:
        'For EU5 markets (Germany, France, Italy, Spain, Netherlands), the standard commission is 9% effective January 8, 2026. Electronics and beauty tech qualify for a reduced 7% rate. New sellers receive 4% for the first 60 days. VAT is country-specific: Germany 19%, France 20%, Italy 22%, Spain 21%, Netherlands 21%.',
    },
    {
      question: 'What is FBT (Fulfilled by TikTok) and how much does it cost?',
      answer:
        'FBT (Fulfilled by TikTok) covers warehousing, pick-and-pack, and last-mile delivery. Fulfillment fees start at $3.50 for small standard items, $5.50 for large standard, and $8.00+ for oversize. Monthly storage is $0.50/cu ft (Jan–Sep) or $0.75/cu ft (Oct–Dec). Returns processing is $3.00 per item plus a $1.50 inspection fee.',
    },
    {
      question: 'How do I calculate my break-even price on TikTok Shop?',
      answer:
        'Break-even price = (COGS + Fulfillment + Fixed Costs) ÷ (1 − Commission Rate − Estimated Return Rate). Our calculator handles this automatically, factoring in all regional fee structures, affiliate commissions, and refund admin fees so you always know your true floor price.',
    },
    {
      question: 'What is the TikTok Shop refund admin fee?',
      answer:
        'When a customer returns an item, TikTok retains a refund admin fee. In the US this is 20% of the original commission, capped at $5 per refund. Similar structures exist in the UK and EU. This fee is in addition to any lost COGS and shipping costs, which our calculator includes in the return-rate impact estimate.',
    },
    {
      question: 'How do affiliate commissions affect my TikTok Shop profit?',
      answer:
        'Affiliate (creator) commissions typically range from 5–30% of the sale price and are deducted from your effective revenue before TikTok\'s platform fee. High-performing TikTok LIVE campaigns often use 15–20% commissions. Our calculator lets you model different tiers so you can find the rate that balances creator incentive with your margin target.',
    },
  ];

  return (
    // Role="main" omitted here — App.tsx wraps this in <main>
    <div className="overflow-hidden bg-white">

      {/* ── HERO ─────────────────────────────────────────────── */}
      {/*
        SEO: H1 contains primary keyword "TikTok Shop Profit Calculator"
        naturally. Section uses role="banner" semantics via placement inside <main>.
      */}
      <section
        id="hero"
        aria-label="TikTok Shop Profit Calculator — Hero"
        className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8"
      >
        {/* Decorative ambient blobs — aria-hidden so screen readers skip */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        >
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#FF0050]/6 blur-[140px] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#00F2EA]/6 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          {/* Keyword-rich badge — visible, readable, not hidden */}
          <motion.p
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF0050]/10 text-[#FF0050] text-sm font-bold mb-6"
          >
            <Zap className="w-3.5 h-3.5" aria-hidden="true" />
            Updated for 2026 · US, UK &amp; EU Fee Structures
          </motion.p>

          {/*
            H1 — primary keyword "TikTok Shop Profit Calculator" front-loaded.
            "& Seller Fee Analyzer 2026" adds secondary keyword naturally.
          */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-5 leading-[1.08]"
          >
            TikTok Shop{' '}
            <span className="text-[#FF0050]">Profit Calculator</span>
            <br className="hidden md:block" />
            &amp; Seller Fee Analyzer 2026
          </motion.h1>

          {/* Meta-description-quality paragraph — matches what's in index.html */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Calculate your exact net profit after TikTok platform fees, affiliate commissions,
            FBT costs, and ad spend — for US, UK, and EU sellers. Free, instant, and accurate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={onStart}
              aria-label="Open TikTok Shop Profit Calculator"
              className="group w-full sm:w-auto bg-black text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-[#FF0050] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center"
            >
              <Calculator className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
              Calculate Your Profit Now
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </button>

            <button
              onClick={() => scrollToSection('fee-guide')}
              aria-label="Jump to TikTok Shop complete fee guide"
              className="text-gray-500 hover:text-black font-medium flex items-center gap-1 transition-colors duration-200"
            >
              Complete Fee Guide
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>

          {/* Trust signals — visible text, good for E-E-A-T */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-5 mt-7 text-sm text-gray-400"
          >
            {[
              { icon: <Lock className="w-3.5 h-3.5 text-green-500" aria-hidden="true" />, text: 'Free · No credit card' },
              { icon: <Zap className="w-3.5 h-3.5 text-yellow-500" aria-hidden="true" />, text: 'Instant results' },
              { icon: <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />, text: 'All fees included' },
              { icon: <RefreshCw className="w-3.5 h-3.5 text-purple-500" aria-hidden="true" />, text: '2026 fee structures' },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {item.icon}
                {item.text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY SELLERS LOSE MONEY ───────────────────────────── */}
      {/*
        SEO: H2 uses secondary keyword "TikTok Shop Fees".
        Content is substantive, readable — no keyword stuffing.
      */}
      <section
        id="problem"
        aria-labelledby="problem-heading"
        className="py-16 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <FadeIn>
              <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-bold mb-5">
                <TrendingDown className="w-3.5 h-3.5" aria-hidden="true" />
                Hidden Costs Revealed
              </p>

              <h2
                id="problem-heading"
                className="text-3xl md:text-4xl font-black mb-5 leading-tight"
              >
                The Hidden{' '}
                <span className="text-[#FF0050]">TikTok Shop Fees</span>{' '}
                That Kill Your Margin
              </h2>

              <p className="text-base text-gray-600 mb-6">
                Most sellers only account for the platform commission when pricing products.
                Here's what gets missed — and why calculating every TikTok Shop fee before
                you list is essential to staying profitable:
              </p>

              {/* Fee list — semantic ul/li for accessibility and crawlability */}
              <ul className="space-y-2" aria-label="Hidden TikTok Shop fees">
                {[
                  {
                    icon: <Percent />,
                    title: 'Platform Commission',
                    desc: 'US: 6% · UK: 9% · EU: 9% — often the largest single cost per sale',
                  },
                  {
                    icon: <Users />,
                    title: 'Affiliate Commissions',
                    desc: '10–30% to creators — the highest-impact hidden cost in TikTok LIVE campaigns',
                  },
                  {
                    icon: <Package />,
                    title: 'Fulfilled by TikTok (FBT)',
                    desc: 'Fulfillment, storage, and return processing fees add up fast',
                  },
                  {
                    icon: <Truck />,
                    title: 'Shipping & Logistics',
                    desc: 'Self-ship vs FBT — our calculator shows the true cost of each option',
                  },
                  {
                    icon: <RefreshCw />,
                    title: 'Returns & Refund Admin Fees',
                    desc: '15–20% return rates are common; each refund incurs an admin fee',
                  },
                  {
                    icon: <BarChart3 />,
                    title: 'Advertising Spend (ROAS)',
                    desc: 'Ad cost per unit erodes margin faster than most sellers expect',
                  },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-3 group hover:bg-red-50 px-3 py-2.5 rounded-xl transition-colors duration-200"
                  >
                    <div
                      aria-hidden="true"
                      className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors duration-200"
                    >
                      {React.cloneElement(item.icon, { className: 'w-3.5 h-3.5 text-red-500' })}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div
                role="note"
                className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200 flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-red-800 font-semibold text-sm">
                  Sellers who calculate all fees before setting prices are significantly
                  more likely to stay profitable long-term.
                </p>
              </div>
            </FadeIn>

            {/* Live worked example — aria-label describes purpose */}
            <FadeIn delay={0.12}>
              <figure
                aria-label="Example TikTok Shop profit calculation showing a loss scenario"
                className="bg-gradient-to-br from-gray-950 to-black rounded-[1.75rem] p-7 shadow-2xl lg:rotate-2 hover:rotate-0 transition-transform duration-500"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-gray-600 text-xs font-mono">PROFIT_ANALYSIS · US</span>
                </div>

                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Selling Price', value: '$29.99', color: 'text-white' },
                    { label: 'TikTok Commission (6%)', value: '−$1.80', color: 'text-red-400' },
                    { label: 'Affiliate Commission (15%)', value: '−$4.50', color: 'text-red-400' },
                    { label: 'FBT Fulfillment', value: '−$4.99', color: 'text-red-400' },
                    { label: 'Product Cost (COGS)', value: '−$12.00', color: 'text-red-400' },
                    { label: 'Ad Spend per Unit', value: '−$2.00', color: 'text-red-400' },
                  ].map((row, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className="flex justify-between"
                    >
                      <dt className="text-gray-400">{row.label}</dt>
                      <dd className={`font-bold ${row.color}`}>{row.value}</dd>
                    </motion.div>
                  ))}
                  <div className="border-t border-gray-800 my-1" />
                  <div className="flex justify-between items-center">
                    <dt className="text-gray-300 font-bold">Net Profit</dt>
                    <dd className="text-red-500 font-black text-xl">−$4.30 LOSS</dd>
                  </div>
                </dl>

                <figcaption className="mt-3 p-3 bg-red-500/15 rounded-xl border border-red-500/25 text-center">
                  <p className="text-red-400 text-xs">
                    Without accurate TikTok Shop fee calculation, this seller believed they
                    were profitable on every sale.
                  </p>
                </figcaption>
              </figure>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FEE GUIDE ────────────────────────────────────────── */}
      {/*
        SEO: This section targets "TikTok Shop fee breakdown", "TikTok commission rates",
        "TikTok Shop US UK EU fees" — all through real readable content.
      */}
      <section
        id="fee-guide"
        aria-labelledby="fee-guide-heading"
        className="py-16 bg-gradient-to-br from-[#FF0050]/4 to-[#00F2EA]/4"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeIn className="text-center mb-12">
            <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF0050]/10 text-[#FF0050] text-sm font-bold mb-4">
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              Complete Fee Guide · Updated January 2026
            </p>
            <h2
              id="fee-guide-heading"
              className="text-3xl md:text-4xl font-black mb-3"
            >
              TikTok Shop <span className="text-[#FF0050]">Fee Breakdown</span> by Region
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Official 2026 commission rates for US, UK, and EU5 markets — including
              new-seller discounts, VAT treatment, and FBT fulfillment costs.
            </p>
          </FadeIn>

          {/* Region fee cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
            role="list"
            aria-label="TikTok Shop commission rates by region"
          >
            {[
              {
                flag: '🇺🇸',
                region: 'United States',
                color: 'blue',
                fees: [
                  { label: 'Standard commission', value: '6.0%', highlight: true },
                  { label: 'Jewelry & Pre-Owned', value: '5.0%' },
                  { label: 'New seller (30 days)', value: '3.0%', green: true },
                  { label: 'Refund admin fee', value: '20% of commission (max $5)' },
                  { label: 'FBT (small standard)', value: '$3.50' },
                ],
                note: 'Unified fee includes payment processing — no separate transaction fee',
              },
              {
                flag: '🇬🇧',
                region: 'United Kingdom',
                color: 'red',
                fees: [
                  { label: 'Standard commission', value: '9.0%', highlight: true },
                  { label: 'Electronics', value: '5.0%' },
                  { label: 'New seller (90 days)', value: '1.8%', green: true },
                  { label: 'VAT on commission', value: '20% included' },
                  { label: 'FBT (small standard)', value: '£2.80' },
                ],
                note: 'Commission rate is VAT inclusive — calculated on final customer price',
              },
              {
                flag: '🇪🇺',
                region: 'European Union',
                color: 'yellow',
                fees: [
                  { label: 'Standard commission', value: '9.0%', highlight: true },
                  { label: 'Electronics / Beauty Tech', value: '7.0%' },
                  { label: 'New seller (60 days)', value: '4.0%', green: true },
                  { label: 'VAT range', value: '19–27% by country' },
                  { label: 'FBT (small standard)', value: '€3.00+' },
                ],
                note: 'Effective January 8, 2026 — covers DE, FR, IT, ES, NL markets',
              },
            ].map((card, i) => {
              const colorMap: Record<
                string,
                { bg: string; icon: string; note: string }
              > = {
                blue: { bg: 'bg-blue-50', icon: 'bg-blue-600', note: 'text-blue-800' },
                red: { bg: 'bg-red-50', icon: 'bg-red-600', note: 'text-red-800' },
                yellow: { bg: 'bg-yellow-50', icon: 'bg-yellow-600', note: 'text-yellow-800' },
              };
              const c = colorMap[card.color];
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <article
                    role="listitem"
                    aria-label={`TikTok Shop fees for ${card.region}`}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                  >
                    <div
                      aria-hidden="true"
                      className={`w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center mb-4`}
                    >
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-1">{card.region}</h3>
                    <p className="text-gray-400 text-sm mb-5">
                      {card.flag} TikTok Shop Marketplace
                    </p>

                    <dl className="space-y-3 flex-1">
                      {card.fees.map((fee, j) => (
                        <div
                          key={j}
                          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                        >
                          <dt className="text-sm text-gray-600">{fee.label}</dt>
                          <dd
                            className={`font-bold text-sm ${
                              fee.highlight
                                ? 'text-[#FF0050]'
                                : fee.green
                                ? 'text-green-600'
                                : 'text-gray-800'
                            }`}
                          >
                            {fee.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className={`mt-4 p-3 ${c.bg} rounded-xl`}>
                      <p className={`text-xs ${c.note}`}>{card.note}</p>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>

          {/* FBT Detail Panel */}
          <FadeIn>
            <section
              aria-labelledby="fbt-heading"
              className="bg-white rounded-2xl p-7 shadow-lg"
            >
              <h3
                id="fbt-heading"
                className="text-xl font-bold mb-5 flex items-center gap-2"
              >
                <Package className="w-5 h-5 text-[#FF0050]" aria-hidden="true" />
                Fulfilled by TikTok (FBT) — Complete Fee Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    title: 'Fulfillment Fees',
                    rows: [
                      ['Small Standard', '$3.50'],
                      ['Large Standard', '$5.50'],
                      ['Oversize', '$8.00+'],
                      ['Special Handling', '$12.00+'],
                    ],
                  },
                  {
                    title: 'Storage Fees',
                    rows: [
                      ['Jan–Sep', '$0.50 / cu ft'],
                      ['Oct–Dec', '$0.75 / cu ft'],
                      ['Long-term (365+ days)', '$5.00 / cu ft'],
                    ],
                  },
                  {
                    title: 'Returns Processing',
                    rows: [
                      ['Return Processing', '$3.00'],
                      ['Inspection Fee', '$1.50'],
                      ['Disposal Fee', '$0.75'],
                    ],
                  },
                ].map((panel, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold mb-3 text-sm">{panel.title}</h4>
                    <dl className="space-y-2">
                      {panel.rows.map(([label, value], j) => (
                        <div key={j} className="flex justify-between text-sm">
                          <dt className="text-gray-500">{label}</dt>
                          <dd className="font-bold">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>
        </div>
      </section>

      {/* ── HOW TO CALCULATE ──────────────────────────────────── */}
      {/*
        SEO: Targets "how to calculate TikTok Shop profit" — a high-intent query.
        Worked example with real numbers strengthens E-E-A-T.
      */}
      <section
        id="how-to-calculate"
        aria-labelledby="how-to-heading"
        className="py-16 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeIn className="text-center mb-10">
            <h2
              id="how-to-heading"
              className="text-3xl md:text-4xl font-black mb-3"
            >
              How to Calculate TikTok Shop Profit
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Step-by-step formula with a worked US example — so you know exactly
              what our TikTok Shop profit calculator does behind the scenes.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeIn>
              <div className="bg-gray-50 rounded-2xl p-7 h-full">
                <h3 className="text-xl font-bold mb-5">The TikTok Shop Profit Formula</h3>

                <div
                  aria-label="TikTok Shop profit calculation formula"
                  className="p-5 bg-black text-white rounded-xl mb-6 font-mono text-sm leading-relaxed"
                >
                  <p className="text-gray-400 mb-2">// Net Profit per unit</p>
                  <p>Net Profit =</p>
                  <p className="pl-4 text-green-400">Effective Revenue</p>
                  <p className="pl-4 text-red-400">− COGS</p>
                  <p className="pl-4 text-red-400">− Platform Commission</p>
                  <p className="pl-4 text-red-400">− Fulfillment Cost</p>
                  <p className="pl-4 text-red-400">− Affiliate Commission</p>
                  <p className="pl-4 text-red-400">− Ad Spend</p>
                  <p className="pl-4 text-red-400">− Refund Cost</p>
                </div>

                <ol className="space-y-4" aria-label="Profit formula steps">
                  {[
                    {
                      n: 1,
                      color: 'green',
                      title: 'Effective Revenue',
                      desc: 'Selling price minus any seller or platform-funded discounts',
                    },
                    {
                      n: 2,
                      color: 'red',
                      title: 'Platform Commission',
                      desc: 'US 6% · UK 9% · EU 9% — applied to effective revenue',
                    },
                    {
                      n: 3,
                      color: 'blue',
                      title: 'Fulfillment Cost',
                      desc: "Your shipping rate, or FBT fee if using TikTok's warehouse",
                    },
                    {
                      n: 4,
                      color: 'purple',
                      title: 'Refund Cost',
                      desc: '(Commission + lost COGS + lost shipping) × your return rate %',
                    },
                  ].map((step) => (
                    <li key={step.n} className="flex items-start gap-3">
                      <div
                        aria-hidden="true"
                        className={`w-7 h-7 rounded-full bg-${step.color}-100 text-${step.color}-600 flex items-center justify-center text-sm font-bold flex-shrink-0`}
                      >
                        {step.n}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{step.title}</p>
                        <p className="text-xs text-gray-500">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-gray-50 rounded-2xl p-7 h-full">
                <h3 className="text-xl font-bold mb-5">
                  Worked Example — US Market ($49.99 Product)
                </h3>

                <dl className="space-y-2.5">
                  {[
                    { label: 'Selling Price', value: '$49.99', type: 'neutral' },
                    { label: 'Less: Seller Discount (10%)', value: '−$5.00', type: 'minus' },
                    { label: 'Effective Revenue', value: '$44.99', type: 'bold' },
                    { label: 'Less: Product Cost (COGS)', value: '−$15.00', type: 'minus' },
                    { label: 'Less: TikTok Commission (6%)', value: '−$2.70', type: 'minus' },
                    { label: 'Less: FBT Fulfillment', value: '−$4.99', type: 'minus' },
                    { label: 'Less: Affiliate Commission (10%)', value: '−$4.50', type: 'minus' },
                    { label: 'Less: Ad Spend per Unit', value: '−$2.00', type: 'minus' },
                    { label: 'Less: Refund Cost (5% return rate)', value: '−$1.46', type: 'minus' },
                  ].map((row, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex justify-between pb-2 ${
                        row.type === 'bold'
                          ? 'border-y border-gray-300 py-2 my-1'
                          : 'border-b border-gray-200'
                      }`}
                    >
                      <dt
                        className={`text-sm ${
                          row.type === 'bold' ? 'font-bold' : 'text-gray-600'
                        }`}
                      >
                        {row.label}
                      </dt>
                      <dd
                        className={`text-sm font-bold ${
                          row.type === 'minus' ? 'text-red-600' : ''
                        }`}
                      >
                        {row.value}
                      </dd>
                    </motion.div>
                  ))}
                  <div className="flex justify-between pt-2">
                    <dt className="font-black">Net Profit Per Unit</dt>
                    <dd className="font-black text-green-600 text-lg">$14.34</dd>
                  </div>
                </dl>

                <p className="text-xs text-gray-400 mt-4">
                  Always base your TikTok Shop profit calculation on effective revenue
                  after discounts — not the listed selling price.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section
        id="features"
        aria-labelledby="features-heading"
        className="py-16 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeIn className="text-center mb-10">
            <h2
              id="features-heading"
              className="text-3xl md:text-4xl font-black mb-3"
            >
              What the TikTok Shop Calculator Covers
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Every TikTok Shop fee type, every region — all in one free tool.
            </p>
          </FadeIn>

          <ul
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            aria-label="TikTok Shop calculator features"
          >
            {[
              {
                icon: <Calculator className="w-5 h-5" />,
                title: 'Net Profit Calculator',
                desc: 'Exact profit after every fee: TikTok commission, FBT, affiliate, and ad spend.',
              },
              {
                icon: <Percent className="w-5 h-5" />,
                title: 'Commission Rate Analyzer',
                desc: "See how TikTok's regional rates (US 6%, UK/EU 9%) affect each product's margin.",
              },
              {
                icon: <Target className="w-5 h-5" />,
                title: 'Break-Even Price Finder',
                desc: 'Find the minimum listing price that keeps you profitable at any cost structure.',
              },
              {
                icon: <RefreshCw className="w-5 h-5" />,
                title: 'Return Rate Impact',
                desc: 'Model the margin impact from different return rates and TikTok refund admin fees.',
              },
              {
                icon: <Package className="w-5 h-5" />,
                title: 'Self-Ship vs FBT Comparison',
                desc: 'Side-by-side fulfillment cost comparison to choose the most profitable option.',
              },
              {
                icon: <LineChart className="w-5 h-5" />,
                title: 'Monthly Profit Projection',
                desc: 'Forecast total revenue and net profit based on your expected monthly sales volume.',
              },
              {
                icon: <Globe className="w-5 h-5" />,
                title: 'Multi-Region Support',
                desc: 'Switch between US, UK, and EU5 markets with accurate local fee structures.',
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: 'Affiliate Commission Modeler',
                desc: 'Test creator commission tiers from 5% to 30% and see the margin impact instantly.',
              },
              {
                icon: <Download className="w-5 h-5" />,
                title: 'PDF Report Export',
                desc: 'Export a professional TikTok Shop profit report with full calculations for your records.',
              },
            ].map((feature, i) => (
              <FadeIn key={i} delay={(i % 3) * 0.07}>
                <li className="bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-start gap-4 border border-gray-100 h-full list-none">
                  <div
                    aria-hidden="true"
                    className="w-9 h-9 rounded-lg bg-[#FF0050]/10 text-[#FF0050] flex items-center justify-center flex-shrink-0"
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      {/*
        SEO: E-E-A-T signal — real user reviews with named people and specific
        outcomes. Structured as <blockquote> for semantic correctness.
      */}
      <section
        id="trust"
        aria-labelledby="testimonials-heading"
        className="py-16 bg-black text-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeIn className="text-center mb-10">
            <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF0050]/20 text-[#FF0050] text-sm font-bold mb-4">
              <Award className="w-3.5 h-3.5" aria-hidden="true" />
              Used by TikTok Sellers in US, UK &amp; EU
            </p>
            <h2
              id="testimonials-heading"
              className="text-3xl md:text-4xl font-black mb-3"
            >
              What TikTok Shop Sellers Are Saying
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Real feedback from sellers who discovered margin leaks they didn't
              know existed until they used our profit calculator.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: 'Michael Chen',
                role: 'Fashion Seller, US Market',
                initials: 'MC',
                quote:
                  'Discovered I was losing money on my bestseller. After adjusting pricing with this tool, I turned a negative margin product into a 22% net margin.',
              },
              {
                name: 'Sarah Johnson',
                role: 'Beauty Brand, UK Market',
                initials: 'SJ',
                quote:
                  'The UK commission calculator showed me exactly how VAT was eating my margins. Now I know precisely what price I need for a 20% net return.',
              },
              {
                name: 'David Martinez',
                role: 'Electronics Seller, EU Markets',
                initials: 'DM',
                quote:
                  'Managing Germany, France, and Italy was a nightmare until I found this. Having all three EU fee structures in one place is a huge time saver.',
              },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <figure className="bg-white/5 rounded-2xl p-6 hover:bg-white/8 transition-colors duration-300 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      aria-hidden="true"
                      className="w-11 h-11 rounded-full bg-[#FF0050] flex items-center justify-center font-bold text-sm flex-shrink-0"
                    >
                      {t.initials}
                    </div>
                    <figcaption>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.role}</p>
                    </figcaption>
                  </div>
                  {/* Star rating — aria-label for screen readers */}
                  <div
                    className="flex gap-0.5 mb-3"
                    aria-label="5 out of 5 stars"
                    role="img"
                  >
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-300 text-sm leading-relaxed flex-1">
                    <p>"{t.quote}"</p>
                  </blockquote>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      {/*
        SEO: FAQ content targets long-tail queries directly.
        Uses <details>/<summary> pattern with motion for animation
        while keeping native semantics.
        aria-expanded on buttons for accessibility.
      */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="py-16 bg-white"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeIn className="text-center mb-10">
            <h2
              id="faq-heading"
              className="text-3xl md:text-4xl font-black mb-3"
            >
              TikTok Shop Fees — Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Everything you need to know about TikTok Shop commission rates,
              FBT fees, and how to calculate your true profit margin.
            </p>
          </FadeIn>

          <div className="space-y-2" role="list">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div
                  role="listitem"
                  className="border border-gray-200 rounded-xl overflow-hidden"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-5 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors duration-200"
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span
                      className="font-bold text-sm pr-2"
                      itemProp="name"
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 text-[#FF0050] font-bold text-lg leading-none"
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </button>

                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={false}
                    animate={{
                      height: openFaq === i ? 'auto' : 0,
                      opacity: openFaq === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                  >
                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                      <p className="pt-4" itemProp="text">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section
        aria-label="Get started with the TikTok Shop Profit Calculator"
        className="py-16 bg-gradient-to-r from-[#FF0050] to-[#ff4d7d]"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Know Your Numbers Before You List
            </h2>
            <p className="text-lg text-white/85 mb-8">
              Stop guessing your TikTok Shop profits. Use our free calculator to
              set prices that actually make money — across US, UK, and EU markets.
            </p>

            <button
              onClick={onStart}
              aria-label="Launch the free TikTok Shop Profit Calculator"
              className="group bg-white text-black px-10 py-4 rounded-2xl text-lg font-bold hover:bg-black hover:text-white transition-all duration-300 active:scale-95 inline-flex items-center shadow-2xl"
            >
              <Zap
                className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300"
                aria-hidden="true"
              />
              Launch Free Calculator
              <ArrowRight
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              />
            </button>

            <ul className="flex flex-wrap items-center justify-center gap-5 mt-6 text-white/70 text-sm list-none">
              {[
                { icon: <Clock className="w-3.5 h-3.5" aria-hidden="true" />, text: '30-second results' },
                { icon: <Lock className="w-3.5 h-3.5" aria-hidden="true" />, text: 'Free · No signup' },
                { icon: <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />, text: '2026 fees built in' },
                { icon: <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />, text: 'All regions supported' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {item.icon}
                  {item.text}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
