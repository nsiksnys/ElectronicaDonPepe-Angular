import { ComponentFixture, TestBed } from '@angular/core/testing';

import { saleCommissionAmountComponent } from './sale.component';

describe('saleCommissionAmountComponent', () => {
  let component: saleCommissionAmountComponent;
  let fixture: ComponentFixture<saleCommissionAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [saleCommissionAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(saleCommissionAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
