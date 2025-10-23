import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AgentLens | 链上运营分析仪表盘',
  description:
    '输入 EVM 合约或地址，查看新增、活跃、留存、交易量等核心指标，并导出日报 PDF。'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>{children}</body>
    </html>
  );
}
