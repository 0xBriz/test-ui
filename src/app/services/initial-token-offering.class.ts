import { ethers } from 'ethers';
import { awaitTransactionComplete } from 'src/utils/web3.utils';
import { TOKEN_OFFERING_ABI } from '../abis/token-offering';

const formatUI = ethers.utils.formatEther;
const commasUI = (value) => {
  ethers.utils.commify(formatUI(value));
};

export class InitialTokenOffering {
  public readonly contract: ethers.Contract;

  pools = [
    {
      name: 'Moist UST',
      address: '0xB92ADEAc403CA2252f9a3ED6EB59a7372FBC195e',
      poolId: 0,
    },
    {
      name: 'Moist BUSD',
      address: '0x3ce45a456B45a301f92dD71B6125095770B8f88E',
      poolId: 1,
    },
    {
      name: 'Moist BNB',
      address: '0x46b06ef72DB02535D1451Fc27F9c7E36edD669E2',
      poolId: 2,
    },
  ];

  constructor(address: string, signer: ethers.Signer) {
    this.contract = new ethers.Contract(address, TOKEN_OFFERING_ABI, signer);
  }

  async depositPool(amount: ethers.BigNumber, poolId: number) {
    const tx = await this.contract.depositPool(amount, poolId);
    await awaitTransactionComplete(tx);
  }

  async getPools() {
    const poolInfos = [];
    for (const pool of this.pools) {
      const data = await this.contract.viewPoolInformation(pool.poolId);

      const info = {
        ...pool,
        ...data,
      };
      info.raisingAmountPool = formatUI(info.raisingAmountPool);
      info.offeringAmountPool = formatUI(info.offeringAmountPool);
      info.limitPerUserInLP = formatUI(info.limitPerUserInLP);
      info.totalAmountPool = formatUI(info.totalAmountPool);
      info.maxCommitRatio = formatUI(info.maxCommitRatio);
      info.sumTaxesOverflow = formatUI(info.sumTaxesOverflow);

      poolInfos.push(info);

      console.log(info);
    }

    return poolInfos;
  }
}
