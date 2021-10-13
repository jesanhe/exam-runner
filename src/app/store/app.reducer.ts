import { Action, createReducer, on } from '@ngrx/store';
import {
  finishExam,
  setCurrentStep,
  setNextStep,
  setPreviousStep,
  setQuestionInExamIds,
  setQuestionInExamNumber,
  setTrainingMode,
  unsetTrainingMode,
} from './app.actions';

export interface State {
  currentStep: number;
  questionsInExamNumber: number;
  questionsInExamIds: string[];
  isTraining: boolean;
  isEnded: boolean;
  activeQuestionId: string;
}

export const initialState: State = {
  currentStep: 0,
  questionsInExamNumber: 20,
  questionsInExamIds: [],
  isTraining: true,
  isEnded: false,
  activeQuestionId: '',
};

const appReducerFn = createReducer(
  initialState,
  on(setCurrentStep, (state, { currentStep }) => ({ ...state, currentStep })),
  on(setNextStep, (state) => ({
    ...state,
    currentStep: state.currentStep + 1,
  })),
  on(finishExam, (state) => ({
    ...state,
    isEnded: true,
  })),
  on(setPreviousStep, (state) => ({
    ...state,
    currentStep:
      state.currentStep > 0 ? state.currentStep - 1 : state.currentStep,
  })),
  on(setTrainingMode, (state) => ({
    ...state,
    isTraining: true,
  })),
  on(unsetTrainingMode, (state) => ({
    ...state,
    isTraining: false,
  })),
  on(setQuestionInExamNumber, (state, { questionInExamNumber }) => ({
    ...state,
    questionInExamNumber,
  })),
  on(setQuestionInExamIds, (state, { questionsInExamIds }) => ({
    ...state,
    questionsInExamIds,
  }))
);

export function appReducer(state: State | undefined, action: Action) {
  return appReducerFn(state, action);
}
