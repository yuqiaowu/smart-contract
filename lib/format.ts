import dayjs from 'dayjs';

export const formatNumber = (value: number, fractionDigits = 0) =>
  Intl.NumberFormat('zh-CN', {
    notation: 'compact',
    maximumFractionDigits: fractionDigits
  }).format(value);

export const formatDate = (value: string) => dayjs(value).format('MM-DD');
