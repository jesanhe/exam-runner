import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { questionReducer } from './question.reducer';

@NgModule({
  providers: [],
  imports: [StoreModule.forFeature('question', questionReducer)],
})
export class QuestionStoreModule {}
