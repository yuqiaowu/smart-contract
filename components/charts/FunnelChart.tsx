"use client";

import { useEffect, useRef } from 'react';

interface FunnelItem {
  stage: string;
  value: number;
}

interface Props {
  data: FunnelItem[];
}

export default function FunnelChart({ data }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let chart: Awaited<typeof import('echarts')>['ECharts'] | null = null;
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
          text: '留存漏斗',
          left: 'left',
          textStyle: { color: '#e5ecff', fontSize: 14, fontWeight: 600 }
        },
        tooltip: {
          trigger: 'item',
          formatter: ({ name, value }: { name: string; value: number }) => `${name}: ${value}`
        },
        series: [
          {
            name: 'Retention',
            type: 'funnel',
            width: '80%',
            left: '10%',
            top: 60,
            bottom: 20,
            gap: 6,
            label: {
              color: '#e5ecff',
              formatter: '{b}: {c}'
            },
            labelLine: {
              length: 12,
              lineStyle: { color: 'rgba(229,236,255,0.4)' }
            },
            itemStyle: {
              borderWidth: 0,
              opacity: 0.85
            },
            data: data.map((item, index) => ({
              name: item.stage,
              value: item.value,
              itemStyle: {
                color: funnelColors[index % funnelColors.length]
              }
            }))
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
  }, [data]);

  return <div ref={ref} style={{ width: '100%', height: 320 }} role="img" aria-label="留存漏斗" />;
}

const funnelColors = ['#60a5fa', '#818cf8', '#a855f7', '#f472b6'];
