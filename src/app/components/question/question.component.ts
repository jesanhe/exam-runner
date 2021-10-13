import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import {
  delay,
  filter,
  skip,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Question } from 'src/app/core/models';
import { AppFacadeService } from 'src/app/store/app-facade.service';
import { QuestionFacadeService } from 'src/app/store/question/question-facade.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  host: {
    class: '',
  },
  animations: [
    trigger('questionChange', [
      // state('in', style({ opacity: 1 })),

      transition('true <=> false', [
        animate(
          '1s',
          keyframes([
            style({ opacity: 1 }),
            style({ opacity: 0 }),
            style({ opacity: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class QuestionComponent implements OnInit, OnDestroy {
  @Input() questionArrIds!: string[];

  question$!: Observable<Question | undefined>;
  currentStep$!: Observable<number>;

  userAnswer = new FormControl('');
  animationTrigger = true;
  showHint = false;

  unsubscriber$ = new Subject<void>();

  constructor(
    private questionStore: QuestionFacadeService,
    private appStore: AppFacadeService
  ) {}

  ngOnInit(): void {
    this.initializeStepListener();
    this.initializeFormListener();
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  private initializeStepListener() {
    this.appStore
      .getCurrentStep()
      .pipe(take(1))
      .subscribe((step: number) => {
        if (step < this.questionArrIds.length) {
          this.userAnswer.reset();
          this.questionStore.setActiveQuestion({
            activeQuestionId: this.questionArrIds[step],
          });

          this.question$ = this.questionStore.getQuestionById(
            this.questionArrIds[step]!
          );
        }
      });

    this.appStore
      .getCurrentStep()
      .pipe(
        takeUntil(this.unsubscriber$),
        skip(1),
        tap(() => (this.animationTrigger = !this.animationTrigger)),
        delay<number>(500)
      )
      .subscribe((step: number) => {
        if (step < this.questionArrIds.length) {
          this.userAnswer.reset();
          this.questionStore.setActiveQuestion({
            activeQuestionId: this.questionArrIds[step],
          });

          console.log('waka');

          this.question$ = this.questionStore
            .getQuestionById(this.questionArrIds[step]!)
            .pipe(
              tap((question) => {
                if (question?.userAnswer) {
                  const userAnswerModel = question.answers.find(
                    ({ id }) => id === question?.userAnswer
                  );

                  if (userAnswerModel) {
                    this.userAnswer.patchValue(userAnswerModel.id, {
                      emitEvent: false,
                    });
                  }
                }
              })
            );
        }
      });
  }

  private initializeFormListener() {
    this.userAnswer.valueChanges
      .pipe(
        takeUntil(this.unsubscriber$),
        filter(
          (value) =>
            value !== undefined &&
            value !== null &&
            this.question$ !== undefined
        ),
        withLatestFrom(this.question$)
      )
      .subscribe(([answerId, question]) => {
        this.questionStore.setUserAnswer({
          answerId,
        });
        if (question) {
          const userAnswer = question.answers.find(({ id }) => id === answerId);
          if (userAnswer) {
            this.showHint = !userAnswer.right;
          }
        }
      });
  }
}
