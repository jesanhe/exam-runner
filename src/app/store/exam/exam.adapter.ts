import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Exam } from 'src/app/core/models';

export const examAdapter: EntityAdapter<Exam> = createEntityAdapter<Exam>({
  selectId: (exam: Exam): string => exam.testId,
});
