"use client";

import { FormEvent, useState } from 'react';

import { useDashboardStore } from '@/hooks/useDashboardStore';
import { SUPPORTED_CHAINS } from '@/lib/constants';
import { fetchDashboardData } from '@/services/dashboard';

export default function AddressForm() {
  const { chain, target, from, to, setChain, setTarget, setLoading, setError, hydrateMetrics } =
    useDashboardStore();
  const [localTarget, setLocalTarget] = useState(target);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!localTarget) {
      setError('请先输入合约或地址');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const payload = await fetchDashboardData({
        chain,
        target: localTarget.trim(),
        from,
        to
      });
      hydrateMetrics(payload);
      setTarget(localTarget.trim());
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error ? error.message : '数据拉取失败，请稍后再试或检查地址格式'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <div style={styles.row}>
        <select
          value={chain}
          onChange={(event) => setChain(event.target.value as (typeof SUPPORTED_CHAINS)[number]['key'])}
          style={styles.select}
        >
          {SUPPORTED_CHAINS.map(({ key, label }) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <input
          value={localTarget}
          onChange={(event) => setLocalTarget(event.target.value)}
          placeholder="输入 EVM 合约/协议地址"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          拉取数据
        </button>
      </div>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  row: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  select: {
    minWidth: '140px',
    padding: '0.75rem',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.07)',
    background: 'rgba(16, 23, 37, 0.9)',
    color: 'inherit'
  },
  input: {
    flex: 1,
    minWidth: '260px',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.07)',
    background: 'rgba(16, 23, 37, 0.9)',
    color: 'inherit'
  },
  button: {
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    border: 'none',
    background:
      'linear-gradient(135deg, rgba(59,130,246,0.95) 0%, rgba(165,180,252,0.95) 100%)',
    color: '#0c111b',
    fontWeight: 600,
    cursor: 'pointer'
  }
};
