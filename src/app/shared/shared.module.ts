import { ClassRepository } from './repositories/class.repository';
import { PassRepository } from './repositories/pass.repository';
import { NgModule } from '@angular/core';
import { LoadableComponent } from './components/loadable/loadable.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

console.log('`Shared` bundle loaded synchronously');

@NgModule({
  imports: [CommonModule],
  declarations: [
    LoadableComponent
  ],
  providers: [
    PassRepository,
    ClassRepository
  ],
  exports: [
    LoadableComponent,
    CommonModule,
    FormsModule
  ],
})
export class SharedModule { }
