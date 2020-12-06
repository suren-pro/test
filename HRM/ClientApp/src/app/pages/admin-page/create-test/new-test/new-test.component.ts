import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TestCheckingType } from 'src/app/shared/enums/TestCheckingType';
import { Question } from 'src/app/shared/models/question.model';
import { Test } from 'src/app/shared/models/test.model';
import { TestingDataService } from 'src/app/shared/services/testing-data.service';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss']
})
export class NewTestComponent implements OnInit, OnChanges {
  title:string;
  discription:string;
  minutes:number;
  seconds:number;
  testQuestions: Question [] = [];
  questions: Question[];

  testTimerErrorNotificationToggle:boolean = false;
  testQuestionsErrorNotificationToggle:boolean = false;

  @Input() newTestToggle:boolean;
  @ViewChild('list') list: ElementRef;
  @ViewChild('departmentsLis1') departmentsLis1: ElementRef;
  @ViewChild('departmentsLis2') departmentsLis2: ElementRef;
  @Output() closeNewTestModal: EventEmitter<boolean> = new EventEmitter();
  firstTimeOnInit:boolean = false;

  checkingType:number = 1;
  testCheckingTypeEnumLIst = TestCheckingType;
  maxGrade:number;
  requiredGrade:number;
  leftTryes:number;

  constructor(private testingDataService: TestingDataService) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes) {
      if(this.firstTimeOnInit == false) {
        this.firstTimeOnInit = true;
      }else{
        for(let question of this.questions) {
          const index1 = this.questions.indexOf(question)
          this.list.nativeElement.children[index1].children[0].checked = false;
        }
        this.ngOnInit();
      }
    }
  }

  ngOnInit() {
    // this.testingDataService.getAllQuestions().subscribe((res) => {
    //   this.questions = res ...
    // });
    this.questions = this.testingDataService.getAllQuestions();

    this.title = 'Թեսթի անվանում';
    this.discription = "Թեսթի նկարագրություն";
    this.minutes = null;
    this.seconds = null;
    this.testQuestions = [];
  }

  addQuestionInTest(event, question) {
    if(event.target.checked) {
      this.testQuestions.push(question);
    }else {
      this.testQuestions =  this.testQuestions.filter( el => el.id != question.id)
    }
    // console.log(this.testQuestions);
  }

  openAddQuestionModal() {
    if(document.getElementById('addQuestionModal').style.display == "" || document.getElementById('addQuestionModal').style.display == 'none') {
      document.getElementById('addQuestionModal').style.display = 'block';
    } else {
      document.getElementById('addQuestionModal').style.display = 'none';
    }
  }

  closeAddQuestionModal() {
    document.getElementById('addQuestionModal').style.display = 'none';
  }

  onAddNewTest() {
    // console.log('seconds ', seconds == '');
    // console.log(this.testQuestions);
      if(this.seconds == null) {
        this.testTimerErrorNotificationToggle = true;
      }else {
        if(this.testQuestions.length == 0) {
          this.testQuestionsErrorNotificationToggle = true;
        }else {
          const test: Test = {
            id: null,
            questions: this.testQuestions,
            title: this.title,
            description: this.discription,
            timer: {
              minutes: this.minutes,
              seconds: this.seconds
            },
            // // date?: string;
            // // deadline?: string;
            maxGrade: this.maxGrade*1,
            requiredGrade: this.requiredGrade*1,
            checkingType: this.checkingType*1,
            // // result?: string;
            status: 1,
            leftTryes: this.leftTryes*1
            // // tryes?: TestTryes[];
          }
          console.log(test);


        this.closeNewTestModal.emit(true);
        }
      }
  }

}
