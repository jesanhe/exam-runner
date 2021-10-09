import { Question } from './question';

export interface ExamInterface {
  testId: string;
  scoreConfig: {
    hitCoef: number;
    failureCoef: number;
    emptyCoef: number;
    maxQualification: number;
  };
  questions?: Partial<Question>[];
}

export class Exam implements ExamInterface {
  testId!: string;
  scoreConfig!: {
    hitCoef: number;
    failureCoef: number;
    emptyCoef: number;
    maxQualification: number;
  };
  questions?: Partial<Question>[];

  constructor(data?: ExamInterface) {
    Object.assign(this, data);
  }
}
