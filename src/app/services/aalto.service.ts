import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ethers } from 'ethers';
import { awaitTransactionComplete } from 'src/utils/web3.utils';
import { AALTO_ABI } from '../abis/aalto-abi';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { TEST_USERS } from '../data/data';
import { AaltoUser, UserLockRecord } from '../types/app.types';
import { StakingService } from './staking.service';
import { DataStoreService } from './store.service';
import { Web3Service } from './web3.service';

@Injectable({ providedIn: 'root' })
export class AaltoService {
  contract: ethers.Contract;

  constructor(
    private readonly web3Service: Web3Service,
    private readonly stakedAalto: StakingService,
    private readonly store: DataStoreService,
    private dialog: MatDialog
  ) {
    this.web3Service.web3.subscribe((info) => {
      if (info) {
        this.contract = new ethers.Contract(
          ethers.utils.getAddress('0xa592C04690d83005CEA235333c80A818D3a8ee95'),
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

    this.stakedAalto.increaseStakeEvent.subscribe((staked) => {
      if (staked) {
        this.setUsersData();
      }
    });
  }

  async init() {
    try {
      await this.setTokenInfo();
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
      await awaitTransactionComplete(tx);
      await this.setUsersData();
    } catch (error) {
      console.log(error.data.message);
      this.error(error.data.message);
    }
  }

  async increaseStake(lock: UserLockRecord, amount: number) {
    try {
      const amountBN = ethers.utils.parseEther(String(amount));
      const tx = await this.contract.increaseStakeInCurrentPool(
        lock.poolId,
        amountBN
      );
      await awaitTransactionComplete(tx);
    } catch (error) {
      this.error(error.data.message);
    }
  }

  async withdraw(poolId: number) {
    try {
      const tx = await this.contract.withdrawStaking(poolId);
      await awaitTransactionComplete(tx);
    } catch (error) {
      console.log(error);
      // this.error(error.data.message);
    }
  }

  async setTokenInfo() {
    const [circulating, total, max, dead] = await Promise.all([
      this.contract.getCirculatingSupply(),
      this.contract.totalSupply(),
      this.contract.maxSupply(),
      this.contract.balanceOf('0x000000000000000000000000000000000000dEaD'),
    ]);

    this.store.setTokenInfo({
      circulating: ethers.utils.commify(ethers.utils.formatEther(circulating)),
      total: ethers.utils.commify(ethers.utils.formatEther(total)),
      max: ethers.utils.commify(ethers.utils.formatEther(max)),
      burned: ethers.utils.commify(ethers.utils.formatEther(dead)),
    });
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

  private error(error) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        error,
      },
    });
  }
}
