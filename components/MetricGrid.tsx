"use client";

import { useDashboardStore } from '@/hooks/useDashboardStore';
import { formatNumber } from '@/lib/format';
import type { ActivitySnapshot } from '@/lib/types';

type MetricConfig = {
  key: keyof ActivitySnapshot;
  label: string;
  suffix?: string;
  optional?: boolean;
};

const metricConfigs: ReadonlyArray<MetricConfig> = [
  { key: 'newAddresses', label: '新增地址' },
  { key: 'activeAddresses', label: '活跃地址' },
  { key: 'retentionRate', label: '留存率', suffix: '%' },
  { key: 'txVolume', label: '交易量 (USD)' },
  { key: 'tvlUsd', label: 'TVL (USD)', optional: true }
];

export default function MetricGrid() {
  const { snapshot, loading } = useDashboardStore((state) => ({
    snapshot: state.snapshot,
    loading: state.loading
  }));

  if (!snapshot) {
    return null;
  }

  return (
    <section style={styles.grid}>
      {metricConfigs.map((config) => {
        const value = snapshot[config.key];
        if (config.optional && value == null) {
          return null;
        }

        return (
          <article key={config.key} style={styles.card}>
            <span style={styles.label}>{config.label}</span>
            <strong style={styles.value}>
              {loading ? '同步中…' : `${formatNumber(value ?? 0)}${config.suffix ?? ''}`}
            </strong>
          </article>
        );
      })}
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '1rem'
  },
  card: {
    padding: '1rem',
    borderRadius: '16px',
    background: 'rgba(21, 27, 41, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.85rem',
    color: 'rgba(229, 236, 255, 0.7)'
  },
  value: {
    fontSize: '1.5rem'
  }
};
