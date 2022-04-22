import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InitialTokenOffering } from 'src/app/services/initial-token-offering.class';
import { Web3Service } from 'src/app/services/web3.service';
import { DepositDialogComponent } from '../deposit-dialog/deposit-dialog.component';

@Component({
  selector: 'app-presale',
  templateUrl: './presale.component.html',
  styleUrls: ['./presale.component.scss'],
})
export class PresaleComponent {
  presale: InitialTokenOffering;

  constructor(public dialog: MatDialog, private web3: Web3Service) {
    this.web3.web3.subscribe((info) => {
      if (info) {
        this.presale = new InitialTokenOffering(
          this.web3.web3Info.signer,
          this.web3.web3Info.provider,
          this.web3.web3Info.userAddress
        );
        this.presale.getPools();
      }
    });
  }

  setDeposit(pool) {
    this.dialog.open(DepositDialogComponent, {
      data: {
        pool,
        label: 'Deposit ' + pool.name,
        presale: this.presale,
      },
    });
  }
}
