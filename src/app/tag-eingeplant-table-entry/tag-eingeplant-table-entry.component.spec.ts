import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEingeplantTableEntryComponent } from './tag-eingeplant-table-entry.component';

describe('TagEingeplantTableEntryComponent', () => {
  let component: TagEingeplantTableEntryComponent;
  let fixture: ComponentFixture<TagEingeplantTableEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagEingeplantTableEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagEingeplantTableEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
