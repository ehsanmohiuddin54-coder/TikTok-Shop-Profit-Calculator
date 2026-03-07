import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: "How much commission does TikTok Shop take?",
      a: "TikTok Shop commission varies by region: US: 6% (5% for Jewelry & Pre-Owned), UK: 9% (5% for Electronics), EU: 9% (7% for Electronics/Beauty Tech). New sellers get reduced rates for 30-90 days."
    },
    {
      q: "What is FBT fee?",
      a: "FBT (Fulfilled by TikTok) fees include fulfillment and storage costs. Fulfillment fees vary by product size/weight, and storage is charged monthly based on cubic footage. Benefits include faster shipping and TikTok handling customer service."
    },
    {
      q: "How to calculate TikTok Shop profit?",
      a: "TikTok Shop profit = Effective Revenue - (COGS + TikTok Commission + Transaction Fees + Fulfillment Costs + Affiliate Commissions + Ad Spend + Refund Costs). Use our calculator above for accurate calculations with your specific numbers."
    },
    {
      q: "Does TikTok charge transaction fees?",
      a: "TikTok uses a unified referral fee in most regions that includes both marketplace and payment processing fees. In the US, it's 6% combined; UK and EU have separate structures but transaction fees are included in the commission rate."
    },
    {
      q: "What is TikTok Shop new seller discount?",
      a: "US: 3% for first 30 days (must make first sale within 60 days of signup), UK: 1.8% for first 90 days, EU: 4% for first 60 days (effective Jan 8, 2026)."
    },
    {
      q: "What is break-even price in TikTok Shop?",
      a: "Break-even price is the minimum selling price needed to cover all costs including COGS, TikTok fees, fulfillment, marketing, and returns. Our calculator automatically calculates this based on your inputs."
    },
    {
      q: "How do affiliate commissions work on TikTok Shop?",
      a: "Affiliates earn a percentage of each sale they generate. You set the commission rate (typically 5-20%). This cost comes out of your effective revenue and impacts your profit margin."
    },
    {
      q: "What is ROAS and how to calculate it?",
      a: "ROAS (Return on Ad Spend) measures revenue generated per dollar spent on ads. Formula: ROAS = Revenue from Ads / Ad Spend. Our calculator includes a ROAS mode to help optimize your ad campaigns."
    },
    {
      q: "Why is my actual payout different from this calculator?",
      a: "Payout timing, temporary holds, partial refunds, and promotional adjustments may affect actual deposits. This tool provides a high-accuracy estimation based on current fee structures."
    },
    {
      q: "Are the fees accurate?",
      a: "Yes. Default rates are based on region-specific standard TikTok fee structures (e.g., 6% for US, 5% for UK). You can edit them manually if you have negotiated a different rate with TikTok."
    },
    {
      q: "What is Refund Admin Fee?",
      a: "A portion of the commission (usually 10%) retained by TikTok when an order is returned. This covers the administrative cost of processing the refund."
    },
    {
      q: "Should I include ad costs?",
      a: "Absolutely. Ads and affiliate commissions are often the largest expenses for TikTok sellers. Including them gives you a realistic view of your 'True Net Profit'."
    },
    {
      q: "What is a good profit margin?",
      a: "Generally, 20%–35% net margin is considered healthy for scalable e-commerce. If your margin is below 10%, you have very little room for error or rising ad costs."
    }
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
                Everything you need to know about TikTok Shop fees, commissions, and profitability
              </p>
            </div>
          </div>
        </header>

        <main>
          <section 
            aria-label="TikTok Shop fee and profitability questions"
            className="space-y-6"
          >
            {faqs.map((faq, i) => (
              <motion.details 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-3xl border border-black/5 overflow-hidden"
                itemScope
                itemType="https://schema.org/Question"
              >
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <h2 className="text-lg font-bold pr-4" itemProp="name">{faq.q}</h2>
                  <div 
                    className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-open:rotate-180 transition-transform"
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </summary>
                <div 
                  className="px-8 pb-8 text-gray-600 leading-relaxed"
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <div itemProp="text">{faq.a}</div>
                </div>
              </motion.details>
            ))}
          </section>

          <section 
            aria-label="Contact and support information"
            className="mt-16 p-10 bg-gray-50 rounded-[2rem] border border-black/5 flex flex-col md:flex-row items-center justify-between"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">Still have questions?</h2>
              <p className="text-gray-500">
                Visit our support center for more information about TikTok Shop fees and calculations.
              </p>
            </div>

            <a 
              href="https://shopearnings.com/support"
              className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-[#FF0050] transition-colors"
              aria-label="Visit support center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Get Help
            </a>

          </section>
        </main>

        <footer className="text-xs text-gray-400 mt-8 text-center">
          <p>
            *Information updated for 2026 TikTok Shop fee structure. 
            Rates are subject to change based on platform updates. 
            Always verify current rates in your TikTok Seller Center.
          </p>
        </footer>

      </article>
    </>
  );
}

export const metadata = {
  title: 'TikTok Shop FAQ: Fees, Commissions & Profit Calculator Guide',
  description: 'Complete guide to TikTok Shop fees, commissions, FBT costs, and profitability. Updated for 2026 rates. Learn how to calculate your true profit margin.',
  keywords: 'TikTok Shop fees, TikTok commission rates, FBT fees, TikTok seller costs, TikTok profit calculator, TikTok Shop FAQ, TikTok seller guide, e-commerce fees, TikTok Shop 2026 rates',
  openGraph: {
    title: 'TikTok Shop FAQ: Complete Guide to Fees & Profitability',
    description: 'Everything sellers need to know about TikTok Shop fees, commissions, and calculating true profit margins.',
    type: 'website',
  }
};