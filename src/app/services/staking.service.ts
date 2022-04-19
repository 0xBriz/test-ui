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

  constructor(
    private readonly web3Service: Web3Service,
    private readonly store: DataStoreService
  ) {
    this.web3Service.web3.subscribe((info) => {
      if (info) {
        this.contract = new ethers.Contract(
          ethers.utils.getAddress('0xEf1f91Af946A5ebb4A333aE09b338618028ED4A7'),
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
  }
}