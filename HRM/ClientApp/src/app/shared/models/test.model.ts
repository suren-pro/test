import { TestTryes } from './testTryes.model';
import {Question} from './question.model';
import { Timer } from './timer.model';

export interface Test {
  id?: number;
  questions: Question [];  // question id-ներն են
  title: string;
  description: string;
  timer: Timer;
  date?: string;
  deadline?: string;
  maxGrade?: number;
  requiredGrade?: number;
  checkingType?: number;
  result?: string;
  status?: number;
  leftTryes?: number;
  tryes?: TestTryes[];
}
