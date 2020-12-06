import { Component, OnInit } from '@angular/core';
import { TestCheckingType } from 'src/app/shared/enums/TestCheckingType';
import { Question } from 'src/app/shared/models/question.model';
import { Test } from 'src/app/shared/models/test.model';
import { TestingDataService } from 'src/app/shared/services/testing-data.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  questions: Question[];
  tests: Test[];

  currenQuestion: Question;
  newQuestionToggle:boolean = false; // ամեն անգամ նոր հարց ստեղծելու ժամանակ new-question-component ngOnInit անելու համար է
  newTestToggle:boolean = false;

  questionTabToggle: boolean = true;
  testTabToggle: boolean = false;

  testCheckingTypeEnumList = TestCheckingType;

  constructor(private testingDataService: TestingDataService) { }

  ngOnInit(): void {
    this.questions = this.testingDataService.getAllQuestions();
    this.tests = this.testingDataService.getAllTests();
    // this.testingDataService.getAllQuestions().subscribe((res) => {
    //   this.questions = res...
    // });
    // this.testingDataService.getAllTests().subscribe((res) => {
    //   this.tests = res.tests ...
    // });
  }

  openQuestionContent(i) {
    let id = 'questionContent' + i;
    if(document.getElementById(id).style.display == "" || document.getElementById(id).style.display == 'none') {
      document.getElementById(id).style.display = 'block'
    } else {
      document.getElementById(id).style.display = 'none'
    }
  }

  openTestContent(i) {
    let id = 'testContent' + i;
    if(document.getElementById(id).style.display == "" || document.getElementById(id).style.display == 'none') {
      document.getElementById(id).style.display = 'block'
    } else {
      document.getElementById(id).style.display = 'none'
    }
  }

  updateQuestion(question) {
    this.currenQuestion = question;
  }

  removeQuestion(questionID) {
    // this.testingDataService.removeQuestion(questionID).subscribe((res) => {
    //   res...
    // });
    // this.testingDataService.removeQuestion(questionID);
  }
  removeTest(testID) {
    // this.testingDataService.removeTest(testID).subscribe((res) => {
    //   res...
    // });
    // this.testingDataService.removeTest(testID);
  }

  closeNewQuestionModal(event) {
    if(event) {
      document.getElementById('newQuestionModalCloseButton').click()
    }
  }
  closeUpdateQuestionModal(event) {
    if(event) {
      document.getElementById('updateQuestionModalCloseButton').click()
    }
  }
  closeNewTestModal(event) {
    if(event) {
      document.getElementById('newTestModalCloseButton').click();
    }
  }

}
