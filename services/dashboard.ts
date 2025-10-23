import dayjs from 'dayjs';

import { mockCharts, mockSnapshot } from '@/lib/mock';
import type { ChainKey, ActivitySnapshot, DashboardCharts } from '@/lib/types';

interface FetchParams {
  chain: ChainKey;
  target: string;
  from: string | null;
  to: string | null;
}

interface FetchResult {
  snapshot: ActivitySnapshot;
  charts: DashboardCharts;
  lastUpdated: string;
}

export const fetchDashboardData = async ({ chain, target, from, to }: FetchParams) => {
  const safeFrom = from ?? dayjs().subtract(14, 'day').format('YYYY-MM-DD');
  const safeTo = to ?? dayjs().format('YYYY-MM-DD');

  // TODO: Replace with actual API aggregation using services/etherscan & services/defillama.
  const mock = {
    snapshot: mockSnapshot,
    charts: mockCharts,
    lastUpdated: new Date().toISOString()
  };

  if (!target) {
    return mock;
  }

  try {
    // Placeholder for future implementation:
    // const [activitySeries, volumeSeries] = await Promise.all([
    //   fetchAddressActivitySeries({ chain, address: target, from: safeFrom, to: safeTo }),
    //   fetchAddressVolumeSeries({ chain, address: target, from: safeFrom, to: safeTo })
    // ]);
    // const tvlUsd = await fetchProtocolTvl('protocol-slug');
    return mock;
  } catch (error) {
    console.warn('拉取真实数据失败，将使用占位数据', error);
    return mock;
  }
};

export type { FetchParams, FetchResult };
