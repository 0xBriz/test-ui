import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import { commasUI, InitialTokenOffering } from './initial-token-offering.class';
import { Web3Service } from './web3.service';

@Injectable({ providedIn: 'root' })
export class PresaleService {
  contract: InitialTokenOffering;

  private _pools = new BehaviorSubject<any[]>([]);
  get pools() {
    return this._pools.asObservable();
  }

  constructor(private readonly web3Service: Web3Service) {
    this.web3Service.web3.subscribe((info) => {
      if (info) {
        this.contract = new InitialTokenOffering(
          '0x4b3F4ec91b45551eBBe6bA143EaF645009631921',
          info.signer
        );

        this.getPools();
      }
    });
  }

  async getPools() {
    const pools = await this.contract.getPools();
    this._pools.next(pools);
  }

  async deposit(pool, amount: number) {
    await this.contract.depositPool(
      pool,
      amount,
      this.web3Service.web3Info.userAddress
    );
    this.getPools();
  }

  async getUserBalanceOf(tokenAddress: string) {
    const abi = ['function balanceOf(address) public view returns (uint256)'];
    const token = new ethers.Contract(
      tokenAddress,
      abi,
      this.web3Service.web3Info.provider
    );

    const balance = await token.balanceOf(
      this.web3Service.web3Info.userAddress
    );
    return {
      walletBalance: {
        UI: commasUI(balance),
        BN: balance,
      },
    };
  }
}
