import { SelectedBlocksEffects } from './redux/selected-blocks/selected-blocks.effects';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockEnrolmentContainer } from './containers/block-enrolment/block-enrolment.container';
import { RouterModule } from '@angular/router';
import { routes } from './enrol.routes';
import { StoreModule } from '@ngrx/store';
import { enrolmentReducer } from './redux/enrolment.reducer';
import { EnrolableBlocksEffects } from './redux/enrolable-blocks/enrolable-blocks.effects';
import { EffectsModule } from '@ngrx/effects';
import { EnrolableBlockRepository } from './repositories/enrolable-block.repository';
import { BlockEnrolmentComponent } from './components/block-enrolment/block-enrolment.component';

console.log('`Enrol` bundle loaded asynchronously');

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('enrolment', enrolmentReducer),
    EffectsModule.forFeature([
      EnrolableBlocksEffects,
      SelectedBlocksEffects,
    ]),
  ],
  providers: [
    EnrolableBlockRepository
  ],
  declarations: [BlockEnrolmentContainer, BlockEnrolmentComponent]
})
export class EnrolModule { }
