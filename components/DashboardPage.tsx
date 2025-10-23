"use client";

import AddressForm from '@/components/AddressForm';
import ChartSection from '@/components/ChartSection';
import MetricGrid from '@/components/MetricGrid';
import ReportActions from '@/components/ReportActions';
import { useDashboardStore } from '@/hooks/useDashboardStore';
import { SUPPORTED_CHAINS } from '@/lib/constants';

export default function DashboardPage() {
  const { target, chain, loading, error, lastUpdated } = useDashboardStore();

  const activeChainLabel = SUPPORTED_CHAINS.find((item) => item.key === chain)?.label ?? chain;

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>AgentLens｜链上运营分析仪表盘</h1>
          <p style={styles.subtitle}>
            输入合约或协议地址，快速查看新增、活跃、留存、交易量等核心指标，并一键导出日报。
          </p>
        </div>
        <ReportActions />
      </header>

      <section style={styles.panel}>
        <h2 style={styles.heading}>项目配置</h2>
        <AddressForm />
        {target ? (
          <p style={styles.meta}>
            当前项目：{target}（{activeChainLabel}）{loading ? '｜数据同步中…' : ''}
          </p>
        ) : (
          <p style={styles.meta}>提示：支持 Ethereum / Base 链的 EVM 合约或协议地址</p>
        )}
        {error ? <p style={styles.error}>{error}</p> : null}
        {lastUpdated ? <p style={styles.meta}>最近更新时间：{lastUpdated}</p> : null}
      </section>

      <MetricGrid />
      <ChartSection />
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2.5rem 1.5rem 4rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  title: {
    margin: 0,
    fontSize: '2.25rem'
  },
  subtitle: {
    marginTop: '0.5rem',
    color: 'rgba(229, 236, 255, 0.7)',
    maxWidth: '680px',
    lineHeight: 1.6
  },
  panel: {
    padding: '1.5rem',
    borderRadius: '20px',
    background: 'rgba(12, 17, 27, 0.65)',
    border: '1px solid rgba(59, 130, 246, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  heading: {
    margin: 0,
    fontSize: '1.25rem'
  },
  meta: {
    margin: 0,
    color: 'rgba(148, 163, 184, 0.9)'
  },
  error: {
    margin: 0,
    color: '#fca5a5'
  }
};
