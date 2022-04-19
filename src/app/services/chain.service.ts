import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChainBaseConfig } from 'src/types/chain.types';
import {
  CURRENT_CHAINS,
  HARMONY_CHAIN,
  BINANCE_SMART_CHAIN,
  LOCAL_HARDHAT_CHAIN,
} from './chains';

@Injectable({ providedIn: 'root' })
export class ChainService {
  private _chains = new BehaviorSubject<ChainBaseConfig[]>(CURRENT_CHAINS);
  get chains() {
    return this._chains.asObservable();
  }

  private readonly currentSupportedChains = [
    HARMONY_CHAIN,
    BINANCE_SMART_CHAIN,
    LOCAL_HARDHAT_CHAIN,
  ];

  constructor() {}

  isChainSupported(chainId) {
    return this.currentSupportedChains.find((c) => c.chainId == chainId);
  }

  async getChain(name: string): Promise<ChainBaseConfig> {
    const chain = this._chains.value.find((c) => c.name === name);
    chain.nativeToken = null;
    return chain;
  }

  // EVM chains
  async getChainById(chainId: number): Promise<ChainBaseConfig> {
    const chain = this._chains.value.find((c) => c.chainId == chainId);
    console.log(chain);
    if (!chain) {
      throw new Error(`Chain not found: ${chain}`);
    }
    chain.nativeToken = null;
    return chain;
  }
}
