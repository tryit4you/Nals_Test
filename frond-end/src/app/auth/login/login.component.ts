import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { User } from '../../model/user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService,
    private toastr: ToastrService
  ) {
    // redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main/trang-chu';
  }
  register() {
    this.router.navigate(['/auth/register']);
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm?.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm?.invalid) {
      return;
    }
    let userModel = <User>{
      username: this.f?.username.value,
      password: this.f?.password.value,
    };
    this.loading = true;
    this.authService.login(userModel).subscribe(
      (res: any) => {
        debugger;
        switch (res.status) {
          case 200:
            let token = res.body.token;
            //user info
            let user = res.body.user;
            this.authService.saveToken(token);
            this.authService.saveUserInfo(JSON.stringify(user));
            this.toastr.success('Đăng nhập thành công');
            break;

          case 401:
        this.toastr.error("Tên tài khoản hoặc mật khẩu không đúng");

            break;

          case 400:
        this.toastr.error("Tên tài khoản hoặc mật khẩu không đúng");

            break;
        }
        debugger;
        this.router.navigate([this.returnUrl]);
      },
      (error: any) => {
        this.toastr.error("Tên tài khoản hoặc mật khẩu không đúng");
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }
}
