import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ethers } from 'ethers';
import { AaltoService } from 'src/app/services/aalto.service';
import { DataStoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-staking-form',
  templateUrl: './staking-form.component.html',
  styleUrls: ['./staking-form.component.scss'],
})
export class StakingFormComponent implements OnInit {
  stakingGroup: FormGroup;

  constructor(
    public readonly store: DataStoreService,
    public readonly aalto: AaltoService
  ) {}

  ngOnInit() {
    this.stakingGroup = new FormGroup({
      poolId: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
    });
  }

  async doStaking() {
    console.log(this.stakingGroup.value);
    const poolId = this.stakingGroup.value.poolId;
    const amount = ethers.utils.parseEther(
      String(this.stakingGroup.value.amount)
    );
    console.log(amount);
    this.stakingGroup.reset();
    await this.aalto.stake(poolId, amount);
  }
}
