import { EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Exam } from 'src/app/core/models';
import {
  addDefaultExam,
  addExam,
  clearEntities,
  removeExam,
  updateExam,
} from './exam.actions';
import { examAdapter } from './exam.adapter';

export interface State extends EntityState<Exam> {
  defaultExamId: string;
}

const initialState: State = examAdapter.getInitialState({
  defaultExamId: '',
});

const examReducerFn = createReducer(
  initialState,
  on(addExam, (state, { exam }) =>
    exam ? examAdapter.addOne(exam, state) : state
  ),
  on(addDefaultExam, (state, { exam }) =>
    exam
      ? examAdapter.addOne(exam, { ...state, defaultExamId: exam.testId })
      : state
  ),
  on(updateExam, (state, { update }) =>
    update ? examAdapter.updateOne(update, state) : state
  ),
  on(removeExam, (state, { testId }) => examAdapter.removeOne(testId, state)),
  on(clearEntities, (state) => examAdapter.removeAll(state))
);

export function examReducer(state: State | undefined, action: Action) {
  return examReducerFn(state, action);
}
