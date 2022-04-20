import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakingDialogComponent } from './staking-dialog.component';

describe('StakingDialogComponent', () => {
  let component: StakingDialogComponent;
  let fixture: ComponentFixture<StakingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
