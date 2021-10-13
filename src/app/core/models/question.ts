export interface AnswerInterface {
  right: boolean;
  answer: string;
  id: number;
}

export class Answer implements AnswerInterface {
  right!: boolean;
  answer!: string;
  id!: number;

  constructor(data?: AnswerInterface) {
    Object.assign(this, data);
  }
}

export interface QuestionInterface {
  ebookId: string;
  sectionId: string;
  questionId: string;
  question: string;
  answers: Answer[];
  explanation: string;
  examOnly: boolean;
  testId?: string;
  userAnswer?: number;
}

export class Question implements QuestionInterface {
  ebookId!: string;
  sectionId!: string;
  questionId!: string;
  question!: string;
  answers!: Answer[];
  explanation!: string;
  examOnly!: boolean;
  testId?: string;
  userAnswer?: number;

  constructor(data?: QuestionInterface) {
    Object.assign(this, data);
  }
}
