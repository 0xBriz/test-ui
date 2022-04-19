import { ethers } from 'ethers';

export interface IAppData {
  users: AaltoUser[];
  contracts: AppContractData;
  lockTimeOptions: LockTime[];
}

export interface ILockPool {
  poolId: number;
  label: string;
  value: ethers.BigNumber;
  depositsEnabled: boolean;
  lockTimeSeconds: number;
  allocationPoints: number;
  amountLocked: ethers.BigNumber | string;
  lastRewardPaid: number;
}

export interface UserLockRecord {
  poolId: number;
  startTime: number;
  startTimeDate: string;
  endTime: number;
  amountLocked: string;
  startBlock: number;
  lastTimeRewardClaimed: number;
  lastBlockRewardClaimed: number;
}

export interface IStakingInput {
  poolId: number;
  amount: ethers.BigNumber;
}

export interface AaltoUser {
  name?: string;
  walletBalance: {
    BN: ethers.BigNumber;
    UI: string;
  };
  lockedBalance: string;
  address: string;
  locks: UserLockRecord[];
}

export interface AppContractData {
  nativeLiquidityPairAddress: string;
  stableLiquidityPairAddress: string;
}

export interface LockTime {
  value: ethers.BigNumber;
  label: string;
}
