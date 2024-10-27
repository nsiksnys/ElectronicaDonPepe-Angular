import { ComponentFixture, TestBed } from '@angular/core/testing';

import { awardAmountComponent } from './award.component';

describe('awardAmountComponent', () => {
  let component: awardAmountComponent;
  let fixture: ComponentFixture<awardAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [awardAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(awardAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
