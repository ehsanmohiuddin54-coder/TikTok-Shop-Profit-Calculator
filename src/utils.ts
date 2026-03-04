import { CalculatorInputs, CalculationResults } from './types';
import { REGIONS } from './constants';

export function calculateProfit(inputs: CalculatorInputs): CalculationResults {
  const regionData = REGIONS[inputs.region];
  
  // Get effective commission rate based on new seller status
  let commissionRate = inputs.useOfficialRates 
    ? (inputs.isNewSeller && inputs.daysSinceFirstSale <= regionData.newSellerPeriod 
        ? regionData.newSellerRate 
        : regionData.commissionRate)
    : inputs.customCommissionRate;
  
  // Apply category-specific rates for US
  if (inputs.region === 'US' && inputs.useOfficialRates) {
    commissionRate = regionData.categoryRates[inputs.category] || regionData.commissionRate;
    
    // Special handling for pre-owned items over $10,000
    if (inputs.category === 'pre-owned' && inputs.sellingPrice > 10000) {
      const over10k = inputs.sellingPrice - 10000;
      const under10k = 10000;
      const blendedRate = ((under10k * 0.05) + (over10k * 0.03)) / inputs.sellingPrice;
      commissionRate = blendedRate * 100;
    }
  }
  
  // Apply category-specific rates for UK/EU
  if ((inputs.region === 'UK' || inputs.region === 'EU') && inputs.useOfficialRates) {
    commissionRate = regionData.categoryRates[inputs.category] || regionData.commissionRate;
  }

  // Calculate effective revenue (after discounts)
  const sellerDiscount = inputs.sellingPrice * (inputs.sellerDiscountPercent / 100);
  const effectiveRevenue = inputs.sellingPrice - sellerDiscount - (inputs.platformDiscount || 0);

  // Apply VAT adjustment if registered (UK/EU)
  let vatMultiplier = 1;
  if (inputs.vatRegistered && (inputs.region === 'UK' || inputs.region === 'EU')) {
    vatMultiplier = 1 / (1 + inputs.vatRate / 100);
  }

  // Calculate TikTok fees based on region
  let commission = 0;
  let transactionFee = 0;
  
  if (inputs.region === 'US') {
    // US: Commission on (CustomerPayment + PlatformDiscount - Tax)
    // Assuming no tax for calculation
    commission = (effectiveRevenue + (inputs.platformDiscount || 0)) * (commissionRate / 100);
    transactionFee = 0; // Unified
  } else if (inputs.region === 'UK') {
    // UK: VAT inclusive - calculate on final customer price
    commission = inputs.sellingPrice * (commissionRate / 100) * vatMultiplier;
    transactionFee = 0; // Unified
  } else if (inputs.region === 'EU') {
    // EU: Commission on (NetSales + Shipping + PlatformDiscount)
    const shipping = inputs.fulfillmentType === 'self' ? inputs.shippingCost : (inputs.fbtFulfillmentFee + inputs.fbtStorageCost);
    commission = (effectiveRevenue + shipping + (inputs.platformDiscount || 0)) * (commissionRate / 100) * vatMultiplier;
    transactionFee = 0; // Unified
  }

  // Calculate refund cost including lost COGS and shipping if selected
  const refundRate = inputs.expectedReturnRate / 100;
  let refundCost = 0;
  
  if (inputs.region === 'US') {
    // US: 20% of original referral fee, capped at $5 per SKU
    const refundFee = commission * 0.2;
    refundCost = Math.min(refundFee, 5) * refundRate;
  } else {
    // Other regions: standard refund admin fee
    refundCost = (commission + transactionFee) * (inputs.useOfficialRates ? regionData.refundAdminFeeRate / 100 : inputs.customRefundAdminFeeRate / 100) * refundRate;
  }
  
  // Add lost COGS on return if selected
  if (inputs.lostCogsOnReturn) {
    refundCost += inputs.cogs * refundRate;
  }
  
  // Add lost shipping on return if selected
  if (inputs.lostShippingOnReturn) {
    const shippingCost = inputs.fulfillmentType === 'self' ? inputs.shippingCost : (inputs.fbtFulfillmentFee + inputs.fbtStorageCost);
    refundCost += shippingCost * refundRate;
  }

  // Calculate affiliate commission
  const affiliateCommission = effectiveRevenue * (inputs.affiliateCommissionPercent / 100) * vatMultiplier;

  // Calculate fulfillment cost
  const fulfillmentCost = inputs.fulfillmentType === 'self' 
    ? inputs.shippingCost 
    : (inputs.fbtFulfillmentFee + inputs.fbtStorageCost);

  // Calculate total costs
  const totalCosts = (inputs.cogs * vatMultiplier) + 
                    commission + 
                    transactionFee + 
                    refundCost + 
                    affiliateCommission + 
                    inputs.adCostPerUnit + 
                    fulfillmentCost +
                    (effectiveRevenue * inputs.voucherContributionPercent / 100);

  // Calculate net profit
  const netProfit = effectiveRevenue - totalCosts;

  // Calculate profit margin
  const profitMargin = (netProfit / effectiveRevenue) * 100;

  // Calculate break-even price (simplified)
  const breakEvenPrice = (inputs.cogs + 
                         commission + 
                         transactionFee + 
                         refundCost + 
                         affiliateCommission + 
                         inputs.adCostPerUnit + 
                         fulfillmentCost) / (1 - (inputs.sellerDiscountPercent / 100) - (inputs.voucherContributionPercent / 100));

  // Calculate monthly projections
  const monthlyRevenue = effectiveRevenue * inputs.monthlySalesVolume;
  const monthlyFees = (commission + transactionFee + refundCost + affiliateCommission + inputs.adCostPerUnit + fulfillmentCost) * inputs.monthlySalesVolume;
  const monthlyProfit = netProfit * inputs.monthlySalesVolume;

  return {
    effectiveRevenue,
    commission,
    transactionFee,
    refundCost,
    affiliateCommission,
    totalCosts,
    netProfit,
    profitMargin,
    breakEvenPrice,
    monthlyRevenue,
    monthlyFees,
    monthlyProfit,
  };
}