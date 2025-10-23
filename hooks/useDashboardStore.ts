import { create } from 'zustand';
import dayjs from 'dayjs';

import { DEFAULT_DATE_RANGE_DAYS } from '@/lib/constants';
import { mockCharts, mockSnapshot } from '@/lib/mock';
import type { DashboardStore } from '@/lib/types';

const defaultFrom = dayjs().subtract(DEFAULT_DATE_RANGE_DAYS, 'day').format('YYYY-MM-DD');
const defaultTo = dayjs().format('YYYY-MM-DD');

export const useDashboardStore = create<DashboardStore>((set) => ({
  chain: 'ethereum',
  target: '',
  from: defaultFrom,
  to: defaultTo,
  loading: false,
  error: null,
  snapshot: mockSnapshot,
  charts: mockCharts,
  lastUpdated: new Date().toISOString(),
  setChain: (chain) => set({ chain }),
  setTarget: (target) => set({ target }),
  setDateRange: (from, to) => set({ from, to }),
  setLoading: (loading) => set({ loading }),
  setError: (message) => set({ error: message }),
  hydrateMetrics: ({ snapshot, charts, lastUpdated }) =>
    set({
      snapshot,
      charts,
      lastUpdated
    }),
  reset: () =>
    set({
      target: '',
      error: null,
      loading: false
    })
}));
