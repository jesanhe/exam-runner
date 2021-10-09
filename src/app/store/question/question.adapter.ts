import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Question } from 'src/app/core/models';

export const questionAdapter: EntityAdapter<Question> =
  createEntityAdapter<Question>({
    selectId: (question: Question): string => question.questionId,
  });
