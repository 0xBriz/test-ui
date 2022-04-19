import { ChainBaseConfig } from 'src/types/chain.types';

export const HARMONY_CHAIN: ChainBaseConfig = {
  name: 'Harmony',
  nativeToken: { coinGeckoId: 'harmony' },
  chainId: 1666600000,
};

export const LOCAL_HARDHAT_CHAIN: ChainBaseConfig = {
  name: 'Local Hardhat',
  nativeToken: { coinGeckoId: 'harmony' },
  chainId: 31337,
};

export const BINANCE_SMART_CHAIN: ChainBaseConfig = {
  name: 'BSC',
  nativeToken: { coinGeckoId: 'binancecoin' },
  chainId: 56,
  blockTimeSeconds: 3,
  //blocksPerYear: SECONDS_IN_YEAR / 3,
  compoundsGuessimate: 1, //  Hard coded until API is set up
};

export const CHAIN_ID_MAP = {
  [HARMONY_CHAIN.chainId]: {
    ...HARMONY_CHAIN,
  },
  [BINANCE_SMART_CHAIN.chainId]: {
    ...BINANCE_SMART_CHAIN,
  },
};

export const CURRENT_CHAINS: ChainBaseConfig[] = [
  BINANCE_SMART_CHAIN,
  HARMONY_CHAIN,
  LOCAL_HARDHAT_CHAIN,
  // {
  //   name: 'Solana',
  //   nativeToken: { coinGeckoId: 'solana' },
  // },

  // {
  //   name: 'Polygon',
  //   nativeToken: { coinGeckoId: 'matic-network' },
  // },

  // {
  //   name: 'Osmosis',
  //   nativeToken: { coinGeckoId: 'osmosis' },
  // },
  // {
  //   name: 'Terra',
  //   nativeToken: { coinGeckoId: 'terra-luna' },
  // },
  // {
  //   name: 'Avalanche',
  //   nativeToken: { coinGeckoId: 'avalanche-2' },
  //   chainId: 43114,
  // },
  // {
  //   name: 'Fantom',
  //   nativeToken: { coinGeckoId: 'fantom' },
  //   chainId: 250,
  // },
  // {
  //   name: 'Near',
  //   nativeToken: { coinGeckoId: 'near' },
  // },
  // {
  //   name: 'Aurora',
  //   nativeToken: { coinGeckoId: 'aurora-near' },
  // },
  // {
  //   name: 'Oasis',
  //   nativeToken: { coinGeckoId: 'oasis-network' },
  // },
  // {
  //   name: 'Cosmos',
  //   nativeToken: { coinGeckoId: 'cosmos' },
  // },
];
