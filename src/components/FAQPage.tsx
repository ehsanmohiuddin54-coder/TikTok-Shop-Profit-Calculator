import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, ChevronDown, ShieldCheck } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: "How much commission does TikTok Shop take?",
      a: "TikTok Shop commission varies by region: US: 6% (5% for Jewelry & Pre-Owned), UK: 9% (5% for Electronics), EU: 9% (7% for Electronics/Beauty Tech). New sellers get reduced rates for 30–90 days. These rates are based on publicly available information and are subject to change — always verify current rates in your TikTok Seller Center."
    },
    {
      q: "How to calculate TikTok Shop profit?",
      a: "TikTok Shop profit = Effective Revenue − (COGS + TikTok Commission + Transaction Fees + Fulfillment Costs + Affiliate Commissions + Ad Spend + Refund Costs). Use our calculator for an estimate with your specific numbers. Results are approximations only."
    },
    {
      q: "What is FBT (Fulfilled by TikTok) fee?",
      a: "FBT (Fulfilled by TikTok) fees include fulfillment and storage costs. Fulfillment fees vary by product size and weight. Storage is charged monthly based on cubic footage. This calculator lets you input your specific FBT costs to estimate their impact on your profit."
    },
    {
      q: "Does TikTok charge transaction fees?",
      a: "TikTok uses a unified referral fee in most regions that includes both marketplace and payment processing fees. In the US it is 6% combined. UK and EU have separate structures but transaction fees are generally included in the commission rate. Verify your exact fee structure in TikTok Seller Center."
    },
    {
      q: "What is the TikTok Shop new seller discount?",
      a: "Based on publicly available information: US: 3% for first 30 days (must make first sale within 60 days of signup), UK: 1.8% for first 90 days, EU: 4% for first 60 days (effective Jan 8, 2026). Confirm eligibility and current terms directly with TikTok Shop."
    },
    {
      q: "What is break-even price in TikTok Shop?",
      a: "Break-even price is the minimum selling price needed to cover all costs including COGS, TikTok fees, fulfillment, marketing, and returns — with zero profit or loss. This calculator estimates your break-even price based on the inputs you provide."
    },
    {
      q: "How do affiliate commissions work on TikTok Shop?",
      a: "Affiliates earn a percentage of each sale they generate. You set the commission rate (typically 5–20%). This cost is deducted from your effective revenue and directly impacts your profit margin. Enter your affiliate rate in the calculator to see its effect."
    },
    {
      q: "What is the Refund Admin Fee?",
      a: "When a customer returns an order, TikTok retains a portion of the original commission as a refund admin fee. In the US this is approximately 20% of the commission, capped at $5 per refund. Check your region's Seller Center for the exact rate applicable to you."
    },
    {
      q: "Should I include ad costs in the calculation?",
      a: "Yes — ads and affiliate commissions are often among the largest expenses for TikTok Shop sellers. Including them in your calculation gives you a more realistic view of your actual net profit per unit."
    },
    {
      q: "Why might my actual payout differ from this estimate?",
      a: "This tool provides estimates based on publicly available fee structures. Actual payouts may differ due to payout timing, promotional adjustments, partial refunds, platform policy changes, or fees not covered by this calculator. Always treat results as estimates, not guarantees."
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* ── HEADER ────────────────────────────────────────────────────────── */}
        <header className="mb-12">
          <div className="flex items-center">
            <div
              className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white mr-6"
              aria-hidden="true"
            >
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-black">Frequently Asked Questions</h1>
              <p className="text-gray-600 mt-2">
                Common questions about TikTok Shop fees, commissions, and how this calculator works
              </p>
            </div>
          </div>
        </header>

        {/* ── INDEPENDENCE NOTICE ───────────────────────────────────────────── */}
        <div
          role="note"
          aria-label="Independence notice"
          className="mb-10 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-start gap-3"
        >
          <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-amber-800 leading-relaxed">
            <span className="font-bold">Independent Tool: </span>
            This FAQ is provided for educational purposes by an independent calculator tool.
            Shopearnings.com is <strong>not affiliated with TikTok or TikTok Shop</strong>.
            All fee information is based on publicly available data and may not reflect the latest
            platform changes — always verify in your TikTok Seller Center.
          </p>
        </div>

        {/* ── FAQ LIST ──────────────────────────────────────────────────────── */}
        <main>
          <section
            aria-label="TikTok Shop fee and profitability questions"
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group bg-white rounded-3xl border border-black/5 overflow-hidden"
                itemScope
                itemType="https://schema.org/Question"
              >
                <summary className="flex justify-between items-center p-7 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <h2 className="text-base font-bold pr-4 text-gray-900" itemProp="name">
                    {faq.q}
                  </h2>
                  <div
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-open:rotate-180 transition-transform flex-shrink-0"
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </summary>
                <div
                  className="px-7 pb-7 text-gray-600 leading-relaxed text-sm border-t border-gray-50 pt-4"
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <div itemProp="text">{faq.a}</div>
                </div>
              </motion.details>
            ))}
          </section>

          {/* ── STILL HAVE QUESTIONS ──────────────────────────────────────────── */}
          <section
            aria-label="Additional information"
            className="mt-14 p-8 bg-gray-50 rounded-[2rem] border border-black/5"
          >
            <h2 className="text-lg font-bold mb-2">Still have questions?</h2>
            <p className="text-gray-500 text-sm">
              Visit TikTok's Seller Center directly for the most up-to-date fee schedules,
              policies, and account-specific information. This tool is an independent
              estimation aid and cannot access your account or provide platform support.
            </p>
          </section>
        </main>

        {/* ── FOOTER NOTE ───────────────────────────────────────────────────── */}
        <footer className="text-xs text-gray-400 mt-8 text-center leading-relaxed">
          <p>
            Fee information is based on publicly available data updated for the 2026 TikTok Shop fee structure.
            Rates are subject to change based on platform updates.
            Always verify current rates in your TikTok Seller Center.
            Shopearnings.com is an independent tool — not affiliated with TikTok or TikTok Shop.
          </p>
        </footer>

      </article>
    </>
  );
}

export const metadata = {
  title: 'TikTok Shop FAQ: Fees, Commissions & Profit Calculator Guide',
  description: 'Common questions about TikTok Shop fees, commissions, FBT costs, and how to estimate profitability. Based on publicly available 2026 fee structures. Independent tool — not affiliated with TikTok.',
  keywords: 'TikTok Shop fees, TikTok commission rates, FBT fees, TikTok seller costs, TikTok profit calculator, TikTok Shop FAQ, TikTok seller guide, e-commerce fees, TikTok Shop 2026 rates',
  openGraph: {
    title: 'TikTok Shop FAQ: Fees, Commissions & Profit Calculator Guide',
    description: 'Common questions about TikTok Shop fees, commissions, and how to estimate profit margins. Independent tool — not affiliated with TikTok.',
    type: 'website',
  }
};
