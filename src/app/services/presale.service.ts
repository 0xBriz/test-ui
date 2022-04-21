import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InitialTokenOffering } from './initial-token-offering.class';
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
          '0xd48851cc7e4f378D876f48e12E48Eda010581530',
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
}
