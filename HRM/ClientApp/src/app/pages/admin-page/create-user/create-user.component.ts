import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/models/company.model';
import { Test } from 'src/app/shared/models/test.model';
import { User } from 'src/app/shared/models/user.model';
import { TestingDataService } from 'src/app/shared/services/testing-data.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  users: User[];
  newUserToggle:boolean = true;
  currentUser: User;
  searchUser:string;
  showedUsers: User[];
  tests: Test[];
  deadline: string;
  currentUser2: User;
  companyName:string;
  companyLogoBase64:  string | ArrayBuffer;
  newCompany: Company;

  constructor(private testingDataService: TestingDataService) { }

  ngOnInit(): void {
    this.tests = this.testingDataService.getAllTests();
    // this.testingDataService.getAllTests().subscribe((res: Test[]) => {
    //   this.tests = res;
    // })
    this.users = this.testingDataService.getUsers()
    // this.testingDataServce.getUsers().subscribe((res) => {
    //   this.users = res
    //   console.log(this.users);
    // })
  }

  closeNewUserModal(event) {
    if(event) {
      document.getElementById('closeNewUserModal').click();
    }
  }

  closeUpdateModal(event) {
    if(event) {
      document.getElementById('closeUpdateUserModal').click();
    }
  }

  removeUser(id) {
    // this.testingDataServce.removeUser(id).subscribe((res) => {
    //   console.log(res);
    // });
  }

  openUserInfo(i) {
    let id = 'user' + i;
    if(document.getElementById(id).style.display == "" || document.getElementById(id).style.display == 'none') {
      document.getElementById(id).style.display = 'block'
    } else {
      document.getElementById(id).style.display = 'none'
    }
  }

  addNewUserInArray(newUser) {
    this.users.push(newUser);
  }

  userSearch() {
    if(!this.searchUser) {
      return this.users
    }else {
      return this.users.filter(el => el.firstName.includes(this.searchUser) || el.lastName.includes(this.searchUser));
    }
  }

  setDeadline(date) {
    this.deadline = date;
  }

  alreadyAdded(test: Test) {
    if(this.currentUser2) {
      if(this.currentUser2.tests.find(el => el.id == test.id)) {
        return true;
      }else {
        return false;
      } 
    }
  }

  onSetUserTest(test: Test) {
    this.testingDataService.setUserTests(test, this.deadline, this.currentUser2);
  }

  onRemoveUserTest(test:Test) {
    this.testingDataService.removeUserTest(test, this.currentUser2)
  }

  onLogoUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.companyLogoBase64 = reader.result;
      // this.testingDataService.uploadProfilePicture(this.imageBase64)
      // this.imageString = btoa(reader.result.toString())
    };
    reader.readAsDataURL(file);
  }

  createCompany() {
    this.newCompany = {
      title: this.companyName,
      logo: this.companyLogoBase64
    }
  }

}
