import { BlockSummariesEffects } from './redux/block-summaries/block-summaries.effects';
import { BlockListContainer } from './containers/block-list/block-list.container';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './block.routes';
import { BlocksSummaryComponent } from './components/blocks-summary/blocks-summary.component';
import { SharedModule } from '../shared/shared.module';
import { blockReducer } from './redux/block.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BlockSummaryTableComponent } from './components/block-summary-table/block-summary-table.component';

console.log('`Block` bundle loaded asynchronously');

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('block', blockReducer),
    EffectsModule.forFeature([
      BlockSummariesEffects,
    ]),
  ],
  declarations: [BlockListContainer, BlocksSummaryComponent, BlockSummaryTableComponent]
})
export class BlockModule { }
