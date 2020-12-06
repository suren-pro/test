import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/shared/models/test.model';
import { TestingDataService } from 'src/app/shared/services/testing-data.service';
import { Router } from '@angular/router';
import { TestStatus } from 'src/app/shared/enums/status';
import { TestCheckingType } from 'src/app/shared/enums/TestCheckingType';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.scss']
})
export class UserHomePageComponent implements OnInit {
  statusEnumList = TestStatus;
  testCheckingTypeEnumList = TestCheckingType;
  user:User;

  constructor(private testingDataService: TestingDataService,
              private router:Router) { }

  ngOnInit(): void {
    // this.authService.getUser().subscribe((res: User) => {
    //   this.user = res;
    // })
    this.user = {
      id: 1,
      firstName: 'Տիգրան',
      lastName: 'Մեծ',
      login: {
        email: 'tigrangreate@mail.com'
      },
      phone: '12345',
      role: 'user',
      tests: this.testingDataService.getUserTests(),
      profilePic: ''
    }
  }

  gotoTest(testID) {
    this.router.navigate(['user/test'], { queryParams: { testID } })
  }

  gotoTestLearn(testID) {
    this.router.navigate(['user/learn'], { queryParams: { testID } })
  }

  show(i, str) {
    let id = i+str
    if(document.getElementById(id).style.display == "" || document.getElementById(id).style.display == 'none') {
      document.getElementById(id).style.display = 'block'
    } else {
      document.getElementById(id).style.display = 'none'
    }
  }

}
