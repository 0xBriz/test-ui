import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deposit-dialog',
  templateUrl: './deposit-dialog.component.html',
  styleUrls: ['./deposit-dialog.component.scss'],
})
export class DepositDialogComponent implements OnInit {
  running = false;
  formGroup: FormGroup;
  userBalance: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialogRef<DepositDialogComponent>
  ) {}

  async ngOnInit() {
    this.formGroup = new FormGroup({
      amount: new FormControl(0, [Validators.required]),
    });
    this.userBalance = await this.data.presale.getUserBalanceOf(
      this.data.pool.tokenAddress
    );
  }

  async submit() {
    this.running = true;
    const amount = this.formGroup.value.amount;
    console.log(amount);
    if (amount != 0) {
      await this.data.presale.deposit(this.data.pool, amount);
      this.dialog.close(true);
    }
  }
}
