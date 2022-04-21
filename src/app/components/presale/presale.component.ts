import { Component, OnInit } from '@angular/core';
import { PresaleService } from 'src/app/services/presale.service';

@Component({
  selector: 'app-presale',
  templateUrl: './presale.component.html',
  styleUrls: ['./presale.component.scss'],
})
export class PresaleComponent implements OnInit {
  pools = [];

  constructor(public presale: PresaleService) {}

  async ngOnInit() {}

  setDeposit() {}
}
