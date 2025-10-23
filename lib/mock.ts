import { RETENTION_STAGES } from './constants';
import type { ActivitySnapshot, DashboardCharts } from './types';

const today = new Date();

const generateSeries = (base: number, volatility = 0.2) =>
  Array.from({ length: 14 }).map((_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (13 - index));
    const multiplier = 1 + (Math.random() - 0.5) * volatility;
    return {
      date: date.toISOString().slice(0, 10),
      value: Math.round(base * multiplier)
    };
  });

export const mockSnapshot: ActivitySnapshot = {
  newAddresses: 1200,
  activeAddresses: 5600,
  retentionRate: 42,
  txVolume: 2_400_000,
  tvlUsd: 12_000_000
};

export const mockCharts: DashboardCharts = {
  newAddresses: generateSeries(1000),
  activeAddresses: generateSeries(4000),
  txVolume: generateSeries(2_000_000, 0.35),
  retentionFunnel: RETENTION_STAGES.map((stage, index) => ({
    stage,
    value: Math.round(mockSnapshot.activeAddresses * Math.pow(0.6, index))
  }))
};
