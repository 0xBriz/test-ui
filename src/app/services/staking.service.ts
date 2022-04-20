import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import { STAKED_AALTO_ABI } from '../abis/staked-aalto-abi';
import { LockTime, UserLockRecord } from '../types/app.types';
import { DataStoreService } from './store.service';
import { Web3Service } from './web3.service';

@Injectable({ providedIn: 'root' })
export class StakingService {
  contract: ethers.Contract;

  private _stake = new BehaviorSubject<boolean>(false);
  get stakeEvent() {
    return this._stake.asObservable();
  }

  private _increaseStake = new BehaviorSubject<boolean>(false);
  get increaseStakeEvent() {
    return this._increaseStake.asObservable();
  }

  constructor(
    private readonly web3Service: Web3Service,
    private readonly store: DataStoreService
  ) {
    this.web3Service.web3.subscribe((info) => {
      if (info) {
        this.contract = new ethers.Contract(
          ethers.utils.getAddress('0xC7920EBed0dD27FE71B5591993C4cCC47a753f82'),
          STAKED_AALTO_ABI,
          info.signer
        );
      }
    });
  }

  async setLockTimes() {
    const [lockOptions] = await Promise.all([
      this.contract.getLockTimeOptions(),
    ]);

    const options: LockTime[] = [];
    lockOptions.forEach((lockTime, idx) => {
      const lockDays = lockTime.toNumber() / 60 / 60 / 24;
      options.push({
        poolId: idx,
        label: lockDays + ' days',
        value: lockTime,
      });
    });

    this.store.setLockTimeOptions(options);
  }

  async getUserStakes(
    user: string,
    gonsPer: ethers.BigNumber
  ): Promise<UserLockRecord[]> {
    const pools = this.store.getLockTimeOptions();

    const userLocks: UserLockRecord[] = [];
    for (const pool of pools) {
      const userRecord = await this.contract.userPools(user, pool.poolId);

      if (userRecord.endTime == 0) {
        continue;
      }

      const record: UserLockRecord = {
        ...userRecord,
      };

      record.poolId = userRecord.poolId.toNumber();
      record.amountLocked = ethers.utils.commify(
        ethers.utils.formatEther(userRecord.amountLocked.div(gonsPer))
      );

      record.endTime =
        (userRecord.endTime - userRecord.startTime) / 60 / 60 / 24;

      record.startTimeDate = new Date(
        userRecord.startTime * 1000
      ).toUTCString();

      userLocks.push(record);
    }

    return userLocks;
  }

  setListeners() {
    this.contract.on('Stake', () => {
      console.log('Stake Event');
      this._stake.next(true);
    });

    this.contract.on('IncreaseStake', () => {
      console.log('IncreaseStake Event');
      this._increaseStake.next(true);
    });
  }
}
