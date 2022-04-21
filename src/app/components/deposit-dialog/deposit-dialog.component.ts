import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PresaleService } from 'src/app/services/presale.service';

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
    public dialog: MatDialogRef<DepositDialogComponent>,
    public readonly presale: PresaleService
  ) {}

  async ngOnInit() {
    this.formGroup = new FormGroup({
      amount: new FormControl(0, [Validators.required]),
    });
    this.userBalance = await this.presale.getUserBalanceOf(
      this.data.pool.tokenAddress
    );
  }

  async submit() {
    this.running = true;
    const amount = this.formGroup.value.amount;
    console.log(amount);
    if (amount != 0) {
      await this.presale.deposit(this.data.pool, amount);
      this.dialog.close(true);
    }
  }
}
