import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mitarbeiter } from '../app.component';

@Component({
  selector: 'app-mitarbeiter-dialog',
  templateUrl: './mitarbeiter-dialog.component.html',
  styleUrls: ['./mitarbeiter-dialog.component.css'],
})
export class MitarbeiterDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MitarbeiterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public mitarbeiter: Mitarbeiter
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
