import type { DashboardCharts, ActivitySnapshot } from '@/lib/types';

interface ExportPayload {
  address: string;
  chain: string;
  snapshot: ActivitySnapshot;
  charts: DashboardCharts;
}

/**
 * Export a markdown snapshot so users can review or share without extra tooling.
 */
export const exportDashboardReport = async ({ address, chain, snapshot, charts }: ExportPayload) => {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2
  });

  const formatSeriesTable = (title: string, series: { date: string; value: number }[]) => {
    if (!series.length) {
      return '';
    }
    const header = `### ${title}\n\n| 日期 | 数值 |\n| --- | --- |\n`;
    const rows = series
      .slice(-7)
      .map((point) => `| ${point.date} | ${numberFormatter.format(point.value)} |`)
      .join('\n');
    return `${header}${rows}\n`;
  };

  const reportSections = [
    `# AgentLens 链上运营日报`,
    '',
    `- 导出时间：${new Date().toISOString()}`,
    `- 监控地址：${address || 'N/A'}`,
    `- 链：${chain}`,
    '',
    '## 核心指标快照',
    `- 新增地址：${numberFormatter.format(snapshot.newAddresses)}`,
    `- 活跃地址：${numberFormatter.format(snapshot.activeAddresses)}`,
    `- 留存率：${numberFormatter.format(snapshot.retentionRate)}%`,
    `- 交易量 (USD)：${numberFormatter.format(snapshot.txVolume)}`,
    snapshot.tvlUsd !== undefined ? `- TVL (USD)：${numberFormatter.format(snapshot.tvlUsd)}` : null,
    '',
    '## 近7日趋势',
    formatSeriesTable('新增地址', charts.newAddresses),
    formatSeriesTable('活跃地址', charts.activeAddresses),
    formatSeriesTable('交易量 (USD)', charts.txVolume)
  ].filter(Boolean);

  const retentionTable = charts.retentionFunnel.length
    ? [
        '## 留存漏斗',
        '',
        '| 阶段 | 数值 |',
        '| --- | --- |',
        ...charts.retentionFunnel.map((stage) => `| ${stage.stage} | ${numberFormatter.format(stage.value)} |`)
      ]
    : [];

  const reportContent = [...reportSections, '', ...retentionTable].join('\n');

  const blob = new Blob([reportContent], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const download = document.createElement('a');
  const sanitizedAddress = address.replace(/[^a-zA-Z0-9_-]/g, '') || 'address';
  const fileName = `agentlens-report-${sanitizedAddress}-${new Date().toISOString().slice(0, 10)}.md`;

  download.href = url;
  download.download = fileName;
  document.body.appendChild(download);
  download.click();
  download.remove();
  URL.revokeObjectURL(url);
};
