import { TeacherRepository } from './repositories/teacher.repository';
import { ClassRepository } from './repositories/class.repository';
import { PassRepository } from './repositories/pass.repository';
import { NgModule } from '@angular/core';
import { LoadableComponent } from './components/loadable/loadable.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockRepository } from './repositories/block.repository';
import {
  MatToolbarModule,
  MatGridListModule,
  MatButtonModule,
  MatSidenavModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSelectModule,
  MatChipsModule,
  MAT_DATE_LOCALE,
} from '@angular/material';

console.log('`Shared` bundle loaded synchronously');

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    LoadableComponent
  ],
  providers: [
    PassRepository,
    ClassRepository,
    BlockRepository,
    TeacherRepository,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  exports: [
    LoadableComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatChipsModule,
  ],
})
export class SharedModule { }
