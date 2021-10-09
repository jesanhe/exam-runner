import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Question } from 'src/app/core/models';

export enum questionActionsTypes {
  AddQuestion = '[Question Store] Add question',
  AddQuestions = '[Question Store] Add multiple question',
  SetUserAnswer = '[Question Store] Set user answer',
  UpdateQuestion = '[Question Store] Update question',
  RemoveQuestion = '[Question Store] Remove question',
  ClearEntities = '[Question Store] Clear question store',
}

export const addQuestion = createAction(
  questionActionsTypes.AddQuestion,
  props<{ question: Question }>()
);

export const addQuestions = createAction(
  questionActionsTypes.AddQuestions,
  props<{ questions: Question[] }>()
);

export const setUserAnswer = createAction(
  questionActionsTypes.SetUserAnswer,
  props<{ answerId: number }>()
);

export const updateQuestion = createAction(
  questionActionsTypes.UpdateQuestion,
  props<{ update: Update<Question> }>()
);

export const removeQuestion = createAction(
  questionActionsTypes.RemoveQuestion,
  props<{ testId: string }>()
);

export const clearEntities = createAction(questionActionsTypes.ClearEntities);
