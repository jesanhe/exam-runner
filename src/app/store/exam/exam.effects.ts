import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap } from 'rxjs/operators';
import { FakeApiService } from 'src/app/core/fake-api.service';
import { Exam } from 'src/app/core/models';
import {
  addDefaultExam,
  loadDefaultExamRequesComplete,
  loadDefaultExamRequesStarted,
} from './exam.actions';

@Injectable()
export class ExamEffects {
  public getDefaultExam$ = this.getDefaultExam();
  public addDefaultExam$ = this.addDefaultExam();

  constructor(private actions$: Actions, private apiService: FakeApiService) {}

  private getDefaultExam() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(loadDefaultExamRequesStarted),
        mergeMap(() => this.apiService.getDefaultExam()),
        map((exam: Exam) => loadDefaultExamRequesComplete({ exam }))
      );
    });
  }

  private addDefaultExam() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(loadDefaultExamRequesComplete),
        map(({ exam }): { exam: Exam } => {
          return {
            exam: {
              ...exam,
              questions: exam.questions?.map(({ questionId }) => {
                return { questionId, testId: exam.testId };
              }),
            },
          };
        }),
        map(({ exam }) => addDefaultExam({ exam }))
      );
    });
  }
}
