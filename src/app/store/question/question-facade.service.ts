import { Injectable } from '@angular/core';
import { Dictionary, EntityAdapter } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Question } from 'src/app/core/models';
import { setActiveQuestion, setUserAnswer } from './question.actions';
import {
  countAnsweredQuestionsInArr,
  countBlanckQuestionsInArr,
  countCorrectQuestionsInArr,
  countWrongtQuestionsInArr,
  selectAllQuestions,
  selectAllQuestionsEntities,
  selectQuestionById,
} from './question.selectors';

@Injectable()
export class QuestionFacadeService {
  public questions$: Observable<Question[]> =
    this.store.select(selectAllQuestions);
  public questionsEntities$: Observable<Dictionary<Question>> =
    this.store.select(selectAllQuestionsEntities);
  public questionIds$: Observable<Question[]> =
    this.store.select(selectAllQuestions);

  constructor(private store: Store<EntityAdapter<Question>>) {}

  getQuestionById(questionId: string) {
    return this.store.select(selectQuestionById(questionId));
  }

  getBlanckQuestionsInArr(questionsIds: string[]) {
    return this.store.select(countBlanckQuestionsInArr(questionsIds));
  }

  getAnsweredQuestionsInArr(questionsIds: string[]) {
    return this.store.select(countAnsweredQuestionsInArr(questionsIds));
  }

  getCorrectQuestionsInArr(questionsIds: string[]) {
    return this.store.select(countCorrectQuestionsInArr(questionsIds));
  }

  getWrongtQuestionsInArr(questionsIds: string[]) {
    return this.store.select(countWrongtQuestionsInArr(questionsIds));
  }

  setUserAnswer({ answerId }: { answerId: number }) {
    this.store.dispatch(setUserAnswer({ answerId }));
  }

  setActiveQuestion({ activeQuestionId }: { activeQuestionId: string }) {
    this.store.dispatch(setActiveQuestion({ activeQuestionId }));
  }
}
