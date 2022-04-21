import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PresaleService } from 'src/app/services/presale.service';
import { DepositDialogComponent } from '../deposit-dialog/deposit-dialog.component';

@Component({
  selector: 'app-presale',
  templateUrl: './presale.component.html',
  styleUrls: ['./presale.component.scss'],
})
export class PresaleComponent implements OnInit {
  pools = [];

  constructor(public presale: PresaleService, public dialog: MatDialog) {}

  async ngOnInit() {}

  setDeposit(pool) {
    this.dialog.open(DepositDialogComponent, {
      data: {
        pool,
        label: 'Deposit ' + pool.name,
      },
    });
  }
}
