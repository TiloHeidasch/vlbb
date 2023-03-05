import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DayAvailabilitySelectorComponent } from './day-availability-selector/day-availability-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { MitarbeiterDialogComponent } from './mitarbeiter-dialog/mitarbeiter-dialog.component';
import { CreateMitarbeiterDialogTagVerfuegbarkeitComponent } from './mitarbeiter-dialog-tag-verfuegbarkeit/mitarbeiter-dialog-tag-verfuegbarkeit.component';
import { TagVerfuegbarkeitTableEntryComponent } from './tag-verfuegbarkeit-table-entry/tag-verfuegbarkeit-table-entry.component';
import { TagEingeplantTableEntryComponent } from './tag-eingeplant-table-entry/tag-eingeplant-table-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    DayAvailabilitySelectorComponent,
    MitarbeiterDialogComponent,
    CreateMitarbeiterDialogTagVerfuegbarkeitComponent,
    TagVerfuegbarkeitTableEntryComponent,
    TagEingeplantTableEntryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
