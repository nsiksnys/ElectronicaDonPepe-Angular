import { ComponentFixture, TestBed } from '@angular/core/testing';

import { productCommissionAmountComponent } from './product.component';

describe('productCommissionAmountComponent', () => {
  let component: productCommissionAmountComponent;
  let fixture: ComponentFixture<productCommissionAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [productCommissionAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(productCommissionAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
