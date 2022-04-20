export const TOKEN_OFFERING_ABI = [
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_numberPools',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_startBlockFromNow',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endBlockFromNow',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_protocolTokenAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'AdminWithdraw',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'pid',
        type: 'uint8',
      },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'userFund',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: '_pid',
        type: 'uint8',
      },
    ],
    name: 'EmergencyRefund',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'EmergencyTokenWithdraw',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'offeringAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'excessAmount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'pid',
        type: 'uint8',
      },
    ],
    name: 'Harvest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startBlock',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endBlock',
        type: 'uint256',
      },
    ],
    name: 'NewStartAndEndBlocks',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'offeringAmountPool',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'raisingAmountPool',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'pid',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'lpToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'hasTax',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'hasWhitelist',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isStopDeposit',
        type: 'bool',
      },
    ],
    name: 'PoolParametersSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'commissionAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'ReferralCommissionPaid',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
    ],
    name: 'ReferralRecorded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MAXIMUM_REFERRAL_COMMISSION_RATE',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'purchasers',
        type: 'address[]',
      },
      {
        internalType: 'uint8',
        name: '_zone',
        type: 'uint8',
      },
    ],
    name: 'addToWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_purchaser',
        type: 'address',
      },
    ],
    name: 'deleteFromWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_pid',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: '_referrer',
        type: 'address',
      },
    ],
    name: 'depositPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_pid',
        type: 'uint8',
      },
    ],
    name: 'emergencyRefund',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'emergencyTokenWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'endBlock',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'endSale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'finalWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getReferrer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_purchaser',
        type: 'address',
      },
    ],
    name: 'getWhitelistedZone',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_pid',
        type: 'uint8',
      },
    ],
    name: 'harvestPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isEmergencyRefund',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_purchaser',
        type: 'address',
      },
    ],
    name: 'isWhitelisted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_purchaser',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: '_zone',
        type: 'uint8',
      },
    ],
    name: 'joinWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numberPools',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'offeringToken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'protocolToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'referralCommissionRate',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'referralsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'referrers',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'setEmergencyRefund',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_numberPools',
        type: 'uint8',
      },
    ],
    name: 'setNumberPools',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: '_offeringToken',
        type: 'address',
      },
    ],
    name: 'setOfferingToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_offeringAmountPool',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_raisingAmountPool',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_limitPerUserInLP',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_maxCommitRatio',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_minProtocolToJoin',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_pid',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: '_lpToken',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_hasTax',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '_hasWhitelist',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '_isStopDeposit',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '_hasOverflow',
        type: 'bool',
      },
    ],
    name: 'setPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'setProtocolToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '_referralCommissionRate',
        type: 'uint16',
      },
    ],
    name: 'setReferralCommissionRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'startBlock',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'startSale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_status',
        type: 'bool',
      },
    ],
    name: 'startWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_pid',
        type: 'uint8',
      },
      {
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'stopDepositPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_startBlock',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endBlock',
        type: 'uint256',
      },
    ],
    name: 'updateStartAndEndBlocks',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_pid',
        type: 'uint8',
      },
    ],
    name: 'viewPoolInformation',
    outputs: [
      {
        internalType: 'uint256',
        name: 'raisingAmountPool',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'offeringAmountPool',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'limitPerUserInLP',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxCommitRatio',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minProtocolToJoin',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalAmountPool',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'sumTaxesOverflow',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'lpToken',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'hasTax',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'hasWhitelist',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'isStopDeposit',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'hasOverflow',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_pid',
        type: 'uint8',
      },
    ],
    name: 'viewPoolTaxRateOverflow',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'uint8[]',
        name: '_pids',
        type: 'uint8[]',
      },
    ],
    name: 'viewUserAllocationPools',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'uint8[]',
        name: '_pids',
        type: 'uint8[]',
      },
    ],
    name: 'viewUserInfo',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'bool[]',
        name: '',
        type: 'bool[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'uint8[]',
        name: '_pids',
        type: 'uint8[]',
      },
    ],
    name: 'viewUserOfferingAndRefundingAmountsForPools',
    outputs: [
      {
        internalType: 'uint256[3][]',
        name: '',
        type: 'uint256[3][]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'whitelist',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
