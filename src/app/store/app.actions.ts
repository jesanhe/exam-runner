import { createAction, props } from '@ngrx/store';

export enum appActionsTypes {
  StartApp = '[App Store] Start App',
  FinishExam = '[App Store] Finish Exam',
  SetCurrentStep = '[App Store] Set Current Step',
  SetNextStep = '[App Store] Set Next Step',
  SetPreviousStep = '[App Store] Set Previous Step',
  SetTrainingMode = '[App Store] Set Training Mode',
  UnsetTrainingMode = '[App Store] Unset Training Mode',
  SetQuestionInExamNumber = '[App Store] Set Question In Exam Number',
  SetQuestionInExamIds = '[App Store] Set Question In Exam Ids',
  CalculateQuestionInExam = '[App Store] Calculate Questions In Exam',
}

export const startApp = createAction(appActionsTypes.StartApp);

export const finishExam = createAction(appActionsTypes.FinishExam);

export const setCurrentStep = createAction(
  appActionsTypes.SetCurrentStep,
  props<{ currentStep: number }>()
);

export const setNextStep = createAction(appActionsTypes.SetNextStep);

export const setPreviousStep = createAction(appActionsTypes.SetPreviousStep);

export const setTrainingMode = createAction(appActionsTypes.SetTrainingMode);

export const unsetTrainingMode = createAction(
  appActionsTypes.UnsetTrainingMode
);

export const setQuestionInExamNumber = createAction(
  appActionsTypes.SetQuestionInExamNumber,
  props<{ questionInExamNumber: number }>()
);

export const setQuestionInExamIds = createAction(
  appActionsTypes.SetQuestionInExamIds,
  props<{ questionsInExamIds: string[] }>()
);

export const calculateQuestionInExam = createAction(
  appActionsTypes.CalculateQuestionInExam
);
