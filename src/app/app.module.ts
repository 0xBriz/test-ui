import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { StakingFormComponent } from './components/staking-form/staking-form.component';
import { StakingDialogComponent } from './components/staking-dialog/staking-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { PresaleComponent } from './components/presale/presale.component';
import { StakingComponent } from './components/staking/staking.component';
import { RouterModule } from '@angular/router';
import { CreatePoolComponent } from './components/create-pool/create-pool.component';
import { DepositDialogComponent } from './components/deposit-dialog/deposit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StakingFormComponent,
    StakingDialogComponent,
    ErrorDialogComponent,
    PresaleComponent,
    StakingComponent,
    CreatePoolComponent,
    DepositDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'presale',
        pathMatch: 'full',
      },
      {
        path: 'staking',
        component: StakingComponent,
      },
      {
        path: 'presale',
        component: PresaleComponent,
      },
      {
        path: '**',
        redirectTo: 'staking',
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
