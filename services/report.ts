import type { DashboardCharts, ActivitySnapshot } from '@/lib/types';

interface ExportPayload {
  address: string;
  chain: string;
  snapshot: ActivitySnapshot;
  charts: DashboardCharts;
}

/**
 * TODO: Use jsPDF or Puppeteer API deployed on serverless runtime to export PDF.
 */
export const exportDashboardPdf = async (_payload: ExportPayload) => {
  // eslint-disable-next-line no-console
  console.warn('PDF 导出功能尚未实现，后续接入 jsPDF 或 server 渲染逻辑。');
};
