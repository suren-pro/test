import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  form: FormGroup ;

  constructor(private router:Router, private authService: AuthService,) { }

  ngOnInit(): void {

    // if(localStorage.getItem('token')){
    //   this.authService.getUser().subscribe((res: User) => {
    //     if(res.role == 'admin') {
    //       this.router.navigateByUrl('admin');
    //     }else {
    //       if(res.role == 'user') {
    //         this.router.navigateByUrl('user');
    //       }
    //     }
    //   })
    // };

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  OnLogin() {
    const email = this.form.value.email;
    const password = this.form.value.password
    if(email == 'user@mail.com'){
      this.router.navigateByUrl('user')
    };
    if(email == 'admin@mail.com'){
      this.router.navigateByUrl('admin')
    }
    document.getElementById('closeLoginButton').click();
  }

  // OnLogin() {
  //   const email = this.form.value.email;
  //   const password = this.form.value.password
  //   this.authService.logIn(email, password).subscribe((res)=>{
  //     localStorage.setItem('token', res.headers.get('token'));
  //     if(res.headers.get('role') == 'admin') {
  //       this.router.navigateByUrl('admin');
  //       document.getElementById('closeLoginButton').click();
  //     }else {
  //       if(res.headers.get('role') == 'user') {
  //         this.router.navigateByUrl('user');
  //         document.getElementById('closeLoginButton').click();
  //       }
  //     };
  //   },
  //   (error) => {
  //     console.log(error.error);
  //     if(error.status == 400) {
  //       alert(error.error)
  //     }
  //   }
  //   )
  // }

}
