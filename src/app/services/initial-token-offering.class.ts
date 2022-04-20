import { ethers } from 'ethers';
import { awaitTransactionComplete } from 'src/utils/web3.utils';
import { TOKEN_OFFERING_ABI } from '../abis/token-offering';

export class InitialTokenOffering {
  public readonly contract: ethers.Contract;

  constructor(address: string, signer: ethers.Signer) {
    this.contract = new ethers.Contract(address, TOKEN_OFFERING_ABI, signer);
  }

  async depositPool(
    amount: ethers.BigNumber,
    poolId: number,
    referrer = ethers.constants.AddressZero
  ) {
    const tx = await this.contract.depositPool(amount, poolId, referrer);
    await awaitTransactionComplete(tx);
  }
}
