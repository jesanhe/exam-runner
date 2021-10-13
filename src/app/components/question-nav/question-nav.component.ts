import { Component, Input, OnInit } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Question } from 'src/app/core/models';
import { AppFacadeService } from 'src/app/store/app-facade.service';
import { QuestionFacadeService } from 'src/app/store/question/question-facade.service';

@Component({
  selector: 'app-question-nav',
  templateUrl: './question-nav.component.html',
  styleUrls: ['./question-nav.component.scss'],
})
export class QuestionNavComponent implements OnInit {
  @Input() questionsInExam: string[] = [];
  questionsInExam$!: Observable<string[]>;
  currentStep$!: Observable<{ value: number }>;
  questionEntities$!: Observable<Dictionary<Question>>;
  trainingMode$!: Observable<{ value: boolean }>;

  questionNumber: number = 0;

  unsubscriber$ = new Subject<void>();

  constructor(
    private appStore: AppFacadeService,
    private questionStore: QuestionFacadeService
  ) {}

  ngOnInit(): void {
    this.questionsInExam$ = this.appStore
      .getQuestionsInExamIds()
      .pipe(takeUntil(this.unsubscriber$));

    this.currentStep$ = this.appStore.getCurrentStep().pipe(
      takeUntil(this.unsubscriber$),
      map((currentStep) => {
        return { value: currentStep };
      })
    );

    this.trainingMode$ = this.appStore
      .getTrainingMode()
      .pipe(map((value) => ({ value })));

    this.questionEntities$ = this.questionStore.questionsEntities$;
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  isWrongQuestion(question: Question | undefined): boolean {
    if (question) {
      const userSelectedAnswer = question.answers.find(
        (answer) => answer.id === question.userAnswer
      );

      return (
        question.userAnswer !== undefined &&
        userSelectedAnswer !== undefined &&
        !userSelectedAnswer?.right
      );
    }

    return false;
  }

  isCorrectQuestion(question: Question | undefined): boolean {
    if (question) {
      const userSelectedAnswer = question.answers.find(
        (answer) => answer.id === question.userAnswer
      );

      return (
        question.userAnswer !== undefined &&
        userSelectedAnswer !== undefined &&
        userSelectedAnswer?.right
      );
    }

    return false;
  }

  goToStep(step: number) {
    this.appStore.setCurrentStep(step);
  }
}
