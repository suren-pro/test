import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Question } from 'src/app/shared/models/question.model';
import { Test } from 'src/app/shared/models/test.model';
import { TestingDataService } from 'src/app/shared/services/testing-data.service';

@Component({
  selector: 'app-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.scss']
})
export class LearnPageComponent implements OnInit {
  test: Test;
  testID: number;
  questons: Question[];
  minutes: number;
  seconds:number;
  timer: any;
  isFinished:boolean = false;
  finishAndGoBackToggle:boolean = false;
  result: Test;

  constructor(private testingDataService: TestingDataService,
              private activetedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.activetedRoute.queryParams.subscribe((params: Params) => {
      this.testID = params.testID;
      // this.authService.getUser().subscribe((res: User) => {
      //   this.test = res.tests[this.testID]
      // })
      this.test = this.testingDataService.getTest(this.testID);
      // կամ սենց
      // this.test = this.testingDataService.getUserTests()[this.testID];
      this.minutes = this.test.timer.minutes
      this.seconds = this.test.timer.seconds
      this.start()
    })
  }

  timerMethod() {
    this.timer = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else if (this.minutes > 0){
        this.seconds = 60;
        this.minutes--;
      } else { return this.finish(); }
    }, 1000 );
  }

  start(): void {
    this.timerMethod()
  }

  finish() {
    clearInterval(this.timer);
    // this.testingDataService.sendTestResult(this.test).subscribe((res:Tests) => {
    //   this.result = res;
    //   this.isFinished = true;
    // })
    this.result = this.test;
    // this.isFinished = true;
    this.finishAndGoBackToggle = true;
  }

  goToHomePage() {
    this.router.navigateByUrl('user/home')
  }

  onAnswerClick(question:Question, i: number): void {
    if(!this.isFinished) {
    // single answer
    if (question.userAnswers[0] != i) {
      question.userAnswers[0] = i;
    } else {
      question.userAnswers = [];
    }
    // many answers
    // if (question.userAnswers.indexOf(i) == -1) {  // ստուգում է արդյոք կա զանգվածի մեջ մեր պատասխանը
    //   question.userAnswers.push(i);
    // } else {
    //   question.userAnswers.splice(question.userAnswers.indexOf(i), 1);
    // }
    }
  }

  getAnswerIsError(index: number, question: Question, questionIndex: number): boolean {
    if(this.isFinished) {
      // single
      const rightAnser = this.result.questions[questionIndex].rightAnswers[0]
      if (index == question.userAnswers[0] && rightAnser != question.userAnswers[0]) {
        return true;
      }
      // multy
      // const rightAnser = this.result.questions[questionIndex].rightAnswers
      // if ((question.userAnswers && question.userAnswers.indexOf(index) > -1) && rightAnser.indexOf(index) == -1) {
      //   return true;
      // }
    }
  }

  getAnswerIsSuccess(index: number, question:Question, questionIndex: number): boolean {
    if(this.isFinished) {
      // single
      const rightAnser = this.result.questions[questionIndex].rightAnswers[0]
      if (index == rightAnser) {
        return true;
      }
      // multy
      // const rightAnser = this.result.questions[questionIndex].rightAnswers
      // if (rightAnser.indexOf(index) > -1) {
      //   return true;
      // }
    }
  }

}
