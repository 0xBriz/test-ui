import { Component } from '@angular/core';
import { AaltoService } from './services/aalto.service';
import { StakingService } from './services/staking.service';
import { DataStoreService } from './services/store.service';
import { Web3Service } from './services/web3.service';
import { UserLockRecord } from './types/app.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  staking = false;

  constructor(
    public readonly web3Service: Web3Service,
    public readonly aalto: AaltoService,
    public readonly stakedAalto: StakingService,
    public readonly store: DataStoreService
  ) {
    this.web3Service.web3.subscribe(async (info) => {
      if (info) {
        await this.aalto.init();
      }
    });
  }

  async doIncreaseStake(lock: UserLockRecord) {}
}
