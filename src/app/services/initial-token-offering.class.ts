import { ethers } from 'ethers';

const formatUI = ethers.utils.formatEther;
export const commasUI = (value) => {
  return ethers.utils.commify(formatUI(value));
};

export class InitialTokenOffering {
  public readonly contract: ethers.Contract;
  public readonly UST: ethers.Contract;
  public readonly BUSD: ethers.Contract;

  // For test UI shit
  treasuryInfo: any = {
    treasuryAddress: '',
    balanceUST: 0,
    balanceBUSD: 0,
  };

  pools: any[] = [
    {
      name: 'Moist UST',
      symbol: 'MUST',
      tokenAddress: '0xB92ADEAc403CA2252f9a3ED6EB59a7372FBC195e',
      poolId: 0,
    },
    {
      name: 'Moist BUSD',
      symbol: 'MBUSD',
      tokenAddress: '0x3ce45a456B45a301f92dD71B6125095770B8f88E',
      poolId: 1,
    },
    {
      name: 'Moist UST',
      symbol: 'MUST',
      tokenAddress: '0xB92ADEAc403CA2252f9a3ED6EB59a7372FBC195e',
      poolId: 2,
    },
    {
      name: 'Moist BUSD',
      symbol: 'MBUSD',
      tokenAddress: '0x3ce45a456B45a301f92dD71B6125095770B8f88E',
      poolId: 3,
    },
  ];

  constructor(
    private signer: ethers.Signer,
    private provider: ethers.providers.JsonRpcProvider,
    private currentUserAddress: string
  ) {
    /**
     *
     * HARD CODED FOR NOW -> ADD CORRECT ADDRESSES
     *
     */
    this.contract = new ethers.Contract(
      '0xAdF1E9cE59304Ec04C048365f1463A7d673a1d79',
      TOKEN_OFFERING_ABI,
      signer
    );

    this.UST = new ethers.Contract(
      '0xB92ADEAc403CA2252f9a3ED6EB59a7372FBC195e',
      TOKEN_OFFERING_ABI,
      signer
    );

    this.BUSD = new ethers.Contract(
      '0x3ce45a456B45a301f92dD71B6125095770B8f88E',
      TOKEN_OFFERING_ABI,
      signer
    );
  }

  async startSale() {
    try {
      // Will fail if not an admin
      // Has to be a block number lower than the current value of `startBlock` in the contract
      //  `startBlock` is set to 1 day from moment of deployment in contract constructor
      const tx = await this.contract.startSale();
      await awaitTransactionComplete(tx);
    } catch (error) {
      throw error;
    }
  }

  async endSale() {
    try {
      // Will fail if not an admin
      // Sets the `endBlock` in the contract to the current block number
      const tx = await this.contract.endSale();
      await awaitTransactionComplete(tx);
    } catch (error) {
      throw error;
    }
  }

  async finalWithdraw() {
    try {
      // Will fail if not an admin
      // Withdraws all LP token deposits to the treasury
      const tx = await this.contract.finalWithdraw();
      await awaitTransactionComplete(tx);
    } catch (error) {
      throw error;
    }
  }

  async setTreasuryInfo() {
    // try {
    //   const [treasuryAddress] = await Promise.all([
    //     this.contract.treasury(),
    //     this.UST.balanceOf(),
    //   ]);
    //   this.treasuryInfo.treasuryAddress = treasuryAddress;
    //   const [ustBalance, busdBalance] = await Promise.all([
    //     this.UST.balanceOf(),
    //     this.BUSD.balanceOf(),
    //   ]);
    //   this.treasuryInfo.balanceUST = commasUI(ustBalance);
    //   this.treasuryInfo.balanceBUSD = commasUI(busdBalance);
    // } catch (error) {
    //   throw error;
    // }
  }

  async depositPool(pool, amount: number) {
    try {
      const amountBN = ethers.utils.parseEther(String(amount));
      await this.approveIfNeeded(pool, amountBN);
      const tx = await this.contract.depositPool(amountBN, pool.poolId);
      await awaitTransactionComplete(tx);
    } catch (error) {
      throw error;
    }
  }

  async getPools() {
    try {
      const poolInfos = [];
      for (const pool of this.pools) {
        const data = await this.contract.viewPoolInformation(pool.poolId);

        const info = {
          ...pool,
          ...data,
        };

        info.raisingAmountPool = commasUI(info.raisingAmountPool);
        info.offeringAmountPool = commasUI(info.offeringAmountPool);
        info.limitPerUserInLP = commasUI(info.limitPerUserInLP);
        info.totalAmountPool = commasUI(info.totalAmountPool);

        poolInfos.push(info);
      }
      this.pools = poolInfos;
      // await this.setTreasuryInfo();
    } catch (error) {
      throw error;
    }
  }

  async viewUserAllocationPools(user: string, poolIds: number[]) {
    try {
      const data = await this.contract.viewUserAllocationPools(user, poolIds);
      return {
        amountPools: data.amountPools,
        statusPools: data.statusPools,
      };
    } catch (error) {
      throw error;
    }
  }

  async claimTokens() {
    try {
    } catch (error) {
      throw error;
    }
  }

