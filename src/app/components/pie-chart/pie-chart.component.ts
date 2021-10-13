import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AppFacadeService } from 'src/app/store/app-facade.service';
import { QuestionFacadeService } from 'src/app/store/question/question-facade.service';

interface ChartConfigItem {
  color: string;
  label: string;
  percent: number;
  value: number;
  offset: number;
}

interface ChartConfig {
  blankQuestions: ChartConfigItem;
  answeredQuestions: ChartConfigItem;
  correctQuestions: ChartConfigItem;
  wrongtQuestions: ChartConfigItem;
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnDestroy {
  questionsInExam$!: Observable<string[]>;
  questionNumber$!: Observable<number>;
  blankQuestions$!: Observable<number>;
  answeredQuestions$!: Observable<number>;
  correctQuestions$!: Observable<number>;
  wrongtQuestions$!: Observable<number>;
  chartConfig$!: Observable<ChartConfig>;
  trainingMode$!: Observable<{ value: boolean }>;

  unsubscriber$ = new Subject<void>();

  constructor(
    private appStore: AppFacadeService,
    private questionStore: QuestionFacadeService
  ) {}

  ngOnInit(): void {
    this.initializeQuestionListeners();
    this.chartConfig$ = this.setChartConfig();
    this.trainingMode$ = this.appStore
      .getTrainingMode()
      .pipe(map((value) => ({ value })));
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  private initializeQuestionListeners() {
    this.questionNumber$ = this.appStore
      .getQuestionsInExamNumber()
      .pipe(takeUntil(this.unsubscriber$));

    this.questionsInExam$ = this.appStore
      .getQuestionsInExamIds()
      .pipe(takeUntil(this.unsubscriber$));

    this.blankQuestions$ = this.questionsInExam$.pipe(
      switchMap((questionsIds) =>
        this.questionStore.getBlanckQuestionsInArr(questionsIds)
      )
    );

    this.answeredQuestions$ = this.questionsInExam$.pipe(
      switchMap((questionsIds) =>
        this.questionStore.getAnsweredQuestionsInArr(questionsIds)
      )
    );

    this.correctQuestions$ = this.questionsInExam$.pipe(
      switchMap((questionsIds) =>
        this.questionStore.getCorrectQuestionsInArr(questionsIds)
      )
    );

    this.wrongtQuestions$ = this.questionsInExam$.pipe(
      switchMap((questionsIds) =>
        this.questionStore.getWrongtQuestionsInArr(questionsIds)
      )
    );
  }

  private setChartConfig() {
    return combineLatest([
      this.blankQuestions$,
      this.answeredQuestions$,
      this.correctQuestions$,
      this.wrongtQuestions$,
      this.questionNumber$,
    ]).pipe(
      map(
        ([
          blankQuestions,
          answeredQuestions,
          correctQuestions,
          wrongtQuestions,
          questionNumber,
        ]) => {
          const blankPercent = (blankQuestions / questionNumber) * 100;
          const answeredPercent = (answeredQuestions / questionNumber) * 100;
          const correctPercent = (correctQuestions / questionNumber) * 100;
          const wrongPercent = (wrongtQuestions / questionNumber) * 100;

          const chartConfig: ChartConfig = {
            answeredQuestions: {
              color: 'answer',
              label: 'Respondidas',
              percent: answeredPercent,
              value: answeredQuestions,
              offset: 0,
            },
            wrongtQuestions: {
              color: 'wrongAnswer',
              label: 'Incorrectas',
              percent: wrongPercent,
              value: wrongtQuestions,
              offset: 0,
            },
            correctQuestions: {
              color: 'correctAnswer',
              label: 'Correctas',
              percent: correctPercent,
              value: correctQuestions,
              offset: correctPercent ? wrongPercent : 0,
            },
            blankQuestions: {
              color: 'notAnswer',
              label: 'No resp',
              percent: blankPercent,
              value: blankQuestions,
              offset: answeredPercent,
            },
          };

          return chartConfig;
        }
      )
    );
  }
}
