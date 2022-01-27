import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginInfo = {
    email: '',
    password: '',
  };

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    // this.loginService.login(this.loginInfo).subscribe(result => {
    //   console.log(result);
    //   localStorage.setItem('token', result.user.token);
    //   this.router.navigateByUrl('/');
    // });

    this.loginService.login(this.loginInfo).subscribe({
      next: (result) => {
        console.log(result);
        localStorage.setItem('token', result.user.token);
        this.router.navigateByUrl('/');
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 401) {
          alert('登入失敗')
        }
      },
    });
  }
}
