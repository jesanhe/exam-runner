import { EntityState, Update } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Question } from 'src/app/core/models';
import {
  addQuestion,
  addQuestions,
  clearEntities,
  removeQuestion,
  setActiveQuestion,
  setUserAnswer,
  updateQuestion,
} from './question.actions';
import { questionAdapter } from './question.adapter';

export interface State extends EntityState<Question> {
  activeQuestionId: string;
}

const initialState: State = questionAdapter.getInitialState({
  activeQuestionId: '',
});

const questionReducerFn = createReducer(
  initialState,
  on(addQuestion, (state, { question }) =>
    question ? questionAdapter.addOne(question, state) : state
  ),
  on(addQuestions, (state, { questions }) =>
    questions ? questionAdapter.addMany(questions, state) : state
  ),
  on(setActiveQuestion, (state, { activeQuestionId }) => ({
    ...state,
    activeQuestionId,
  })),
  on(setUserAnswer, (state, { answerId }) => {
    const update: Update<Question> = {
      id: state.activeQuestionId,
      changes: {
        userAnswer: answerId,
      },
    };

    return questionAdapter.updateOne(update, state);
  }),
  on(updateQuestion, (state, { update }) =>
    update ? questionAdapter.updateOne(update, state) : state
  ),
  on(removeQuestion, (state, { testId }) =>
    questionAdapter.removeOne(testId, state)
  ),
  on(clearEntities, (state) => questionAdapter.removeAll(state))
);

export function questionReducer(state: State | undefined, action: Action) {
  return questionReducerFn(state, action);
}
