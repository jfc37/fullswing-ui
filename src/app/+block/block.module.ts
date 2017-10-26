import { NewBlockEffects } from './redux/new-block/new-block.effects';
import { DraftBlocksEffects } from './redux/draft-blocks/draft-blocks.effects';
import { BlockUpdateContainer } from './containers/block-update/block-update.container';
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
import { BlockFormComponent } from './components/block-form/block-form.component';
import { BlockCreateContainer } from './containers/block-create/block-create.container';

console.log('`Block` bundle loaded asynchronously');

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('block', blockReducer),
    EffectsModule.forFeature([
      BlockSummariesEffects,
      DraftBlocksEffects,
      NewBlockEffects,
    ]),
  ],
  declarations: [
    BlockListContainer,
    BlocksSummaryComponent,
    BlockSummaryTableComponent,
    BlockUpdateContainer,
    BlockFormComponent,
    BlockCreateContainer
  ]
})
export class BlockModule { }
