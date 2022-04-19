import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { STAKED_AALTO_ABI } from '../abis/staked-aalto-abi';
import { ILockPool, IStakingInput, UserLockRecord } from '../types/app.types';
import { Web3Service } from './web3.service';

@Injectable({ providedIn: 'root' })
export class StakingService {
  contract: ethers.Contract;
  lockPools: ILockPool[];

  constructor(private readonly web3Service: Web3Service) {
    this.web3Service.web3.subscribe((info) => {
      if (info) {
        this.contract = new ethers.Contract(
          ethers.utils.getAddress('0xEf1f91Af946A5ebb4A333aE09b338618028ED4A7'),
          STAKED_AALTO_ABI,
          info.signer
        );

        this.setData();
      }
    });
  }

  async setData() {
    const [lockOptions] = await Promise.all([
      this.contract.getLockTimeOptions(),
    ]);

    const options = [];
    lockOptions.forEach((lockTime, idx) => {
      const lockDays = lockTime.toNumber() / 60 / 60 / 24;
      options.push({
        poolId: idx,
        label: lockDays + ' days',
        value: lockTime,
      });
    });

    this.lockPools = options;
  }

  async getUserStakes(
    user: string,
    gonsPer: ethers.BigNumber
  ): Promise<UserLockRecord[]> {
    const pools = [
      {
        poolId: 6,
      },
    ];

    const userLocks: UserLockRecord[] = [];
    for (const pool of pools) {
      const userRecord: UserLockRecord = await this.contract.userPools(
        user,
        pool.poolId
      );

      const record: UserLockRecord = {
        ...userRecord,
      };

      console.log(record);
      const lockedBalance = await this.contract.balanceOf(user);
      record.amountLocked = ethers.utils.commify(
        ethers.utils.formatEther(lockedBalance.div(gonsPer))
      );

      record.endTime =
        (userRecord.endTime - userRecord.startTime) / 60 / 60 / 24;

      if (userRecord.endTime != 0) {
        record.startTimeDate = new Date(
          userRecord.startTime * 1000
        ).toUTCString();
      }

      userLocks.push(record);
    }

    return userLocks;
  }

  async stake(input: IStakingInput) {
    //
  }
}
