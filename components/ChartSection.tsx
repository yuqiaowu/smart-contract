"use client";

import LineChart from '@/components/charts/LineChart';
import FunnelChart from '@/components/charts/FunnelChart';
import { useDashboardStore } from '@/hooks/useDashboardStore';

export default function ChartSection() {
  const charts = useDashboardStore((state) => state.charts);

  return (
    <section style={styles.wrapper}>
      <div style={styles.grid}>
        <div style={styles.chartCard}>
          <LineChart title="新增地址" seriesName="新增地址" data={charts.newAddresses} />
        </div>
        <div style={styles.chartCard}>
          <LineChart
            title="活跃地址"
            seriesName="活跃地址"
            data={charts.activeAddresses}
            color="#4ade80"
          />
        </div>
        <div style={styles.chartCard}>
          <LineChart
            title="交易量 (USD)"
            seriesName="交易量"
            data={charts.txVolume}
            color="#f97316"
          />
        </div>
        <div style={styles.chartCard}>
          <FunnelChart data={charts.retentionFunnel} />
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    marginTop: '2rem'
  },
  grid: {
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
  },
  chartCard: {
    padding: '1rem',
    borderRadius: '16px',
    background: 'rgba(21, 27, 41, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.08)'
  }
};
