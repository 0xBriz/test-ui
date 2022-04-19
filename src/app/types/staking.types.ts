import { ethers } from 'ethers';

export interface ILockPool {
  poolId: number;
  label: string;
  value: ethers.BigNumber;
}
