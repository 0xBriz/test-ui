import { ethers } from 'ethers';
import { awaitTransactionComplete } from 'src/utils/web3.utils';
import { TOKEN_OFFERING_ABI } from '../abis/token-offering';

const formatUI = ethers.utils.formatEther;
const commasUI = (value) => {
  return ethers.utils.commify(formatUI(value));
};

const limitPerUserInLP = ethers.utils.parseEther('750');
const minProtocolToJoin = ethers.utils.parseEther('0');
const maxCommitRatio = ethers.utils.parseEther('0');
const hasTax = false;
const isStopDeposit = false;
const hasOverflow = true;

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

      info.raisingAmountPool = commasUI(info.raisingAmountPool);
      info.offeringAmountPool = commasUI(info.offeringAmountPool);
      info.limitPerUserInLP = commasUI(info.limitPerUserInLP);
      info.totalAmountPool = commasUI(info.totalAmountPool);
      info.maxCommitRatio = formatUI(info.maxCommitRatio);
      info.sumTaxesOverflow = commasUI(info.sumTaxesOverflow);

      poolInfos.push(info);
    }

    return poolInfos;
  }
}
