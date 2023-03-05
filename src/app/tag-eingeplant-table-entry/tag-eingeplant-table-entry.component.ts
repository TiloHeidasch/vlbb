import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-eingeplant-table-entry',
  templateUrl: './tag-eingeplant-table-entry.component.html',
  styleUrls: ['./tag-eingeplant-table-entry.component.css'],
})
export class TagEingeplantTableEntryComponent {
  @Input()
  eingeplant: string;
}
