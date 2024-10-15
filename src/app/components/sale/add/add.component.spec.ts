import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleAddComponent } from './add.component';

describe('SaleAddComponent', () => {
  let component: SaleAddComponent;
  let fixture: ComponentFixture<SaleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
