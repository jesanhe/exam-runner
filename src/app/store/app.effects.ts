import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import {
  calculateQuestionInExam,
  setCurrentStep,
  setNextStep,
  setPreviousStep,
  setQuestionInExamIds,
  setQuestionInExamNumber,
} from './app.actions';
import {
  selectCurrentStep,
  selectQuestionsInExamIds,
  selectQuestionsInExamNumber,
} from './app.selectors';
import { addQuestions, setActiveQuestion } from './question/question.actions';
import { selectQuestionsIds } from './question/question.selectors';

@Injectable()
export class AppEffects {
  updateQuestionsInExam$ = this.updateQuestionsInExam();
  calculateQuestionInExam$ = this.calculateQuestionInExam();
  startAppQuestionCalculation$ = this.startAppQuestionCalculation();
  // updateActiveQuestion$ = this.updateActiveQuestion();
  // updateActiveQuestionOnNextStep$ = this.updateActiveQuestionOnNextStep();
  // updateActiveQuestionOnPreviousStep$ =
  //   this.updateActiveQuestionOnPreviousStep();
  // updateActiveQuestionOnQuestionGeneration$ =
  //   this.updateActiveQuestionOnQuestionGeneration();

  constructor(private actions$: Actions, private store: Store) {}

  private calculateQuestionInExam() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(setQuestionInExamNumber),
        map(() => calculateQuestionInExam())
      )
    );
  }

  private startAppQuestionCalculation() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(addQuestions),
        map(() => calculateQuestionInExam())
      )
    );
  }

  private updateActiveQuestion() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(setCurrentStep),
        concatLatestFrom(() => this.store.select(selectQuestionsInExamIds)),
        map(([{ currentStep }, questionIds]) =>
          setActiveQuestion({ activeQuestionId: questionIds[currentStep] })
        )
      )
    );
  }

  private updateActiveQuestionOnNextStep() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(setNextStep),
        concatLatestFrom(() => this.store.select(selectCurrentStep)),
        concatLatestFrom(() => this.store.select(selectQuestionsInExamIds)),
        map(([[, currentStep], questionIds]) =>
          setActiveQuestion({
            activeQuestionId:
              questionIds[
                currentStep < questionIds.length
                  ? currentStep + 1
                  : questionIds.length
              ],
          })
        )
      )
    );
  }

  private updateActiveQuestionOnPreviousStep() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(setPreviousStep),
        concatLatestFrom(() => this.store.select(selectCurrentStep)),
        concatLatestFrom(() => this.store.select(selectQuestionsInExamIds)),
        map(([[, currentStep], questionIds]) =>
          setActiveQuestion({
            activeQuestionId:
              questionIds[currentStep > 0 ? currentStep - 1 : 0],
          })
        )
      )
    );
  }

  private updateActiveQuestionOnQuestionGeneration() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(setQuestionInExamIds),
        map(({ questionsInExamIds }) =>
          setActiveQuestion({
            activeQuestionId: questionsInExamIds[0],
          })
        )
      )
    );
  }

  private updateQuestionsInExam() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(calculateQuestionInExam),
        concatLatestFrom(() => this.store.select(selectQuestionsInExamNumber)),
        concatLatestFrom(() => this.store.select(selectQuestionsIds)),
        map(
          ([[, questionInExamNumber], questionIds]) =>
            [...questionIds]
              .sort(() => Math.random() - 0.5)
              .slice(0, questionInExamNumber) as string[]
        ),
        map((questionsInExamIds) =>
          setQuestionInExamIds({ questionsInExamIds })
        )
      )
    );
  }
}
