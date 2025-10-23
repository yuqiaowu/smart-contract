import axios from 'axios';

interface TvlResponse {
  tvl: Array<{ date: number; totalLiquidityUSD: number }>;
}

/**
 * TODO: Wire actual protocol slug / pool address once确定。
 */
export const fetchProtocolTvl = async (protocolSlug: string) => {
  const url = `https://api.llama.fi/protocol/${protocolSlug}`;
  const { data } = await axios.get<TvlResponse>(url);
  const latest = data.tvl.at(-1);
  return latest?.totalLiquidityUSD ?? null;
};