  async getUserBalanceOf(tokenAddress: string) {
    try {
      const token = new ethers.Contract(tokenAddress, ERC20_ABI, this.provider);
      const balance = await token.balanceOf(this.currentUserAddress);
      return {
        walletBalance: {
          UI: commasUI(balance),
          BN: balance,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  private async approveIfNeeded(pool, amount) {
    try {
      const poolToken = this.pools.find(
        (p) => p.tokenAddress == pool.tokenAddress
      );

      const token = new ethers.Contract(
        poolToken.tokenAddress,
        ERC20_ABI,
        this.signer
      );

      const allowance = await token.allowance(
        this.currentUserAddress,
        this.contract.address
      );

      if (allowance.lt(amount)) {
        const tx = await token.approve(
          this.contract.address,
          ethers.constants.MaxUint256
        );
        await awaitTransactionComplete(tx);
      }
    } catch (error) {
      throw error;
    }
  }
}

export async function awaitTransactionComplete(
  txResponse: ethers.ContractTransaction,
  confirmations = 1
) {
  try {
    console.log(`- Starting transaction: ${txResponse.hash}`);
    console.log(
      `- Awaiting transaction receipt... - ` + new Date().toLocaleString()
    );
    const txReceipt = await txResponse.wait(confirmations);
    console.log(
      '- TransactionReceipt received - ' + new Date().toLocaleString()
    );
    if (txReceipt.status === 1) {
      // success
      console.log(`Transaction successful`);
    }
    return txReceipt;
  } catch (error) {
    throw error; // Throw and try to let this be handled back in the call stack as needed
  }
}

const ERC20_ABI = [
  'function balanceOf(address) public view returns (uint256)',
  'function approve(address, uint256) public returns (bool)',
  'function allowance(address, address) public view returns (uint256)',
];

// prettier-ignore
const TOKEN_OFFERING_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_numberPools",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "_offeringTokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_treasuryAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "AdminWithdraw",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint8",
        "name": "pid",
        "type": "uint8"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "userFund",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint8",
        "name": "_pid",
        "type": "uint8"
      }
    ],
    "name": "EmergencyRefund",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "EmergencyTokenWithdraw",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "offeringAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "excessAmount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint8",
        "name": "pid",
        "type": "uint8"
      }
    ],
    "name": "Harvest",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startBlock",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "endBlock",
        "type": "uint256"
      }
    ],
    "name": "NewStartAndEndBlocks",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "offeringAmountPool",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "raisingAmountPool",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "pid",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "lpToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "hasWhitelist",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isStopDeposit",
        "type": "bool"
      }
    ],
    "name": "PoolParametersSet",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "purchasers",
        "type": "address[]"
      },
      {
        "internalType": "uint8",
        "name": "_zone",
        "type": "uint8"
      }
    ],
    "name": "addToWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_purchaser",
        "type": "address"
      }
    ],
    "name": "deleteFromWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "_pid",
        "type": "uint8"
      }
    ],
    "name": "depositPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_pid",
        "type": "uint8"
      }
    ],
    "name": "emergencyRefund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "emergencyTokenWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endBlock",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "finalWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_purchaser",
        "type": "address"
      }
    ],
    "name": "getWhitelistedZone",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_pid",
        "type": "uint8"
      }
    ],
    "name": "harvestPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isEmergencyRefund",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_purchaser",
        "type": "address"
      }
    ],
    "name": "isWhitelisted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_purchaser",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "_zone",
        "type": "uint8"
      }
    ],
    "name": "joinWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "numberPools",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "offeringToken",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "setEmergencyRefund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "value",
        "type": "bool"
      }
    ],
    "name": "setManager",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_numberPools",
        "type": "uint8"
      }
    ],
    "name": "setNumberPools",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_offeringToken",
        "type": "address"
      }
    ],
    "name": "setOfferingToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_offeringAmountPool",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_raisingAmountPool",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_limitPerUserInLP",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "_pid",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "_lpToken",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_hasWhitelist",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "_isStopDeposit",
        "type": "bool"
      }
    ],
    "name": "setPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_treasuryAddress",
        "type": "address"
      }
    ],
    "name": "setTreasury",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startBlock",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_status",
        "type": "bool"
      }
    ],
    "name": "startWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_pid",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "stopDepositPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "treasury",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_startBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_endBlock",
        "type": "uint256"
      }
    ],
    "name": "updateStartAndEndBlocks",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_pid",
        "type": "uint8"
      }
    ],
    "name": "viewPoolInformation",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "raisingAmountPool",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "offeringAmountPool",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "limitPerUserInLP",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalAmountPool",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "lpToken",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "hasWhitelist",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isStopDeposit",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint8[]",
        "name": "_pids",
        "type": "uint8[]"
      }
    ],
    "name": "viewUserAllocationPools",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint8[]",
        "name": "_pids",
        "type": "uint8[]"
      }
    ],
    "name": "viewUserInfo",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "bool[]",
        "name": "",
        "type": "bool[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint8[]",
        "name": "_pids",
        "type": "uint8[]"
      }
    ],
    "name": "viewUserOfferingAndRefundingAmountsForPools",
    "outputs": [
      {
        "internalType": "uint256[2][]",
        "name": "",
        "type": "uint256[2][]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "whitelist",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
