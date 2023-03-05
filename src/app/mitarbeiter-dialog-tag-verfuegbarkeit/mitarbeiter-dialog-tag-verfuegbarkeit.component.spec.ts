import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMitarbeiterDialogTagVerfuegbarkeitComponent } from './mitarbeiter-dialog-tag-verfuegbarkeit.component';

describe('CreateMitarbeiterDialogTagVerfuegbarkeitComponent', () => {
  let component: CreateMitarbeiterDialogTagVerfuegbarkeitComponent;
  let fixture: ComponentFixture<CreateMitarbeiterDialogTagVerfuegbarkeitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMitarbeiterDialogTagVerfuegbarkeitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      CreateMitarbeiterDialogTagVerfuegbarkeitComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
