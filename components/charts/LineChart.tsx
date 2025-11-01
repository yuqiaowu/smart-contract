"use client";

import { useEffect, useRef } from 'react';

import { formatDate } from '@/lib/format';
import type { MetricPoint } from '@/lib/types';

interface Props {
  title: string;
  seriesName: string;
  data: MetricPoint[];
  color?: string;
}

export default function LineChart({ title, seriesName, data, color = '#60a5fa' }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let chart: any | null = null;
    let disposed = false;

    const loadChart = async () => {
      if (!ref.current) {
        return;
      }
      const echarts = await import('echarts');
      if (disposed) {
        return;
      }
      chart = echarts.init(ref.current);
      chart.setOption({
        backgroundColor: 'transparent',
        title: {
          text: title,
          left: 'left',
          textStyle: { color: '#e5ecff', fontSize: 14, fontWeight: 600 }
        },
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: data.map((item) => formatDate(item.date)),
          boundaryGap: false,
          axisLabel: { color: 'rgba(229,236,255,0.7)' },
          axisLine: { lineStyle: { color: 'rgba(229,236,255,0.2)' } }
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: 'rgba(229,236,255,0.7)' },
          splitLine: { lineStyle: { color: 'rgba(229,236,255,0.2)' } }
        },
        grid: { left: '3%', right: '3%', bottom: '5%', containLabel: true },
        series: [
          {
            name: seriesName,
            type: 'line',
            smooth: true,
            showSymbol: false,
            areaStyle: {
              color
            },
            lineStyle: { color, width: 2 },
            data: data.map((item) => item.value)
          }
        ]
      });
    };

    loadChart();

    return () => {
      disposed = true;
      if (chart) {
        chart.dispose();
      }
    };
  }, [color, data, seriesName, title]);

  return <div ref={ref} style={{ width: '100%', height: 320 }} role="img" aria-label={title} />;
}
