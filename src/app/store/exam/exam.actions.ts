import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Exam } from 'src/app/core/models';

export enum examActionsTypes {
  LoadDefaultExamRequesStarted = '[Exam API] Load default exam request started',
  LoadDefaultExamRequesComplete = '[Exam API] Load default exam request complete',
  AddExam = '[Exam Store] Add exam',
  AddDefaultExam = '[Exam Store] Add default exam',
  UpdateExam = '[Exam Store] Update exam',
  RemoveExam = '[Exam Store] Remove exam',
  ClearEntities = '[Exam Store] Clear exam store',
}

export const loadDefaultExamRequesStarted = createAction(
  examActionsTypes.LoadDefaultExamRequesStarted
);

export const loadDefaultExamRequesComplete = createAction(
  examActionsTypes.LoadDefaultExamRequesComplete,
  props<{ exam: Exam }>()
);

export const addExam = createAction(
  examActionsTypes.AddExam,
  props<{ exam: Exam }>()
);

export const addDefaultExam = createAction(
  examActionsTypes.AddDefaultExam,
  props<{ exam: Exam }>()
);

export const updateExam = createAction(
  examActionsTypes.UpdateExam,
  props<{ update: Update<Exam> }>()
);

export const removeExam = createAction(
  examActionsTypes.RemoveExam,
  props<{ testId: string }>()
);

export const clearEntities = createAction(examActionsTypes.ClearEntities);
