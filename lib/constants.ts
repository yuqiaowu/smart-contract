import type { ChainKey } from './types';

export const SUPPORTED_CHAINS: Array<{ label: string; key: ChainKey; explorer: string }> = [
  { label: 'Ethereum', key: 'ethereum', explorer: 'https://etherscan.io/address/' },
  { label: 'Base', key: 'base', explorer: 'https://basescan.org/address/' }
];

export const DEFAULT_DATE_RANGE_DAYS = 14;

export const RETENTION_STAGES = ['新地址', '活跃用户', '复访用户', '核心用户'] as const;
