import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakingFormComponent } from './staking-form.component';

describe('StakingFormComponent', () => {
  let component: StakingFormComponent;
  let fixture: ComponentFixture<StakingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
