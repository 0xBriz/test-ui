import { Injectable } from '@angular/core';
import { InitialTokenOffering } from './initial-token-offering.class';
import { Web3Service } from './web3.service';

@Injectable({ providedIn: 'root' })
export class AaltoService {
  contract: InitialTokenOffering;

  constructor(private readonly web3Service: Web3Service) {
    this.web3Service.web3.subscribe((info) => {
      if (info) {
        this.contract = new InitialTokenOffering('', info.signer);
      }
    });
  }

  async getPools() {}
}
