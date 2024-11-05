import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCommissionAmountIndexComponent } from './sale.component';

describe('SaleCommissionAmountIndexComponent', () => {
  let component: SaleCommissionAmountIndexComponent;
  let fixture: ComponentFixture<SaleCommissionAmountIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleCommissionAmountIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleCommissionAmountIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
