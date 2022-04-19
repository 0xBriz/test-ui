import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { awaitTransactionComplete } from 'src/utils/web3.utils';
import { AALTO_ABI } from '../abis/aalto-abi';
import { TEST_USERS } from '../data/data';
import { AaltoUser } from '../types/app.types';
import { StakingService } from './staking.service';
import { DataStoreService } from './store.service';
import { Web3Service } from './web3.service';

@Injectable({ providedIn: 'root' })
export class AaltoService {
  contract: ethers.Contract;

  data: any = {};

  constructor(
    private readonly web3Service: Web3Service,
    private readonly stakedAalto: StakingService,
    private readonly store: DataStoreService
  ) {
    this.web3Service.web3.subscribe((info) => {
      if (info) {
        this.contract = new ethers.Contract(
          ethers.utils.getAddress('0xF633bEfd5a37847292D1C0Ea796BEe7edE9a4C8D'),
          AALTO_ABI,
          info.signer
        );

        this.setListeners();
      }
    });

    this.stakedAalto.stakeEvent.subscribe((staked) => {
      if (staked) {
        this.setUsersData();
      }
    });
  }

  async init() {
    try {
      await this.setContractData();
      await this.stakedAalto.setLockTimes();
      await this.setUsersData();
    } catch (error) {
      console.error(error);
    }
  }

  async stake(poolId: number, amount: ethers.BigNumber) {
    try {
      const tx = await this.contract.stake(poolId, amount);
      console.log(tx);
      await awaitTransactionComplete(tx);
    } catch (error) {
      console.log(error);
    }
  }

  async setContractData() {
    const [nativeLiquidityPairAddress, stableLiquidityPairAddress] =
      await Promise.all([
        this.contract.nativeLiquidityPair(),
        this.contract.stableLiquidityPair(),
      ]);

    this.store.setContracts({
      nativeLiquidityPairAddress,
      stableLiquidityPairAddress,
    });
  }

  async setUsersData() {
    const users: AaltoUser[] = [];
    for (const user of TEST_USERS) {
      const walletBalance = await this.contract.balanceOf(user.address);
      user.balance = ethers.utils.formatEther(walletBalance);
      const lockedBalance = await this.contract.lockedBalanceOf(user.address);

      const gonsPer = await this.contract.gonsPerFragment();
      const locks = await this.stakedAalto.getUserStakes(user.address, gonsPer);

      users.push({
        name: user.name,
        address: user.address,
        walletBalance: {
          BN: walletBalance,
          UI: ethers.utils.commify(ethers.utils.formatEther(walletBalance)),
        },
        locks,
        lockedBalance: ethers.utils.formatEther(lockedBalance),
      });
    }

    this.store.setUsers(users);
  }

  setListeners() {
    this.contract.on('LogRebase', () => {
      console.log('Rebase Event');
      this.init();
    });

    this.contract.on('Transfer', () => {
      console.log('Transfer Event');
      this.init();
    });
  }
}
