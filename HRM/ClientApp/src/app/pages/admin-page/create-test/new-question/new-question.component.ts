import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Question } from 'src/app/shared/models/question.model';
import { TestingDataService } from 'src/app/shared/services/testing-data.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {
  questionTitle: string; //ngModel
  answer:string; //ngModel
  answers: string[] = [];
  rightAnswers: number[];

  updateToggle:boolean;

  invalidQuestionModalToggle:boolean = false;
  addAnswerErrorToggle:boolean = false;
  dublicateAnswerErrorToggle:boolean = false;

  @ViewChild('answersElement') answersElement: ElementRef;
  @Input() newQuestionToggle: boolean; // for new question
  @Input() currenQuestion:Question; // for update question
  @Output() closeNewQuestionModal: EventEmitter<boolean> = new EventEmitter();
  @Output() closeUpdateQuestionModal: EventEmitter<boolean> = new EventEmitter();

  constructor(private testingDataService: TestingDataService) { }

  ngAfterViewChecked(): void {
    if(this.currenQuestion){
      this.setRightAsnwers();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.newQuestionToggle) {  // նոր հարց ստեղծելու համար է
      this.ngOnInit()
    }
    if(this.currenQuestion) {
      this.questionTitle = this.currenQuestion.questionTitle;
      this.answers = this.currenQuestion.answers;
      // this.rightAnswers = [];
      this.rightAnswers = this.currenQuestion.rightAnswers;
      this.updateToggle = true;

      // if(this.currenQuestion){
      //   setTimeout(() => {
      //     this.setRightAsnwers();
      //   },20)
      // }
    }
  }

  ngOnInit(): void {
    if(!this.updateToggle) {
      this.questionTitle = 'Նոր Հարց'; //ngModel
      this.answer = null; //ngModel
      this.answers = [];
      this.rightAnswers = [];
      this.updateToggle = false;
    }
  }

  onAddAnswer() {
    if(this.answer) {
      if(this.answer.trim()) {
        const dublicate = this.answers.find(el => el == this.answer)
        if(!dublicate) {
          this.answers.push(this.answer);
          this.answer = '';
        }else {
          this.dublicateAnswerErrorToggle = true;   // dublicate anser error
        }
      }
    }
    else {
      /////// asnwer error notification ////////////
      this.addAnswerErrorToggle = true;
      //////////////////////////////////////////////
    }
  }
  onRemoveAnswer(index) {
    const isChecked = this.answersElement.nativeElement.children[index].children[0].checked;
    if(!isChecked) {
      this.answers.splice(index, 1);
    }
  }

  onAddQuestion() {
    this.rightAnswers = [];  // զրոյացնում եմ որ update ի ժամանակ նորից սկսի գրոլը, եղածի վրա չավելացնի
    for(let answer of this.answers) {
      const index = this.answers.indexOf(answer)
      const isChecked = this.answersElement.nativeElement.children[index].children[0].checked;
      // console.log(isChecked);
      if(isChecked) {
        this.rightAnswers.push(index);
      }
    }

    if(this.answers.length == 0 || this.rightAnswers.length == 0) {
          // alert('invalid question, please check your question, asnwers or right answers')
          /////////// error notification //////////
          this.invalidQuestionModalToggle = true;
          /////////////////////////////////////////
    }
    else {
      if(!this.updateToggle){
      this.closeNewQuestionModal.emit(true)

      // const question: Question = {
      //   id: null,
      //   questionTitle: this.questionTitle,
      //   answers: this.answers,
      //   rightAnswers: this.rightAnswers,
      //   userAnswers: []
      // }
      // console.log(question);

      // this.testingDataService.createQuestion(this.questionTitle, this.answers, this.rightAnswers)
      //   .subscribe((res) => {
      //     console.log(res);
      //   });
      }
      if(this.updateToggle) {
      this.closeUpdateQuestionModal.emit(true)

      const question: Question = {
        id: this.currenQuestion.id,
        questionTitle: this.questionTitle,
        answers: this.answers,
        rightAnswers: this.rightAnswers,
        userAnswers: []
      }
      console.log(question);

        // this.testingDataService.updateQuestion(
        //                           this.currenQuestion.id,
        //                           this.questionTitle,
        //                           this.answers,
        //                           this.rightAnswers)
        // .subscribe((res) => {
        //   // res ...
        // });

      }
    }
  }

  setRightAsnwers() {   // սա պետք է update ի ժամանակ
    for(let answer of this.answers) {
      const index = this.answers.indexOf(answer)
      for(let rightAnswer of this.rightAnswers) {
        if(index == rightAnswer) {
          this.answersElement.nativeElement.children[index].children[0].checked = true;
        }
      }
    }
  }


}
