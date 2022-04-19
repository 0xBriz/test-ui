import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { AALTO_ABI } from '../abis/aalto-abi';
import { TEST_USERS } from '../data/data';
import { Web3Service } from './web3.service';

@Injectable({ providedIn: 'root' })
export class AaltoService {
  contract: ethers.Contract;

  data: any = {};

  constructor(private readonly web3Service: Web3Service) {
    this.web3Service.web3.subscribe((info) => {
      if (info) {
        console.log(info);
        this.contract = new ethers.Contract(
          ethers.utils.getAddress('0xF633bEfd5a37847292D1C0Ea796BEe7edE9a4C8D'),
          AALTO_ABI,
          info.signer
        );

        this.setListeners();
        this.setContractData();
      }
    });
  }

  async setContractData() {
    const [nativeLiquidityPairAddress, stableLiquidityPairAddress] =
      await Promise.all([
        this.contract.nativeLiquidityPair(),
        this.contract.stableLiquidityPair(),
      ]);

    this.data = {
      nativeLiquidityPairAddress,
      stableLiquidityPairAddress,
    };

    console.log(this.data);
  }

  async getUsersData() {
    const balance = await this.contract.balanceOf(
      this.web3Service.web3Info.userAddress
    );
    console.log(ethers.utils.formatEther(balance));

    for (const user of TEST_USERS) {
      const balance = await this.contract.balanceOf(user.address);
      user.balance = ethers.utils.formatEther(balance);
    }
  }

  // async fundUsers(amount = ethers.utils.parseEther('100')) {
  //   await this.contract.giveTestUsersFunds(
  //     TEST_USERS.map((u) => u.address),
  //     amount
  //   );
  // }

  setListeners() {
    this.contract.on('LogRebase', () => {
      console.log('Rebase Event');
      this.getUsersData();
    });

    this.contract.on('Transfer', () => {
      console.log('Transfer Event');
      this.getUsersData();
    });
  }
}
