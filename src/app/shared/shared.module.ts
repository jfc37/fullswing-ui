import { ClassRepository } from './repositories/class.repository';
import { PassRepository } from './repositories/pass.repository';
import { NgModule } from '@angular/core';
import { LoadableComponent } from './components/loadable/loadable.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  ],
  exports: [
    LoadableComponent,
    CommonModule,
    FormsModule,

    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule { }
