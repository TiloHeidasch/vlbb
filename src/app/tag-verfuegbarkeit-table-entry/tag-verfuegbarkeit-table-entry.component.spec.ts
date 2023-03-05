import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagVerfuegbarkeitTableEntryComponent } from './tag-verfuegbarkeit-table-entry.component';

describe('TagVerfuegbarkeitTableEntryComponent', () => {
  let component: TagVerfuegbarkeitTableEntryComponent;
  let fixture: ComponentFixture<TagVerfuegbarkeitTableEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagVerfuegbarkeitTableEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagVerfuegbarkeitTableEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
