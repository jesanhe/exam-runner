import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ExamFacadeService } from './exam-facade.service';

import { ExamEffects } from './exam.effects';
import { examReducer } from './exam.reducer';

@NgModule({
  providers: [ExamFacadeService],
  imports: [
    StoreModule.forFeature('exam', examReducer),
    EffectsModule.forFeature([ExamEffects]),
  ],
})
export class ExamStoreModule {}
