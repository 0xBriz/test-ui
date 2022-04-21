import { ethers } from 'ethers';
import { awaitTransactionComplete } from 'src/utils/web3.utils';
import { TOKEN_OFFERING_ABI } from '../abis/token-offering';

const formatUI = ethers.utils.formatEther;
export const commasUI = (value) => {
  return ethers.utils.commify(formatUI(value));
};

export class InitialTokenOffering {
  public readonly contract: ethers.Contract;

  pools = [
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

  constructor(private address: string, private signer: ethers.Signer) {
    this.contract = new ethers.Contract(
      this.address,
      TOKEN_OFFERING_ABI,
      signer
    );
  }

  async depositPool(pool, amount: number, user: string) {
    try {
      const amountBN = ethers.utils.parseEther(String(amount));
      await this.approveIfNeeded(pool, amountBN, user);
      const tx = await this.contract.depositPool(amountBN, pool.poolId);
      await awaitTransactionComplete(tx);
    } catch (error) {
      console.log(error);
    }
  }

  private async approveIfNeeded(pool, amount, user: string) {
    const abi = [
      'function approve(address, uint256) public returns (bool)',
      'function allowance(address, address) public view returns (uint256)',
    ];

    const poolToken = this.pools.find(
      (p) => p.tokenAddress == pool.tokenAddress
    );

    const token = new ethers.Contract(poolToken.tokenAddress, abi, this.signer);

    const allowOne = await token.allowance(user, this.address);
    if (allowOne.lt(amount)) {
      const tx = await token.approve(this.address, ethers.constants.MaxUint256);
      await awaitTransactionComplete(tx);
    }
  }

  async getPools() {
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

    return poolInfos;
  }
}
