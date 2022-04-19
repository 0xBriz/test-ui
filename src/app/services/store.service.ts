import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AaltoUser, AppContractData, IAppData } from '../types/app.types';

@Injectable({ providedIn: 'root' })
export class DataStoreService {
  private _appData: IAppData = {
    users: [],
    contracts: {
      nativeLiquidityPairAddress: '',
      stableLiquidityPairAddress: '',
    },
    lockTimeOptions: [],
  };

  private _data = new BehaviorSubject<IAppData>(null);

  get data(): Observable<IAppData> {
    return this._data.asObservable();
  }

  constructor() {}

  setUsers(users: AaltoUser[]) {
    this._appData.users = users;
    this._data.next(this._appData);
  }

  setContracts(contracts: AppContractData) {
    this._appData.contracts = contracts;
    this._data.next(this._appData);
  }

  setLockTimeOptions(contracts: AppContractData) {
    this._appData.contracts = contracts;
    this._data.next(this._appData);
  }
}
