import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import {
  finishExam,
  setCurrentStep,
  setNextStep,
  setPreviousStep,
  startApp,
} from './app.actions';
import { State } from './app.reducer';
import {
  selectCurrentStep,
  selectExamEnd,
  selectQuestionsInExamIds,
  selectQuestionsInExamNumber,
  selectTrainingMode,
} from './app.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppFacadeService {
  constructor(private store: Store<State>) {}

  startApp() {
    this.store.dispatch(startApp());
  }

  finishExam() {
    this.store.dispatch(finishExam());
  }

  setCurrentStep(currentStep: number) {
    this.store.dispatch(setCurrentStep({ currentStep }));
  }

  setNextStep() {
    this.store.dispatch(setNextStep());
  }

  setPreviousStep() {
    this.store.dispatch(setPreviousStep());
  }

  getCurrentStep() {
    return this.store.select(selectCurrentStep);
  }

  getQuestionsInExamIds() {
    return this.store.select(selectQuestionsInExamIds);
  }

  getQuestionsInExamNumber() {
    return this.store.select(selectQuestionsInExamNumber);
  }

  getTrainingMode() {
    return this.store.select(selectTrainingMode);
  }

  getExamEnd() {
    return this.store.select(selectExamEnd);
  }
}
