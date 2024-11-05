import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCommissionIndexComponent } from './product.component';

describe('ProductCommissionIndexComponent', () => {
  let component: ProductCommissionIndexComponent;
  let fixture: ComponentFixture<ProductCommissionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCommissionIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCommissionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
