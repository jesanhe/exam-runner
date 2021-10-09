import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ExamEffects } from './exam.effects';
import { examReducer } from './exam.reducer';

@NgModule({
  providers: [],
  imports: [
    StoreModule.forFeature('exam', examReducer),
    EffectsModule.forFeature([ExamEffects]),
  ],
})
export class ExamStoreModule {}
