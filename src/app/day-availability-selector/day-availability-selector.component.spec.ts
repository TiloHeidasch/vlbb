import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAvailabilitySelectorComponent } from './day-availability-selector.component';

describe('DayAvailabilitySelectorComponent', () => {
  let component: DayAvailabilitySelectorComponent;
  let fixture: ComponentFixture<DayAvailabilitySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayAvailabilitySelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayAvailabilitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
