import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardAmountIndexComponent } from './award.component';

describe('AwardAmountIndexComponent', () => {
  let component: AwardAmountIndexComponent;
  let fixture: ComponentFixture<AwardAmountIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwardAmountIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardAmountIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
