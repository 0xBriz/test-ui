import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StakingDialogComponent } from './components/staking-dialog/staking-dialog.component';
import { AaltoService } from './services/aalto.service';
import { StakingService } from './services/staking.service';
import { DataStoreService } from './services/store.service';
import { Web3Service } from './services/web3.service';
import { AaltoUser, UserLockRecord } from './types/app.types';

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
    public readonly store: DataStoreService,
    public dialog: MatDialog
  ) {
    this.web3Service.web3.subscribe(async (info) => {
      if (info) {
        await this.aalto.init();
      }
    });
  }

  async doIncreaseStake(user: AaltoUser, lock: UserLockRecord) {
    const pools = this.store.getLockTimeOptions();
    const pool = pools.find((p) => p.poolId === lock.poolId);
    const dialogRef = this.dialog.open(StakingDialogComponent, {
      data: {
        lock,
        label: 'Increase Stake',
        pool,
        user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.aalto.setUsersData();
      }
    });
  }

  async doWithdraw(user: AaltoUser, lock: UserLockRecord) {
    await this.aalto.withdraw(lock.poolId);
  }
}
