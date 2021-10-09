import { EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Question } from 'src/app/core/models';
import {
  addQuestion,
  addQuestions,
  clearEntities,
  removeQuestion,
  updateQuestion,
} from './question.actions';
import { questionAdapter } from './question.adapter';

export interface State extends EntityState<Question> {
  userAnswerId: number | undefined;
}

const initialState: State = questionAdapter.getInitialState({
  userAnswerId: undefined,
});

const questionReducerFn = createReducer(
  initialState,
  on(addQuestion, (state, { question }) =>
    question ? questionAdapter.addOne(question, state) : state
  ),
  on(addQuestions, (state, { questions }) =>
    questions ? questionAdapter.addMany(questions, state) : state
  ),
  on(updateQuestion, (state, { update }) =>
    update ? questionAdapter.updateOne(update, state) : state
  ),
  on(removeQuestion, (state, { testId }) =>
    questionAdapter.removeOne(testId, state)
  ),
  on(clearEntities, (state) => questionAdapter.removeAll(state))
);

export function questionReducer(state = initialState, action: Action) {
  return questionReducerFn(state, action);
}
