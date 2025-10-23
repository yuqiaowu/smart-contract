import dayjs from 'dayjs';

import type { ChainKey, MetricPoint } from '@/lib/types';

export const ETHERSCAN_HOSTS: Record<ChainKey, string> = {
  ethereum: 'https://api.etherscan.io/api',
  base: 'https://api.basescan.org/api'
};

interface TimeRangeParams {
  chain: ChainKey;
  address: string;
  from: string;
  to: string;
}

const getApiKey = () =>
  process.env.NEXT_PUBLIC_ETHERSCAN_KEY ??
  process.env.ETHERSCAN_KEY ??
  process.env.BASESCAN_KEY ??
  '';

/**
 * TODO: Use account module endpoints (txlist, txlistinternal) + custom aggregation to derive per-day metrics.
 * This stub is a placeholder so the dashboard can be wired before the API integration is complete.
 */
export const fetchAddressActivitySeries = async (
  _params: TimeRangeParams
): Promise<MetricPoint[]> => {
  throw new Error('Etherscan API 尚未接入，请在 services/etherscan.ts 中补充实现。');
};

export const fetchAddressVolumeSeries = async (
  _params: TimeRangeParams
): Promise<MetricPoint[]> => {
  throw new Error('Etherscan API 尚未接入，请在 services/etherscan.ts 中补充实现。');
};

export const validateEtherscanConfiguration = () => {
  const key = getApiKey();
  if (!key) {
    return {
      ready: false,
      message: '缺少 Etherscan/BaseScan API Key，可在 .env.local 中配置 NEXT_PUBLIC_ETHERSCAN_KEY。'
    };
  }
  return { ready: true, message: `Etherscan API Key 已检测: ${key.slice(0, 4)}****` };
};

export const buildTimeRange = (from: string, to: string) => ({
  startBlock: dayjs(from).unix(),
  endBlock: dayjs(to).unix()
});
