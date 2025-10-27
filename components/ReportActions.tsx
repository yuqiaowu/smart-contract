"use client";

import { useState } from 'react';

import { useDashboardStore } from '@/hooks/useDashboardStore';
import { exportDashboardReport } from '@/services/report';

export default function ReportActions() {
  const { target, chain, snapshot, charts } = useDashboardStore();
  const [status, setStatus] = useState<'idle' | 'exporting' | 'done'>('idle');

  const handleExport = async () => {
    if (!snapshot || !charts) {
      return;
    }
    try {
      setStatus('exporting');
      await exportDashboardReport({
        address: target,
        chain,
        snapshot,
        charts
      });
      setStatus('done');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  return (
    <div style={styles.wrapper}>
      <button onClick={handleExport} style={styles.button} disabled={status === 'exporting'}>
        {status === 'exporting' ? '导出中…' : '导出日报'}
      </button>
      {status === 'done' ? <span style={styles.hint}>导出指令已发送</span> : null}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  button: {
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    border: 'none',
    background: 'rgba(59,130,246,0.2)',
    color: '#93c5fd',
    fontWeight: 600,
    cursor: 'pointer'
  },
  hint: {
    fontSize: '0.85rem',
    color: 'rgba(148, 163, 184, 0.9)'
  }
};
