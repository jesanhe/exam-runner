import { createFeatureSelector, createSelector } from '@ngrx/store';
import { examAdapter } from './exam.adapter';
import { State } from './exam.reducer';

export const selectExamState = createFeatureSelector<State>('exam');

export const {
  selectAll: selectAllExams,
  selectEntities: selectAllExamsEntities,
  selectIds: selectExamsIds,
} = examAdapter.getSelectors(selectExamState);

export const selectExamById = (testId: string) =>
  createSelector(selectAllExamsEntities, (examEntites) => examEntites[testId]);

export const selectDefaultExamId = createSelector(
  selectExamState,
  ({ defaultExamId }) => defaultExamId
);

export const selectDefaultExam = createSelector(
  selectAllExamsEntities,
  selectDefaultExamId,
  (examEntites, defaultExamId) => examEntites[defaultExamId]
);
