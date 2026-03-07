import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Info,
  Globe,
  TrendingUp,
  DollarSign,
  PieChart as PieChartIcon,
  Download,
  ChevronDown,
  Settings,
  Package,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Tag,
  Zap,
  BarChart3,
  Receipt,
  Box,
  Truck,
  Megaphone,
  Sparkles,
  Calculator,
  ExternalLink,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { REGIONS, CATEGORIES } from '../constants';
import { CalculatorInputs, CalculationResults, Region } from '../types';
import { calculateProfit } from '../utils';
import { jsPDF } from 'jspdf';

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    region: 'US',
    category: 'fashion',
    useOfficialRates: true,
    customCommissionRate: 6,
    customTransactionFeeRate: 2.9,
    customRefundAdminFeeRate: 10,
    sellingPrice: 29.99,
    cogs: 8.5,
    sellerDiscountPercent: 0,
    expectedReturnRate: 5,
    fulfillmentType: 'self',
    shippingCost: 4.99,
    fbtFulfillmentFee: 3.5,
    fbtStorageCost: 0.5,
    affiliateCommissionPercent: 10,
    adCostPerUnit: 2.0,
    voucherContributionPercent: 0,
    monthlySalesVolume: 500,
    isNewSeller: false,
    daysSinceFirstSale: 0,
    platformDiscount: 0,
    vatRegistered: false,
    vatRate: 20,
    lostCogsOnReturn: true,
    lostShippingOnReturn: true,
    conversionRate: 2.5,
    averageOrderValue: 45,
    cpc: 1.2,
    enableAdsMode: false,
    targetROAS: 3.5,
    scenarioMode: 'custom' as 'custom' | 'worst' | 'best' | 'conservative',
  });

  const [results, setResults] = useState<CalculationResults>(calculateProfit(inputs));
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const existing = document.getElementById('calculator-structured-data');
    if (existing) document.head.removeChild(existing);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'calculator-structured-data';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://shopearnings.com/calculator',
          url: 'https://shopearnings.com/calculator',
          name: 'Free TikTok Shop Profit Calculator 2026 | US, UK & EU Fee Tool',
          description:
            'Calculate TikTok Shop profit after all fees — commission, FBT fulfillment, affiliate commissions, and ad spend. Free tool for US, UK & EU sellers with 2026 fee structures.',
          inLanguage: 'en-US',
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home',               item: 'https://shopearnings.com/' },
              { '@type': 'ListItem', position: 2, name: 'Profit Calculator',  item: 'https://shopearnings.com/calculator' },
            ],
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How much commission does TikTok Shop take?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'TikTok Shop commission varies by region: US 6% (5% for Jewelry & Pre-Owned), UK 9% (5% for Electronics), EU 9% (7% for Electronics/Beauty Tech). New sellers get reduced rates for 30–90 days.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is the FBT fee on TikTok Shop?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'FBT (Fulfilled by TikTok) fees include fulfillment and storage costs. Fulfillment fees start at $3.50 for small standard items. Storage is charged monthly based on cubic footage.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do I calculate TikTok Shop profit?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'TikTok Shop profit = Effective Revenue − (COGS + TikTok Commission + Fulfillment Costs + Affiliate Commissions + Ad Spend + Refund Costs). Use this free calculator for an accurate breakdown.',
              },
            },
            {
              '@type': 'Question',
              name: 'Does TikTok Shop charge transaction fees?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'TikTok uses a unified referral fee in most regions that includes both marketplace and payment processing fees. In the US it is 6% combined; UK and EU have separate structures.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is the TikTok Shop new seller discount?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'US: 3% for first 30 days, UK: 1.8% for first 90 days, EU: 4% for first 60 days. You must make your first sale within the signup period to qualify.',
              },
            },
          ],
        },
      ],
    });
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('calculator-structured-data');
      if (el) document.head.removeChild(el);
    };
  }, []);

  useEffect(() => {
    setResults(calculateProfit(inputs));
  }, [inputs]);

  // ── Scenario presets ─────────────────────────────────────────────────────────
  const applyScenario = (scenario: 'worst' | 'best' | 'conservative') => {
    setInputs((prev) => {
      const basePrice = prev.sellingPrice;
      switch (scenario) {
        case 'worst':       return { ...prev, expectedReturnRate: 15, affiliateCommissionPercent: 20, adCostPerUnit: basePrice * 0.3, conversionRate: 1.5, scenarioMode: 'worst' };
        case 'best':        return { ...prev, expectedReturnRate: 2,  affiliateCommissionPercent: 5,  adCostPerUnit: basePrice * 0.1, conversionRate: 4,   scenarioMode: 'best' };
        case 'conservative':return { ...prev, expectedReturnRate: 8,  affiliateCommissionPercent: 12, adCostPerUnit: basePrice * 0.2, conversionRate: 2.2, scenarioMode: 'conservative' };
        default:            return prev;
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    setInputs((prev) => ({ ...prev, [name]: val }));
  };

  const handleToggle = (name: keyof CalculatorInputs) => {
    setInputs((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleRegionChange = (region: Region) => {
    const rd = REGIONS[region];
    setInputs((prev) => ({
      ...prev,
      region,
      customCommissionRate: rd.commissionRate,
      customTransactionFeeRate: rd.transactionFeeRate,
      customRefundAdminFeeRate: rd.refundAdminFeeRate,
      isNewSeller: false,
      daysSinceFirstSale: 0,
      vatRegistered: region === 'UK' || region === 'EU' ? prev.vatRegistered : false,
    }));
  };

  // ── PDF Export ─────────────────────────────────────────────────────────────
  const exportPDF = () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const regionData = REGIONS[inputs.region];
      const sym = regionData.symbol;
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const W = pdf.internal.pageSize.getWidth();
      const H = pdf.internal.pageSize.getHeight();
      const margin = 16;
      const contentW = W - margin * 2;
      let y = 0;

      const hex2rgb = (hex: string): [number, number, number] => [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
      const setFill = (hex: string) => { const [r,g,b] = hex2rgb(hex); pdf.setFillColor(r,g,b); };
      const setDraw = (hex: string) => { const [r,g,b] = hex2rgb(hex); pdf.setDrawColor(r,g,b); };
      const setTxt  = (hex: string) => { const [r,g,b] = hex2rgb(hex); pdf.setTextColor(r,g,b); };
      const bold    = (sz: number)  => { pdf.setFont('helvetica','bold');   pdf.setFontSize(sz); };
      const normal  = (sz: number)  => { pdf.setFont('helvetica','normal'); pdf.setFontSize(sz); };
      const row     = (label: string, value: string, yPos: number, valueColor = '#111111') => {
        normal(9); setTxt('#555555'); pdf.text(label, margin, yPos);
        bold(9);   setTxt(valueColor); pdf.text(value, W - margin, yPos, { align: 'right' });
      };
      const sectionHeader = (title: string, yPos: number): number => {
        setFill('#F3F4F6'); pdf.rect(margin, yPos, contentW, 8, 'F');
        bold(9); setTxt('#111111'); pdf.text(title.toUpperCase(), margin + 3, yPos + 5.5);
        return yPos + 12;
      };
      const newPageIfNeeded = (needed: number) => {
        if (y + needed > H - 20) { pdf.addPage(); y = margin; }
      };

      setFill('#FF0050'); pdf.rect(0, 0, W, 28, 'F');
      bold(16); setTxt('#FFFFFF'); pdf.text('TikTok Shop Profit Report', margin, 12);
      normal(8); setTxt('#FFB3C7'); pdf.text(`Region: ${inputs.region}  |  Category: ${inputs.category}  |  Generated: ${dateStr}`, margin, 19);
      bold(8);   setTxt('#FFFFFF'); pdf.text('shopearnings.com', W - margin, 19, { align: 'right' });
      y = 34;

      const boxW = (contentW - 4) / 2;
      const kpis = [
        { label: 'Net Profit / Unit',  value: `${sym}${results.netProfit.toFixed(2)}`,   color: results.netProfit >= 0 ? '#10B981' : '#EF4444' },
        { label: 'Profit Margin',      value: `${results.profitMargin.toFixed(1)}%`,      color: results.netProfit >= 0 ? '#10B981' : '#EF4444' },
        { label: 'Break-Even Price',   value: `${sym}${results.breakEvenPrice.toFixed(2)}`, color: '#1D4ED8' },
        { label: 'Monthly Profit',     value: `${sym}${results.monthlyProfit.toLocaleString(undefined,{maximumFractionDigits:0})}`, color: '#7C3AED' },
      ];
      kpis.forEach((kpi, i) => {
        const bx = margin + (i % 2) * (boxW + 4);
        const by = y + Math.floor(i / 2) * 22;
        setFill('#F9FAFB'); setDraw('#E5E7EB');
        pdf.setLineWidth(0.3); pdf.roundedRect(bx, by, boxW, 18, 2, 2, 'FD');
        normal(7); setTxt('#6B7280'); pdf.text(kpi.label, bx + 4, by + 6);
        bold(13); setTxt(kpi.color); pdf.text(kpi.value, bx + 4, by + 14);
      });
      y += 50;

      y = sectionHeader('Input Summary', y);
      const inputRows: [string,string][] = [
        ['Selling Price',          `${sym}${inputs.sellingPrice.toFixed(2)}`],
        ['Cost of Goods (COGS)',   `${sym}${inputs.cogs.toFixed(2)}`],
        ['Seller Discount',        `${inputs.sellerDiscountPercent}%`],
        ['Platform Discount',      `${sym}${(inputs.platformDiscount || 0).toFixed(2)}`],
        ['Fulfillment Type',       inputs.fulfillmentType === 'self' ? 'Self-Ship' : 'Fulfilled by TikTok (FBT)'],
        ['Shipping / Fulfil. Cost',inputs.fulfillmentType === 'self' ? `${sym}${inputs.shippingCost.toFixed(2)}` : `${sym}${(inputs.fbtFulfillmentFee + inputs.fbtStorageCost).toFixed(2)}`],
        ['Return Rate',            `${inputs.expectedReturnRate}%`],
        ['Affiliate Commission',   `${inputs.affiliateCommissionPercent}%`],
        ['Ad Spend / Unit',        `${sym}${inputs.adCostPerUnit.toFixed(2)}`],
        ['Voucher Contribution',   `${inputs.voucherContributionPercent}%`],
        ['Monthly Sales Volume',   `${inputs.monthlySalesVolume} units`],
        ['New Seller Discount',    inputs.isNewSeller ? `Yes (${inputs.daysSinceFirstSale} days in)` : 'No'],
        ['VAT Registered',         inputs.vatRegistered ? `Yes (${inputs.vatRate}%)` : 'No'],
      ];
      inputRows.forEach(([lbl, val], idx) => {
        newPageIfNeeded(7);
        if (idx % 2 === 0) { setFill('#FAFAFA'); pdf.rect(margin, y - 1, contentW, 6.5, 'F'); }
        row(lbl, val, y + 4); y += 6.5;
      });
      y += 4;

      newPageIfNeeded(12);
      y = sectionHeader('Detailed Cost Breakdown', y);
      const fulfillCost = inputs.fulfillmentType === 'self' ? inputs.shippingCost : (inputs.fbtFulfillmentFee + inputs.fbtStorageCost);
      const breakdownRows: [string,string,string][] = [
        ['Selling Price',       `${sym}${inputs.sellingPrice.toFixed(2)}`,                                           '#111111'],
        ['- Seller Discount',   `-${sym}${(inputs.sellingPrice * inputs.sellerDiscountPercent / 100).toFixed(2)}`,  '#EF4444'],
        ['- Platform Discount', `-${sym}${(inputs.platformDiscount || 0).toFixed(2)}`,                              '#EF4444'],
        ['= Effective Revenue', `${sym}${results.effectiveRevenue.toFixed(2)}`,                                      '#1D4ED8'],
        ['- COGS',              `-${sym}${inputs.cogs.toFixed(2)}`,                                                  '#EF4444'],
        ['- TikTok Commission', `-${sym}${results.commission.toFixed(2)}`,                                           '#EF4444'],
        ['- Transaction Fee',   `-${sym}${results.transactionFee.toFixed(2)}`,                                       '#EF4444'],
        ['- Fulfillment Cost',  `-${sym}${fulfillCost.toFixed(2)}`,                                                  '#EF4444'],
        ['- Affiliate Comm.',   `-${sym}${results.affiliateCommission.toFixed(2)}`,                                  '#EF4444'],
        ['- Ad Spend',          `-${sym}${inputs.adCostPerUnit.toFixed(2)}`,                                         '#EF4444'],
        ['- Refund Cost',       `-${sym}${results.refundCost.toFixed(2)}`,                                           '#EF4444'],
      ];
      breakdownRows.forEach(([lbl, val, col], idx) => {
        newPageIfNeeded(7);
        if (idx % 2 === 0) { setFill('#FAFAFA'); pdf.rect(margin, y - 1, contentW, 6.5, 'F'); }
        normal(9); setTxt('#374151'); pdf.text(lbl, margin + 3, y + 4);
        bold(9); setTxt(col); pdf.text(val, W - margin, y + 4, { align: 'right' });
        y += 6.5;
      });
      newPageIfNeeded(10);
      setFill(results.netProfit >= 0 ? '#D1FAE5' : '#FEE2E2');
      pdf.rect(margin, y, contentW, 9, 'F');
      bold(10); setTxt('#111111'); pdf.text('= Net Profit / Unit', margin + 3, y + 6);
      setTxt(results.netProfit >= 0 ? '#065F46' : '#991B1B');
      pdf.text(`${sym}${results.netProfit.toFixed(2)}`, W - margin, y + 6, { align: 'right' });
      y += 14;

      newPageIfNeeded(45);
      y = sectionHeader('Monthly Projection', y);
      const monthlyRows: [string,string,string][] = [
        ['Total Revenue', `${sym}${results.monthlyRevenue.toLocaleString(undefined,{maximumFractionDigits:0})}`,   '#111111'],
        ['Total Fees',    `-${sym}${results.monthlyFees.toLocaleString(undefined,{maximumFractionDigits:0})}`,     '#EF4444'],
        ['Net Profit',    `${sym}${results.monthlyProfit.toLocaleString(undefined,{maximumFractionDigits:0})}`,    '#10B981'],
        ['Annual Profit', `${sym}${(results.monthlyProfit * 12).toLocaleString(undefined,{maximumFractionDigits:0})}`, '#7C3AED'],
      ];
      monthlyRows.forEach(([lbl, val, col], idx) => {
        newPageIfNeeded(7);
        if (idx % 2 === 0) { setFill('#FAFAFA'); pdf.rect(margin, y - 1, contentW, 6.5, 'F'); }
        row(lbl, val, y + 4, col); y += 6.5;
      });
      y += 6;

      if (inputs.enableAdsMode) {
        const cpaVal  = (inputs.cpc * 100) / inputs.conversionRate;
        const roasVal = inputs.adCostPerUnit > 0 ? results.effectiveRevenue / inputs.adCostPerUnit : 0;
        newPageIfNeeded(40);
        y = sectionHeader('ROAS & Ads Analysis', y);
        const roasRows: [string,string,string][] = [
          ['Cost Per Click (CPC)', `${sym}${inputs.cpc.toFixed(2)}`,                '#111111'],
          ['Conversion Rate',      `${inputs.conversionRate.toFixed(1)}%`,          '#111111'],
          ['Avg Order Value',      `${sym}${inputs.averageOrderValue.toFixed(2)}`,  '#111111'],
          ['Calculated CPA',       `${sym}${cpaVal.toFixed(2)}`,                    '#D97706'],
          ['Current ROAS',         `${roasVal.toFixed(2)}x`,                        roasVal >= inputs.targetROAS ? '#10B981' : '#EF4444'],
          ['Target ROAS',          `${inputs.targetROAS}x`,                         '#1D4ED8'],
          ['ROAS Gap',             `${(roasVal - inputs.targetROAS).toFixed(2)}x`,  roasVal >= inputs.targetROAS ? '#10B981' : '#EF4444'],
        ];
        roasRows.forEach(([lbl, val, col], idx) => {
          newPageIfNeeded(7);
          if (idx % 2 === 0) { setFill('#FAFAFA'); pdf.rect(margin, y - 1, contentW, 6.5, 'F'); }
          row(lbl, val, y + 4, col); y += 6.5;
        });
        y += 6;
      }

      newPageIfNeeded(55);
      y = sectionHeader(`${inputs.region} Fee Reference`, y);
      const feeRef: [string,string][] = ({
        US: [['Standard Commission','6.0%'],['Jewelry / Pre-Owned','5.0%'],['New Seller (30 days)','3.0%'],['Refund Admin Fee','20% of commission (max $5)'],['Transaction Fee','Included in unified rate']],
        UK: [['Standard Commission','9.0%'],['Electronics','5.0%'],['New Seller (90 days)','1.8%'],['Transaction Fee','Included in commission']],
        EU: [['Standard Commission','9.0% (eff. Jan 8 2026)'],['Electronics/Beauty Tech','7.0%'],['New Seller (60 days)','4.0%'],['Transaction Fee','Included in commission']],
      } as Record<string,[string,string][]>)[inputs.region];
      feeRef.forEach(([lbl, val], idx) => {
        newPageIfNeeded(7);
        if (idx % 2 === 0) { setFill('#FAFAFA'); pdf.rect(margin, y - 1, contentW, 6.5, 'F'); }
        row(lbl, val, y + 4); y += 6.5;
      });
      y += 6;

      newPageIfNeeded(22);
      setFill('#F9FAFB'); pdf.rect(margin, y, contentW, 18, 'F');
      normal(7); setTxt('#6B7280');
      const lines = pdf.splitTextToSize('Disclaimer: This report is for estimation purposes only. Actual TikTok Shop payouts may vary based on returns, adjustments, and platform policy changes. Rates shown reflect 2026 fee structures.', contentW - 6);
      pdf.text(lines, margin + 3, y + 5);
      y += 22;

      const totalPages = (pdf as any).internal.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        pdf.setPage(p);
        setFill('#FF0050'); pdf.rect(0, H - 10, W, 10, 'F');
        normal(7); setTxt('#FFFFFF');
        pdf.text('TikTok Shop Profit Calculator - shopearnings.com', margin, H - 3.5);
        pdf.text(`Page ${p} of ${totalPages}`, W - margin, H - 3.5, { align: 'right' });
      }
      pdf.save(`TikTok-Profit-Report-${inputs.region}-${now.toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF generation failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const cpa  = inputs.enableAdsMode ? (inputs.cpc * 100) / inputs.conversionRate : 0;
  const roas = inputs.enableAdsMode && inputs.adCostPerUnit > 0 ? results.effectiveRevenue / inputs.adCostPerUnit : 0;

  const chartData = [
    { name: 'COGS',        value: inputs.cogs,                                                                                                               color: '#1A1A1A' },
    { name: 'TikTok Fees', value: results.commission + results.transactionFee + results.refundCost,                                                          color: '#FF0050' },
    { name: 'Fulfillment', value: inputs.fulfillmentType === 'self' ? inputs.shippingCost : (inputs.fbtFulfillmentFee + inputs.fbtStorageCost),              color: '#00F2EA' },
    { name: 'Marketing',   value: results.affiliateCommission + inputs.adCostPerUnit + (results.effectiveRevenue * inputs.voucherContributionPercent / 100), color: '#FFD700' },
    { name: 'Net Profit',  value: Math.max(0, results.netProfit),                                                                                            color: '#10B981' },
  ];

  const regionData = REGIONS[inputs.region];

  const getNewSellerTooltip = () => {
    switch (inputs.region) {
      case 'US': return '3% commission for first 30 days (must make first sale within 60 days of signup)';
      case 'UK': return '1.8% commission for first 90 days';
      case 'EU': return '4% commission for first 60 days (effective Jan 8, 2026)';
      default:   return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── PAGE HEADER ───────────────────────────────────────────────────── */}
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black mb-2">
              TikTok Shop Profit Calculator{' '}
              <span className="text-sm font-normal text-gray-500 ml-2">Updated for 2026</span>
            </h1>
            <p className="text-gray-600">
              Free &amp; Accurate · US, UK &amp; EU Commission Rates · New Seller Discounts · FBT Fees · ROAS Calculator
            </p>
          </div>
          <div
            className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm flex-shrink-0"
            aria-label="Page last updated"
          >
            <Calendar className="inline w-4 h-4 mr-2 text-[#FF0050]" aria-hidden="true" />
            Last Updated: March 2026
          </div>
        </header>

        {/* ── CALCULATOR LAYOUT ─────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT COLUMN: INPUTS ───────────────────────────────────────────── */}
          <div className="w-full lg:w-[60%] space-y-8">

            {/* Scenario Analysis */}
            <section aria-labelledby="scenario-heading" className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm">
              <h2 id="scenario-heading" className="text-lg font-bold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" aria-hidden="true" />
                Quick Scenario Analysis
              </h2>
              <div className="grid grid-cols-3 gap-4" role="group" aria-label="Profit scenario presets">
                <button onClick={() => applyScenario('worst')}
                  aria-label="Apply worst-case scenario: 15% returns, 20% affiliate commission"
                  className="p-4 rounded-xl bg-red-50 text-red-700 font-bold hover:bg-red-100 transition-all">
                  <ArrowDownRight className="w-5 h-5 mx-auto mb-1" aria-hidden="true" />
                  Worst Case
                </button>
                <button onClick={() => applyScenario('conservative')}
                  aria-label="Apply conservative scenario: 8% returns, 12% affiliate commission"
                  className="p-4 rounded-xl bg-yellow-50 text-yellow-700 font-bold hover:bg-yellow-100 transition-all">
                  <BarChart3 className="w-5 h-5 mx-auto mb-1" aria-hidden="true" />
                  Conservative
                </button>
                <button onClick={() => applyScenario('best')}
                  aria-label="Apply best-case scenario: 2% returns, 5% affiliate commission"
                  className="p-4 rounded-xl bg-green-50 text-green-700 font-bold hover:bg-green-100 transition-all">
                  <ArrowUpRight className="w-5 h-5 mx-auto mb-1" aria-hidden="true" />
                  Best Case
                </button>
              </div>
            </section>

            {/* Step 1: Marketplace Setup */}
            <section aria-labelledby="marketplace-heading" className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <h2 id="marketplace-heading" className="text-xl font-bold mb-6 flex items-center">
                <div aria-hidden="true" className="w-10 h-10 rounded-xl bg-black flex items-center justify-center mr-4">
                  <Globe className="text-white w-5 h-5" />
                </div>
                Step 1: Marketplace Setup
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="calc-region" className="block text-sm font-bold text-gray-700 mb-2">Region</label>
                  <div className="relative">
                    <select id="calc-region" name="region" value={inputs.region}
                      onChange={(e) => handleRegionChange(e.target.value as Region)}
                      className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-medium">
                      <option value="US">United States (USA)</option>
                      <option value="UK">United Kingdom (UK)</option>
                      <option value="EU">European Union (EU5)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <label htmlFor="calc-category" className="block text-sm font-bold text-gray-700 mb-2">Product Category</label>
                  <div className="relative">
                    <select id="calc-category" name="category" value={inputs.category} onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-medium">
                      {CATEGORIES.filter((c) => {
                        if (inputs.region === 'US') return ['fashion','jewelry','pre-owned'].includes(c.id);
                        if (inputs.region === 'UK') return ['fashion','electronics','beauty','home'].includes(c.id);
                        if (inputs.region === 'EU') return ['fashion','electronics','beauty-tech'].includes(c.id);
                        return true;
                      }).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* New Seller Toggle */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-blue-600" aria-hidden="true" />
                    <span id="new-seller-label" className="text-sm font-bold text-blue-900">New Seller Discount</span>
                    <div className="relative group">
                      <Info className="w-4 h-4 text-blue-400 cursor-help" aria-label="New seller discount info" />
                      <div role="tooltip" className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        {getNewSellerTooltip()}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleToggle('isNewSeller')}
                    role="switch" aria-checked={inputs.isNewSeller} aria-labelledby="new-seller-label"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${inputs.isNewSeller ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${inputs.isNewSeller ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                {inputs.isNewSeller && (
                  <div className="mt-4">
                    <label htmlFor="days-since-sale" className="block text-xs font-medium text-blue-700 mb-1">Days Since First Sale</label>
                    <input id="days-since-sale" type="number" name="daysSinceFirstSale" value={inputs.daysSinceFirstSale}
                      onChange={handleInputChange} min="0"
                      className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                )}
              </div>

              {/* VAT Toggle — UK/EU only */}
              {(inputs.region === 'UK' || inputs.region === 'EU') && (
                <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Receipt className="w-4 h-4 text-purple-600" aria-hidden="true" />
                      <span id="vat-label" className="text-sm font-bold text-purple-900">VAT Registered</span>
                      <div className="relative group">
                        <Info className="w-4 h-4 text-purple-400 cursor-help" aria-label="VAT registration info" />
                        <div role="tooltip" className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          VAT is calculated on the final customer price
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleToggle('vatRegistered')}
                      role="switch" aria-checked={inputs.vatRegistered} aria-labelledby="vat-label"
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${inputs.vatRegistered ? 'bg-purple-600' : 'bg-gray-200'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${inputs.vatRegistered ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  {inputs.vatRegistered && (
                    <div className="mt-4">
                      <label htmlFor="vat-rate" className="block text-xs font-medium text-purple-700 mb-1">VAT Rate (%)</label>
                      <input id="vat-rate" type="number" name="vatRate" value={inputs.vatRate} onChange={handleInputChange}
                        min="0" max="25" step="0.1"
                        className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                    </div>
                  )}
                </div>
              )}

              {/* Fee Configuration */}
              <div className="mt-8 pt-6 border-t border-black/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Settings className="w-4 h-4 text-gray-400 mr-2" aria-hidden="true" />
                    <span id="fee-config-label" className="text-sm font-bold text-gray-700">Use Official 2026 TikTok Fee Rates</span>
                  </div>
                  <button onClick={() => handleToggle('useOfficialRates')}
                    role="switch" aria-checked={inputs.useOfficialRates} aria-labelledby="fee-config-label"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${inputs.useOfficialRates ? 'bg-black' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${inputs.useOfficialRates ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="commission-rate" className="block text-[10px] uppercase tracking-wider font-black text-gray-400 mb-1">Commission %</label>
                    <input id="commission-rate" type="number" name="customCommissionRate"
                      value={inputs.useOfficialRates ? (inputs.isNewSeller && inputs.daysSinceFirstSale <= regionData.newSellerPeriod ? regionData.newSellerRate : regionData.commissionRate) : inputs.customCommissionRate}
                      onChange={handleInputChange} disabled={inputs.useOfficialRates}
                      aria-label="TikTok Shop commission rate"
                      className="w-full bg-gray-50 border border-black/5 rounded-lg px-3 py-2 focus:outline-none disabled:opacity-50 font-mono text-sm" />
                  </div>
                  <div>
                    <label htmlFor="transaction-rate" className="block text-[10px] uppercase tracking-wider font-black text-gray-400 mb-1">Transaction %</label>
                    <input id="transaction-rate" type="number" name="customTransactionFeeRate"
                      value={inputs.useOfficialRates ? regionData.transactionFeeRate : inputs.customTransactionFeeRate}
                      onChange={handleInputChange} disabled={inputs.useOfficialRates}
                      aria-label="Transaction fee rate"
                      className="w-full bg-gray-50 border border-black/5 rounded-lg px-3 py-2 focus:outline-none disabled:opacity-50 font-mono text-sm" />
                  </div>
                  <div>
                    <label htmlFor="refund-admin-rate" className="block text-[10px] uppercase tracking-wider font-black text-gray-400 mb-1">Refund Admin %</label>
                    <input id="refund-admin-rate" type="number" name="customRefundAdminFeeRate"
                      value={inputs.useOfficialRates ? regionData.refundAdminFeeRate : inputs.customRefundAdminFeeRate}
                      onChange={handleInputChange} disabled={inputs.useOfficialRates}
                      aria-label="TikTok Shop refund admin fee rate"
                      className="w-full bg-gray-50 border border-black/5 rounded-lg px-3 py-2 focus:outline-none disabled:opacity-50 font-mono text-sm" />
                  </div>
                </div>
              </div>
            </section>

            {/* Step 2: Product Financials */}
            <section aria-labelledby="financials-heading" className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <h2 id="financials-heading" className="text-xl font-bold mb-6 flex items-center">
                <div aria-hidden="true" className="w-10 h-10 rounded-xl bg-black flex items-center justify-center mr-4">
                  <DollarSign className="text-white w-5 h-5" />
                </div>
                Step 2: Product Financials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="selling-price" className="block text-sm font-bold text-gray-700 mb-2">Selling Price ({regionData.symbol})</label>
                  <div className="relative">
                    <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{regionData.symbol}</span>
                    <input id="selling-price" type="number" name="sellingPrice" value={inputs.sellingPrice} onChange={handleInputChange}
                      aria-label="Product selling price"
                      className="w-full bg-gray-50 border border-black/5 rounded-xl pl-8 pr-4 py-3 focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-mono" />
                  </div>
                </div>
                <div>
                  <label htmlFor="cogs" className="block text-sm font-bold text-gray-700 mb-2">Cost of Goods Sold (COGS)</label>
                  <div className="relative">
                    <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{regionData.symbol}</span>
                    <input id="cogs" type="number" name="cogs" value={inputs.cogs} onChange={handleInputChange}
                      aria-label="Cost of goods sold per unit"
                      className="w-full bg-gray-50 border border-black/5 rounded-xl pl-8 pr-4 py-3 focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-mono" />
                  </div>
                </div>
                <div>
                  <label htmlFor="seller-discount" className="block text-sm font-bold text-gray-700 mb-2">Seller Discount %</label>
                  <div className="relative">
                    <input id="seller-discount" type="number" name="sellerDiscountPercent" value={inputs.sellerDiscountPercent} onChange={handleInputChange}
                      aria-label="Seller-funded discount percentage"
                      className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-mono" />
                    <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="platform-discount" className="block text-sm font-bold text-gray-700 mb-2">Platform Discount</label>
                  <div className="relative">
                    <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{regionData.symbol}</span>
                    <input id="platform-discount" type="number" name="platformDiscount" value={inputs.platformDiscount || 0} onChange={handleInputChange}
                      aria-label="TikTok platform-funded discount amount"
                      className="w-full bg-gray-50 border border-black/5 rounded-xl pl-8 pr-4 py-3 focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-mono" />
                  </div>
                </div>
              </div>
            </section>

            {/* Step 3: Fulfillment & Returns */}
            <section aria-labelledby="fulfillment-heading" className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <h2 id="fulfillment-heading" className="text-xl font-bold mb-6 flex items-center">
                <div aria-hidden="true" className="w-10 h-10 rounded-xl bg-black flex items-center justify-center mr-4">
                  <Package className="text-white w-5 h-5" />
                </div>
                Step 3: Fulfillment &amp; Returns
              </h2>

              <div className="flex gap-4 mb-6" role="group" aria-label="Fulfillment method">
                <button onClick={() => setInputs((prev) => ({ ...prev, fulfillmentType: 'self' }))}
                  aria-pressed={inputs.fulfillmentType === 'self'}
                  className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all ${inputs.fulfillmentType === 'self' ? 'border-black bg-black text-white' : 'border-black/5 bg-gray-50 text-gray-500 hover:border-black/20'}`}>
                  <Truck className="inline w-4 h-4 mr-2" aria-hidden="true" />
                  Self-Ship
                </button>
                <button onClick={() => setInputs((prev) => ({ ...prev, fulfillmentType: 'fbt' }))}
                  aria-pressed={inputs.fulfillmentType === 'fbt'}
                  className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all ${inputs.fulfillmentType === 'fbt' ? 'border-black bg-black text-white' : 'border-black/5 bg-gray-50 text-gray-500 hover:border-black/20'}`}>
                  <Box className="inline w-4 h-4 mr-2" aria-hidden="true" />
                  Fulfilled by TikTok (FBT)
                </button>
              </div>

              {inputs.fulfillmentType === 'self' ? (
                <div className="mb-6">
                  <label htmlFor="shipping-cost" className="block text-sm font-bold text-gray-700 mb-2">Shipping Cost per Unit</label>
                  <div className="relative">
                    <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{regionData.symbol}</span>
                    <input id="shipping-cost" type="number" name="shippingCost" value={inputs.shippingCost} onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-black/5 rounded-xl pl-8 pr-4 py-3 focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-mono" />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="fbt-fulfillment-fee" className="block text-sm font-bold text-gray-700 mb-2">FBT Fulfillment Fee</label>
                    <div className="relative">
                      <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{regionData.symbol}</span>
                      <input id="fbt-fulfillment-fee" type="number" name="fbtFulfillmentFee" value={inputs.fbtFulfillmentFee} onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-black/5 rounded-xl pl-8 pr-4 py-3 focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-mono" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="fbt-storage-cost" className="block text-sm font-bold text-gray-700 mb-2">Est. Monthly Storage Cost</label>
                    <div className="relative">
                      <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{regionData.symbol}</span>
                      <input id="fbt-storage-cost" type="number" name="fbtStorageCost" value={inputs.fbtStorageCost} onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-black/5 rounded-xl pl-8 pr-4 py-3 focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-mono" />
                    </div>
                  </div>
                </div>
              )}

              <fieldset className="mt-6 pt-6 border-t border-black/5">
                <legend className="font-bold mb-4 flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                  Return Rate Settings
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="return-rate" className="block text-sm font-bold text-gray-700 mb-2">Expected Return Rate %</label>
                    <div className="relative">
                      <input id="return-rate" type="number" name="expectedReturnRate" value={inputs.expectedReturnRate} onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-mono" />
                      <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" checked={inputs.lostCogsOnReturn}
                        onChange={(e) => setInputs((prev) => ({ ...prev, lostCogsOnReturn: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-[#FF0050] focus:ring-[#FF0050]" />
                      <span className="text-sm">Lost COGS on Return</span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" checked={inputs.lostShippingOnReturn}
                        onChange={(e) => setInputs((prev) => ({ ...prev, lostShippingOnReturn: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-[#FF0050] focus:ring-[#FF0050]" />
                      <span className="text-sm">Lost Shipping on Return</span>
                    </label>
                  </div>
                </div>
              </fieldset>
            </section>

            {/* Step 4: Marketing & Ads */}
            <section aria-labelledby="marketing-heading" className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <h2 id="marketing-heading" className="text-xl font-bold mb-6 flex items-center">
                <div aria-hidden="true" className="w-10 h-10 rounded-xl bg-black flex items-center justify-center mr-4">
                  <Megaphone className="text-white w-5 h-5" />
                </div>
                Step 4: Marketing &amp; Ads
              </h2>

              <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-600" aria-hidden="true" />
                    <span id="roas-mode-label" className="text-sm font-bold text-purple-900">
                      Advanced ROAS &amp; TikTok Ads Calculator Mode
                    </span>
                  </div>
                  <button onClick={() => handleToggle('enableAdsMode')}
                    role="switch" aria-checked={inputs.enableAdsMode} aria-labelledby="roas-mode-label"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${inputs.enableAdsMode ? 'bg-purple-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${inputs.enableAdsMode ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                {inputs.enableAdsMode && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="conversion-rate" className="block text-xs font-medium text-purple-700 mb-1">Conversion Rate %</label>
                      <input id="conversion-rate" type="number" name="conversionRate" value={inputs.conversionRate}
                        onChange={handleInputChange} step="0.1"
                        className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label htmlFor="avg-order-value" className="block text-xs font-medium text-purple-700 mb-1">Average Order Value</label>
                      <div className="relative">
                        <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{regionData.symbol}</span>
                        <input id="avg-order-value" type="number" name="averageOrderValue" value={inputs.averageOrderValue} onChange={handleInputChange}
                          className="w-full bg-white border border-purple-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cpc" className="block text-xs font-medium text-purple-700 mb-1">Cost Per Click — CPC ({regionData.symbol})</label>
                      <div className="relative">
                        <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{regionData.symbol}</span>
                        <input id="cpc" type="number" name="cpc" value={inputs.cpc} onChange={handleInputChange} step="0.01"
                          className="w-full bg-white border border-purple-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="affiliate-commission" className="block text-sm font-bold text-gray-700 mb-2">Affiliate Commission %</label>
                  <div className="relative">
                    <input id="affiliate-commission" type="number" name="affiliateCommissionPercent" value={inputs.affiliateCommissionPercent} onChange={handleInputChange}
                      aria-label="TikTok affiliate creator commission percentage"
                      className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-mono" />
                    <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="ad-spend" className="block text-sm font-bold text-gray-700 mb-2">Ad Spend per Unit</label>
                  <div className="relative">
                    <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{regionData.symbol}</span>
                    <input id="ad-spend" type="number" name="adCostPerUnit" value={inputs.adCostPerUnit} onChange={handleInputChange}
                      aria-label="TikTok ad spend allocated per unit sold"
                      className="w-full bg-gray-50 border border-black/5 rounded-xl pl-8 pr-4 py-3 focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-mono" />
                  </div>
                </div>
                <div>
                  <label htmlFor="voucher-contribution" className="block text-sm font-bold text-gray-700 mb-2">Voucher Contribution %</label>
                  <div className="relative">
                    <input id="voucher-contribution" type="number" name="voucherContributionPercent" value={inputs.voucherContributionPercent} onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-mono" />
                    <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="monthly-sales-volume" className="block text-sm font-bold text-gray-700 mb-2">Monthly Sales Volume (units)</label>
                  <div className="relative">
                    <input id="monthly-sales-volume" type="number" name="monthlySalesVolume" value={inputs.monthlySalesVolume} onChange={handleInputChange}
                      aria-label="Expected monthly unit sales volume"
                      className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF0050] focus:outline-none font-mono" />
                    <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">units</span>
                  </div>
                </div>
              </div>

              {inputs.enableAdsMode && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl"
                  aria-live="polite" aria-label="Live ROAS calculation results">
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-xs opacity-80">Calculated CPA</dt>
                      <dd className="text-2xl font-bold">{regionData.symbol}{cpa.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs opacity-80">Current ROAS</dt>
                      <dd className="text-2xl font-bold">{roas.toFixed(2)}x</dd>
                    </div>
                    <div>
                      <dt className="text-xs opacity-80">Target ROAS</dt>
                      <dd>
                        <label htmlFor="target-roas" className="sr-only">Target ROAS</label>
                        <input id="target-roas" type="number" name="targetROAS" value={inputs.targetROAS}
                          onChange={handleInputChange} step="0.1"
                          className="w-24 bg-white/20 border border-white/30 rounded-lg px-2 py-1 text-white placeholder-white/50" />
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs opacity-80">ROAS Gap</dt>
                      <dd className={`text-xl font-bold ${roas >= inputs.targetROAS ? 'text-green-300' : 'text-red-300'}`}>
                        {(roas - inputs.targetROAS).toFixed(2)}x
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
            </section>
          </div>

          {/* ── RIGHT COLUMN: RESULTS ─────────────────────────────────────────── */}
          <aside className="w-full lg:w-[40%]" aria-label="TikTok Shop profit calculation results">
            <div className="sticky top-24 space-y-6">

              {/* Main Results Card */}
              <div className="bg-black text-white rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative"
                aria-live="polite" aria-label="Live profit calculation summary">
                <div aria-hidden="true" className="absolute top-0 right-0 w-32 h-32 bg-[#FF0050] blur-[80px] opacity-20" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Net Profit Per Unit</p>
                      <p className={`text-6xl font-black ${results.netProfit >= 0 ? 'text-white' : 'text-red-500'}`}
                        aria-label={`Net profit per unit: ${regionData.symbol}${results.netProfit.toFixed(2)}`}>
                        {regionData.symbol}{results.netProfit.toFixed(2)}
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-black text-sm ${results.netProfit >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                      aria-label={`Profit margin: ${results.profitMargin.toFixed(1)}%`}>
                      {results.netProfit >= 0
                        ? <ArrowUpRight className="inline w-4 h-4 mr-1" aria-hidden="true" />
                        : <ArrowDownRight className="inline w-4 h-4 mr-1" aria-hidden="true" />}
                      {results.profitMargin.toFixed(1)}%
                    </div>
                  </div>

                  <dl className="grid grid-cols-2 gap-8 mb-10">
                    <div>
                      <dt className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Break-Even Price</dt>
                      <dd className="text-2xl font-black">{regionData.symbol}{results.breakEvenPrice.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Monthly Profit</dt>
                      <dd className="text-2xl font-black text-[#00F2EA]">
                        {regionData.symbol}{results.monthlyProfit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </dd>
                    </div>
                  </dl>

                  <dl className="space-y-4 pt-8 border-t border-white/10">
                    <div className="flex justify-between items-center text-sm">
                      <dt className="text-gray-400">Effective Revenue</dt>
                      <dd className="font-bold">{regionData.symbol}{results.effectiveRevenue.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <dt className="text-gray-400">Total TikTok Fees</dt>
                      <dd className="font-bold text-red-400">-{regionData.symbol}{(results.commission + results.transactionFee).toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <dt className="text-gray-400">Refund Cost (incl. lost COGS/shipping)</dt>
                      <dd className="font-bold text-red-400">-{regionData.symbol}{results.refundCost.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <dt className="text-gray-400">Cost of Goods</dt>
                      <dd className="font-bold text-gray-200">-{regionData.symbol}{inputs.cogs.toFixed(2)}</dd>
                    </div>
                  </dl>

                  <button onClick={exportPDF} disabled={isExporting}
                    aria-label="Download TikTok Shop profit analysis as PDF report"
                    className={`w-full mt-10 bg-white text-black py-5 rounded-2xl font-black hover:bg-[#FF0050] hover:text-white transition-all flex items-center justify-center group ${isExporting ? 'opacity-60 cursor-not-allowed' : ''}`}>
                    <Download className={`w-5 h-5 mr-2 transition-transform ${isExporting ? 'animate-bounce' : 'group-hover:scale-110'}`} aria-hidden="true" />
                    {isExporting ? 'Generating PDF…' : 'Download Profit Report'}
                  </button>
                </div>
              </div>

              {/* Cost Distribution Chart */}
              <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                <h2 className="font-bold text-lg mb-6 flex items-center">
                  <PieChartIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                  Cost Distribution
                </h2>
                <div className="h-64 w-full" aria-label="Pie chart showing cost breakdown by category">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value?: number) => [`${regionData.symbol}${(value ?? 0).toFixed(2)}`, '']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="grid grid-cols-2 gap-4 mt-6" aria-label="Chart legend">
                  {chartData.map((item, i) => (
                    <li key={i} className="flex items-center text-xs list-none">
                      <div aria-hidden="true" className="w-3 h-3 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-500 font-medium">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Monthly Projection */}
              <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                <h2 className="font-bold text-lg mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" aria-hidden="true" />
                  Monthly Profit Projection
                </h2>
                <dl className="space-y-6">
                  {[
                    { label: 'Total Revenue', value: `${regionData.symbol}${results.monthlyRevenue.toLocaleString()}`, barColor: 'bg-black',     pct: 100,                                                              cls: '' },
                    { label: 'Total Fees',    value: `${regionData.symbol}${results.monthlyFees.toLocaleString()}`,    barColor: 'bg-red-500',   pct: (results.monthlyFees / results.monthlyRevenue) * 100,             cls: 'text-red-500' },
                    { label: 'Net Profit',    value: `${regionData.symbol}${results.monthlyProfit.toLocaleString()}`,  barColor: 'bg-green-500', pct: (results.monthlyProfit / results.monthlyRevenue) * 100,           cls: 'text-green-500' },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <dt className="text-gray-500">{row.label}</dt>
                        <dd className={`font-bold ${row.cls}`}>{row.value}</dd>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden" role="presentation">
                        <div className={`${row.barColor} h-full rounded-full`} style={{ width: `${row.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Related Resources */}
              <nav aria-label="Related TikTok Shop seller resources" className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm">
                <h2 className="font-bold text-sm mb-4 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#FF0050]" aria-hidden="true" />
                  Related Resources
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/guides/tiktok-shop" className="flex items-center text-sm text-gray-600 hover:text-[#FF0050] transition-colors">
                      <ExternalLink className="w-3 h-3 mr-2 flex-shrink-0" aria-hidden="true" />
                      Complete TikTok Shop Seller Guide
                    </a>
                  </li>
                  <li>
                    <a href="/guides/affiliate" className="flex items-center text-sm text-gray-600 hover:text-[#FF0050] transition-colors">
                      <ExternalLink className="w-3 h-3 mr-2 flex-shrink-0" aria-hidden="true" />
                      TikTok Affiliate Marketing Guide
                    </a>
                  </li>
                  <li>
                    <a href="/guides/ads-roi" className="flex items-center text-sm text-gray-600 hover:text-[#FF0050] transition-colors">
                      <ExternalLink className="w-3 h-3 mr-2 flex-shrink-0" aria-hidden="true" />
                      TikTok Ads ROI &amp; ROAS Calculator
                    </a>
                  </li>
                </ul>
              </nav>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
