import { Component } from '@angular/core';
import { TEST_USERS } from './data/data';
import { AaltoService } from './services/aalto.service';
import { StakingService } from './services/staking.service';
import { Web3Service } from './services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data: any = {
    nativeLiquidityPairAddress: '',
  };

  users = TEST_USERS;

  staking = false;

  constructor(
    public readonly web3Service: Web3Service,
    public readonly aalto: AaltoService,
    public readonly stakedAalto: StakingService
  ) {
    this.web3Service.web3.subscribe(async (info) => {
      if (info) {
        console.log(info);
        const shit = await this.aalto.getUsersData();
        //console.log(await this.aalto.contract.owner());
      }
    });
  }
}
