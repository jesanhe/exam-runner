import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './app.reducer';

export const selectAppState = createFeatureSelector<State>('app');

export const selectCurrentStep = createSelector(
  selectAppState,
  (state: State) => state.currentStep
);

export const selectTrainingMode = createSelector(
  selectAppState,
  (state: State) => state.isTraining
);

export const selectQuestionsInExamNumber = createSelector(
  selectAppState,
  (state: State) => state.questionsInExamNumber
);

export const selectQuestionsInExamIds = createSelector(
  selectAppState,
  (state: State) => [...state.questionsInExamIds]
);

export const selectExamEnd = createSelector(
  selectAppState,
  (state: State) => state.isEnded
);
