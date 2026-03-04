export type Region = 'US' | 'UK' | 'EU';

export interface CalculatorInputs {
  region: Region;
  category: string;
  useOfficialRates: boolean;
  customCommissionRate: number;
  customTransactionFeeRate: number;
  customRefundAdminFeeRate: number;
  sellingPrice: number;
  cogs: number;
  sellerDiscountPercent: number;
  expectedReturnRate: number;
  fulfillmentType: 'self' | 'fbt';
  shippingCost: number;
  fbtFulfillmentFee: number;
  fbtStorageCost: number;
  affiliateCommissionPercent: number;
  adCostPerUnit: number;
  voucherContributionPercent: number;
  monthlySalesVolume: number;
  isNewSeller: boolean;
  daysSinceFirstSale: number;
  platformDiscount: number;
  // New advanced inputs
  vatRegistered: boolean;
  vatRate: number;
  lostCogsOnReturn: boolean;
  lostShippingOnReturn: boolean;
  conversionRate: number;
  averageOrderValue: number;
  cpc: number;
  enableAdsMode: boolean;
  targetROAS: number;
  scenarioMode: 'custom' | 'worst' | 'best' | 'conservative';
}

export interface CalculationResults {
  effectiveRevenue: number;
  commission: number;
  transactionFee: number;
  refundCost: number;
  affiliateCommission: number;
  totalCosts: number;
  netProfit: number;
  profitMargin: number;
  breakEvenPrice: number;
  monthlyRevenue: number;
  monthlyFees: number;
  monthlyProfit: number;
}