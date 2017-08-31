import { BlockListContainer } from './containers/block-list/block-list.container';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './block.routes';

console.log('`Block` bundle loaded asynchronously');

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [BlockListContainer]
})
export class BlockModule { }
