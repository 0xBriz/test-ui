import { Component, OnInit } from '@angular/core';
import { StakingService } from 'src/app/services/staking.service';

@Component({
  selector: 'app-staking-form',
  templateUrl: './staking-form.component.html',
  styleUrls: ['./staking-form.component.scss'],
})
export class StakingFormComponent implements OnInit {
  constructor(public readonly stakedAalto: StakingService) {}

  ngOnInit(): void {}
}
