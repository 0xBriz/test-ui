//   struct PoolCharacteristics {
//     uint256 raisingAmountPool; // amount of tokens raised for the pool (in LP tokens)
//     uint256 offeringAmountPool; // amount of tokens offered for the pool (in offeringTokens)
//     uint256 limitPerUserInLP; // limit of tokens per user (if 0, it is ignored)
//     uint256 maxCommitRatio; // max commit base on protocol token holding
//     uint256 minProtocolToJoin; // Can zero these out
//     uint256 totalAmountPool; // total amount pool deposited (in LP tokens)
//     uint256 sumTaxesOverflow; // total taxes collected (starts at 0, increases with each harvest if overflow)
//     address lpToken; // lp token for this pool
//     bool hasTax; // tax on the overflow (if any, it works with _calculateTaxOverflow)
//     bool hasWhitelist; // only for whitelist
//     bool isStopDeposit;
//     bool hasOverflow; // Can deposit overflow
// }

import { ethers } from 'ethers';

export interface IPresalePool {
  raisingAmount: ethers.BigNumber;
}
