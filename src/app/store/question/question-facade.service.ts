import { Injectable } from '@angular/core';
import { EntityAdapter } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Question } from 'src/app/core/models';
import { selectAllQuestions, selectQuestionById } from './question.selectors';

@Injectable()
export class QuestionFacadeService {
  public questions$: Observable<Question[]> =
    this.store.select(selectAllQuestions);
  public questionIds$: Observable<Question[]> =
    this.store.select(selectAllQuestions);

  constructor(private store: Store<EntityAdapter<Question>>) {}

  getQuestionById(questionId: string) {
    return this.store.select(selectQuestionById(questionId));
  }
}
