import { createFeatureSelector, createSelector } from '@ngrx/store';
import { questionAdapter } from './question.adapter';
import { State } from './question.reducer';

export const selectQuestionState = createFeatureSelector<State>('question');

export const {
  selectAll: selectAllQuestions,
  selectEntities: selectAllQuestionsEntities,
  selectIds: selectQuestionsIds,
} = questionAdapter.getSelectors(selectQuestionState);

export const selectQuestionById = (questionId: string) =>
  createSelector(
    selectAllQuestionsEntities,
    (questionEntites) => questionEntites[questionId]
  );
