import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { TestingDataService } from 'src/app/shared/services/testing-data.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  form: FormGroup;

  @Output() closeNewUserModal: EventEmitter<boolean> = new EventEmitter();
  @Output() closeUpdateModal: EventEmitter<boolean> = new EventEmitter();
  @Input() newUserToggle:boolean;
  @Input() currentUser: User;
  @Output() newUser: EventEmitter<User> = new EventEmitter();
  updateToggle:boolean = false;
  passwordErrorToggle:boolean = false;

  constructor(private testingDataService: TestingDataService) { }

  ngOnChanges(chages: SimpleChanges) {
    if(chages.newUserToggle) {
      this.ngOnInit();
    }
    if(this.currentUser) {
      this.updateToggle = true;
      this.form = new FormGroup({
        firstname: new FormControl(this.currentUser.firstName, [Validators.required]),
        lastname: new FormControl(this.currentUser.lastName, [Validators.required]),
        email: new FormControl(this.currentUser.login.email, [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        phone: new FormControl(this.currentUser.phone, [Validators.required]),
        // position: new FormControl(this.currentUser.position, [Validators.required]),
        // department: new FormControl(this.currentUser.department.id, [Validators.required]),
        role: new FormControl(this.currentUser.role)
      })

    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      role: new FormControl('user')
    })
  }

  addNewUser() {
    const newUser: User = {
      firstName: this.form.value.firstname,
      lastName: this.form.value.lastname,
      login: {
        email: this.form.value.email,
        password: this.form.value.password,
      },
      phone: this.form.value.phone,
      role: this.form.value.role,
    }
    if(!this.updateToggle) {
      // this.testingDataService.addNewUser(newUser);
      // this.testingDataService.addNewUser(newUser).subscribe((res) => {
      //   console.log(res);
      //   this.newUser.emit(newUser)
      // });
      console.log(newUser);
      this.closeNewUserModal.emit(true)
    }else {
      if(this.form.value.password == "") {
        this.passwordErrorToggle = true;
      }else {
        // this.testingDataService.updateUser(newUser, this.currentUser.id);
        // this.testingDataService.updateUser(newUser, this.currentUser.id).subscribe((res) => {
        //   res...
        // });
        console.log(newUser);
        this.closeUpdateModal.emit(true);
      }
    }    
  }

  closeModal() {
    if(!this.updateToggle) {
      this.closeNewUserModal.emit(true)
    }else {
      this.closeUpdateModal.emit(true)
    }
  }

}
