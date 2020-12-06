export interface Question {
  id?: number;
  questionTitle: string;
  answers: string [];
  rightAnswers?: number[];
  userAnswers?: number[];

  userAnswerStatus?: number; // ResultStatus enum
  adminNotes?: string
}
