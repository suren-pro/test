import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
import { Test } from '../models/test.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TestingDataService {
  questions: Question[] = [
    {
      id: 1,
      questionTitle: 'Հարց',
      answers: ['պատասխան 1', 'պատասխան 2', 'պատասխան 3'],
      rightAnswers: [0],
      userAnswers: [],
    },
    {
      id: 2,
      questionTitle: 'Հարց 2',
      answers: ['պատասխան 1', 'պատասխան 2', 'պատասխան 3'],
      rightAnswers: [1],
      userAnswers: [],
    },
    {
      id: 3,
      questionTitle: 'Հարց 3',
      answers: ['պատասխան 1', 'պատասխան 2', 'պատասխան 3'],
      rightAnswers: [2],
      userAnswers: [],
    },
  ]
  tests = [
    {
      id: 0,
      questions: this.questions,
      title: 'Դիսկրետ Մաթեմատիկա',
      description: 'test discription1',
      timer: {
        minutes: 0,
        seconds: 45
      },
      date: 'December 20, 2020',
      deadline: 'December 20, 2020',
      maxGrade: 100,
      requiredGrade: 30,
      checkingType: 1,
      result: null,
      status: 1,
      leftTryes: 5,
      tryes: [
        {
          date: '05.16.2020',
          result: '90',
          status: 2
        },
        {
          date: '05.16.2020',
          result: '10',
          status: 3
        },
      ]
    },
    {
      id: 1,
      questions: this.questions,
      title: 'Թեսթ ինչ որ բանի մասին 2',
      description: 'test discription2',
      timer: {
        minutes: 0,
        seconds: 45
      },
      date: 'December 20, 2020',
      deadline: 'December 20, 2020',
      maxGrade: 100,
      requiredGrade: 30,
      checkingType: 2,
      result: '92',
      status: 2,
      leftTryes: 5,
      tryes: [
        {
          date: '05.16.2020',
          result: '90',
          status: 2
        },
        {
          date: '05.16.2020',
          result: '10',
          status: 3
        },
      ]
    },
    {
      id: 2,
      questions: this.questions,
      title: 'Թեսթ ինչ որ բանի մասին 3',
      description: 'test discription3',
      timer: {
        minutes: 0,
        seconds: 45
      },
      date: 'December 20, 2020',
      deadline: 'December 20, 2020',
      maxGrade: 100,
      requiredGrade: 30,
      checkingType: 1,
      result: '5',
      status: 3,
      leftTryes: 5,
      tryes: [
        {
          date: '05.16.2020',
          result: '90',
          status: 2
        },
        {
          date: '05.16.2020',
          result: '10',
          status: 3
        },
      ]
    },
    {
      id: 3,
      questions: this.questions,
      title: 'Թեսթ ինչ որ բանի մասին 4',
      description: 'test discription1',
      timer: {
        minutes: 0,
        seconds: 45
      },
      date: 'December 20, 2020',
      deadline: 'December 20, 2020',
      maxGrade: 100,
      requiredGrade: 30,
      checkingType: 1,
      result: null,
      status: 1,
      leftTryes: 5,
      tryes: [
        {
          date: '05.16.2020',
          result: '90',
          status: 2
        },
        {
          date: '05.16.2020',
          result: '10',
          status: 3
        },
      ]
    },
  ]
  users: User[] = [
    {
      id: 1,
      firstName: 'Անուն1',
      lastName: 'Ազգանուն',
      login: {
        email: 'mail@mail.com'
      },
      phone: '0123456789',
      role: 'user',
      tests: []
    },
    {
      id: 2,
      firstName: 'Անուն2',
      lastName: 'Ազգանուն',
      login: {
        email: 'mail@mail.com'
      },
      phone: '0123456789',
      role: 'user',
      tests: []
    },
    {
      id: 3,
      firstName: 'Անուն3',
      lastName: 'Ազգանուն',
      login: {
        email: 'mail@mail.com'
      },
      phone: '0123456789',
      role: 'user',
      tests: []
    },
  ]

  constructor(private http: HttpClient) { }

  getAllTests() {
    return this.tests;
  }

  getTest(id) {
    return this.tests[id]
  }

  addNewTest(test:Test) {

  }

  removeTest(id) {

  }

  getUsers() {
    return this.users;
  }

  addNewUser() {

  }

  removeUser() {

  }

  updateUser() {

  }

  addCompany() {

  }

  getCompanyInfo() {
    
  }

  getAllQuestions() {
    return this.questions;
  }

  createQuestion(question:Question) {

  }

  updateQuestion(question:Question) {

  }

  removeQuestion(id) {

  }

  uploadProfilePicture(image) {
    console.log(typeof(image)); // string
  }

  sendTestResult(test: Test, currentDate: string) {
    return this.tests
  }

  setUserTests(test:Test, deadline: string, user:User) {

  }

  removeUserTest(test:Test, user:User) {

  }

  // user օբյեկտի մեջ չգրելու համար է, երբ getUser աշխատի, սա էլ պետք չի լինի,
  // մեկ էլ test-page.component.ts֊ում user ֊ի կոնկրետ թեստը ստանալու համար կարող ա պետք գա 
  getUserTests() {
    return this.tests;
  }
  ///////////////////////////////////////////////////////////////////////////

}
