import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presale',
  templateUrl: './presale.component.html',
  styleUrls: ['./presale.component.scss'],
})
export class PresaleComponent implements OnInit {
  pools = [
    {
      name: 'Moist BNB',
      address: '0x46b06ef72DB02535D1451Fc27F9c7E36edD669E2',
      poolId: 0,
    },
    {
      name: 'Moist UST',
      address: '0xB92ADEAc403CA2252f9a3ED6EB59a7372FBC195e',
      poolId: 1,
    },
    {
      name: 'Moist BUSD',
      address: '0x3ce45a456B45a301f92dD71B6125095770B8f88E',
      poolId: 2,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
