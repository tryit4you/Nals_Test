import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService,
    private toastr:ToastrService
  ) {
    // redirect to home if already logged in
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form?.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form?.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .register(this.form?.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Đăng ký thành công', {
            keepAfterRouteChange: true,
          });
          this.toastr.success("Đăng ký thành công")
          this.router.navigate(['/auth/login'], { relativeTo: this.route });
        },
        (error) => {
          this.toastr.error("Đăng ký không thành công!");
          this.loading = false;
        }
      );
  }
}
