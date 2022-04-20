import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AaltoService } from 'src/app/services/aalto.service';
import { StakingService } from 'src/app/services/staking.service';
import { DataStoreService } from 'src/app/services/store.service';
import { Web3Service } from 'src/app/services/web3.service';
import { AaltoUser, UserLockRecord } from 'src/app/types/app.types';
import { StakingDialogComponent } from '../staking-dialog/staking-dialog.component';

@Component({
  selector: 'app-staking',
  templateUrl: './staking.component.html',
  styleUrls: ['./staking.component.scss'],
})
export class StakingComponent {
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
