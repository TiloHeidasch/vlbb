import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-verfuegbarkeit-table-entry',
  templateUrl: './tag-verfuegbarkeit-table-entry.component.html',
  styleUrls: ['./tag-verfuegbarkeit-table-entry.component.css'],
})
export class TagVerfuegbarkeitTableEntryComponent {
  @Input()
  verfuegbarkeit: string;
}
