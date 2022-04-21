import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AaltoService } from 'src/app/services/aalto.service';

@Component({
  selector: 'app-staking-dialog',
  templateUrl: './staking-dialog.component.html',
  styleUrls: ['./staking-dialog.component.scss'],
})
export class StakingDialogComponent implements OnInit {
  running = false;

  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialogRef<StakingDialogComponent>,
    public readonly aalto: AaltoService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      amount: new FormControl(0, [Validators.required]),
    });
  }

  async submit() {
    this.running = true;
    const amount = this.formGroup.value.amount;
    if (amount != 0) {
      await this.aalto.increaseStake(this.data.lock, amount);
      this.dialog.close(true);
    }
  }
}
