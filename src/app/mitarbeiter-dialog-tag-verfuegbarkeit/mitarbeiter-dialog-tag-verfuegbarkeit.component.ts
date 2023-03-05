import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mitarbeiter-dialog-tag-verfuegbarkeit',
  templateUrl: './mitarbeiter-dialog-tag-verfuegbarkeit.component.html',
  styleUrls: ['./mitarbeiter-dialog-tag-verfuegbarkeit.component.css'],
})
export class CreateMitarbeiterDialogTagVerfuegbarkeitComponent {
  @Input()
  verfuegbarkeit: string;
  @Output() verfuegbarkeitvalueChange = new EventEmitter();

  click(verfuegbarkeit: string) {
    this.verfuegbarkeitvalueChange.emit(verfuegbarkeit);
  }
}
