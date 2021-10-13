import { createFeatureSelector, createSelector } from '@ngrx/store';
import { questionAdapter } from './question.adapter';
import { State } from './question.reducer';

export const selectQuestionState = createFeatureSelector<State>('question');

export const {
  selectAll: selectAllQuestions,
  selectEntities: selectAllQuestionsEntities,
  selectIds: selectQuestionsIds,
} = questionAdapter.getSelectors(selectQuestionState);

export const selectQuestionById = (questionId: string) =>
  createSelector(
    selectAllQuestionsEntities,
    (questionEntites) => questionEntites[questionId]
  );

export const selectQuestionsByIds = (questionIds: string[]) =>
  createSelector(selectAllQuestions, (questions) =>
    questions.filter(({ questionId }) => questionIds.includes(questionId))
  );

export const countBlanckQuestionsInArr = (questionIds: string[]) =>
  createSelector(
    selectQuestionsByIds(questionIds),
    (questions) =>
      questions.filter(({ userAnswer }) => userAnswer === undefined).length
  );

export const countAnsweredQuestionsInArr = (questionIds: string[]) =>
  createSelector(
    selectQuestionsByIds(questionIds),
    (questions) =>
      questions.filter(({ userAnswer }) => userAnswer !== undefined).length
  );

export const countCorrectQuestionsInArr = (questionIds: string[]) =>
  createSelector(
    selectQuestionsByIds(questionIds),
    (questions) =>
      questions.filter((question) => {
        const userSelectedAnswer = question.answers.find(
          (answer) => answer.id === question.userAnswer
        );

        return question.userAnswer !== undefined && userSelectedAnswer?.right;
      }).length
  );

export const countWrongtQuestionsInArr = (questionIds: string[]) =>
  createSelector(
    selectQuestionsByIds(questionIds),
    (questions) =>
      questions.filter((question) => {
        const userSelectedAnswer = question.answers.find(
          (answer) => answer.id === question.userAnswer
        );

        return question.userAnswer !== undefined && !userSelectedAnswer?.right;
      }).length
  );
