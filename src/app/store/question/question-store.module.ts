import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { QuestionFacadeService } from './question-facade.service';

import { questionReducer } from './question.reducer';

@NgModule({
  providers: [QuestionFacadeService],
  imports: [StoreModule.forFeature('question', questionReducer)],
})
export class QuestionStoreModule {}
