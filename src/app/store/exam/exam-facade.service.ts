import { Injectable } from '@angular/core';
import { EntityAdapter } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Exam } from 'src/app/core/models';
import { loadDefaultExamRequesStarted } from './exam.actions';
import { selectAllExams, selectDefaultExam } from './exam.selectors';

@Injectable()
export class ExamFacadeService {
  public exams$: Observable<Exam[]> = this.store.select(selectAllExams);
  public examIds$: Observable<Exam[]> = this.store.select(selectAllExams);

  constructor(private store: Store<EntityAdapter<Exam>>) {}

  getDefaultExam(): Observable<Exam> {
    return this.store
      .select(selectDefaultExam)
      .pipe(filter(Boolean)) as Observable<Exam>;
  }

  loadDefaultExam(): void {
    this.store.dispatch(loadDefaultExamRequesStarted());
  }
}
