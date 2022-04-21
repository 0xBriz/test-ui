import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-pool',
  templateUrl: './create-pool.component.html',
  styleUrls: ['./create-pool.component.scss'],
})
export class CreatePoolComponent implements OnInit {
  createGroup: FormGroup;

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

  // uint256 _offeringAmountPool,
  // uint256 _raisingAmountPool,
  // uint256 _limitPerUserInLP,
  // uint256 _maxCommitRatio,
  // uint256 _minProtocolToJoin,
  // uint8 _pid,
  // address _lpToken,
  // bool _hasTax,
  // bool _hasWhitelist,
  // bool _isStopDeposit,
  // bool _hasOverflow

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createGroup = this.fb.group({
      raisingAmountPool: this.fb.control(0),
      offeringAmountPool: this.fb.control(0),
      limitPerUserInLP: this.fb.control(0),
      maxCommitRatio: this.fb.control(0),
      minProtocolToJoin: this.fb.control(0),
      totalAmountPool: this.fb.control(0),
      sumTaxesOverflow: this.fb.control(0),
      lpToken: this.fb.control(0), // Must be one of three test tokens
      hasTax: this.fb.control(0),
      isStopDeposit: this.fb.control(false),
      hasOverflow: this.fb.control(0),
    });
  }
}
