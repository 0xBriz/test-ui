import { ethers } from 'ethers';
import { ERC20_ABI } from '../abis/ERC20';
import { UNIV2_PAIR_ABI } from '../abis/UniV2Pair';

export function createERC20(address: string, signer: ethers.Signer) {
  return new ethers.Contract(address, ERC20_ABI, signer);
}

export function createERC20Pair(address: string, signer: ethers.Signer) {
  return new ethers.Contract(address, UNIV2_PAIR_ABI, signer);
}
