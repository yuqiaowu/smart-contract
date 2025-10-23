export type ChainKey = 'ethereum' | 'base';

export interface MetricPoint {
  date: string;
  value: number;
}

export interface ActivitySnapshot {
  newAddresses: number;
  activeAddresses: number;
  retentionRate: number;
  txVolume: number;
  tvlUsd?: number;
}

export interface DashboardCharts {
  newAddresses: MetricPoint[];
  activeAddresses: MetricPoint[];
  txVolume: MetricPoint[];
  retentionFunnel: Array<{
    stage: string;
    value: number;
  }>;
}

export interface DashboardState {
  chain: ChainKey;
  target: string;
  from: string | null;
  to: string | null;
  loading: boolean;
  error: string | null;
  snapshot: ActivitySnapshot | null;
  charts: DashboardCharts;
  lastUpdated: string | null;
}

export interface DashboardActions {
  setChain: (chain: ChainKey) => void;
  setTarget: (target: string) => void;
  setDateRange: (from: string | null, to: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
  hydrateMetrics: (payload: {
    snapshot: ActivitySnapshot;
    charts: DashboardCharts;
    lastUpdated: string;
  }) => void;
  reset: () => void;
}

export type DashboardStore = DashboardState & DashboardActions;
