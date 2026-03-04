import { Region } from './types';

export const REGIONS: Record<Region, {
  name: string;
  symbol: string;
  commissionRate: number;
  transactionFeeRate: number;
  refundAdminFeeRate: number;
  newSellerRate: number;
  newSellerPeriod: number;
  categoryRates: Record<string, number>;
}> = {
  US: {
    name: 'United States',
    symbol: '$',
    commissionRate: 6.0,
    transactionFeeRate: 0, // Unified in commission
    refundAdminFeeRate: 20,
    newSellerRate: 3.0,
    newSellerPeriod: 30,
    categoryRates: {
      fashion: 6.0,
      jewelry: 5.0,
      'pre-owned': 5.0
    }
  },
  UK: {
    name: 'United Kingdom',
    symbol: '£',
    commissionRate: 9.0,
    transactionFeeRate: 0, // Unified in commission
    refundAdminFeeRate: 20,
    newSellerRate: 1.8,
    newSellerPeriod: 90,
    categoryRates: {
      fashion: 9.0,
      electronics: 5.0,
      beauty: 9.0,
      home: 9.0
    }
  },
  EU: {
    name: 'European Union',
    symbol: '€',
    commissionRate: 9.0,
    transactionFeeRate: 0, // Unified in commission
    refundAdminFeeRate: 20,
    newSellerRate: 4.0,
    newSellerPeriod: 60,
    categoryRates: {
      fashion: 9.0,
      electronics: 7.0,
      'beauty-tech': 7.0
    }
  }
};

export const CATEGORIES = [
  { id: 'fashion', name: 'Fashion' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'home', name: 'Home' },
  { id: 'jewelry', name: 'Jewelry & Collectibles' },
  { id: 'pre-owned', name: 'Pre-Owned' },
  { id: 'beauty-tech', name: 'Beauty Tech' }
];