import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  redirect = '/';

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.redirect = queryParamMap.get('redirect') || '/';
      console.log(this.redirect);
    });
  }

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
        // this.router.navigateByUrl('/');
        this.router.navigateByUrl(this.redirect);
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 401) {
          alert('登入失敗')
        }
      },
    });
  }
}
