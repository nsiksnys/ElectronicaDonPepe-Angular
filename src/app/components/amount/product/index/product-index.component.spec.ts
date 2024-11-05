import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCommissionAmountIndexComponent } from './product.component';

describe('ProductCommissionAmountIndexComponent', () => {
  let component: ProductCommissionAmountIndexComponent;
  let fixture: ComponentFixture<ProductCommissionAmountIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCommissionAmountIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCommissionAmountIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
