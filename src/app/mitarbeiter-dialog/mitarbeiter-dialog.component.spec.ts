import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitarbeiterDialogComponent } from './mitarbeiter-dialog.component';

describe('CreateMitarbeiterDialogComponent', () => {
  let component: MitarbeiterDialogComponent;
  let fixture: ComponentFixture<MitarbeiterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MitarbeiterDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MitarbeiterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
