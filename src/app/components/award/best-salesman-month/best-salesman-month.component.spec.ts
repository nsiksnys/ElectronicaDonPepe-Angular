import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSalesmanMonthComponent } from './best-salesman-month.component';

describe('BestSalesmanMonthComponent', () => {
  let component: BestSalesmanMonthComponent;
  let fixture: ComponentFixture<BestSalesmanMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestSalesmanMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestSalesmanMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
