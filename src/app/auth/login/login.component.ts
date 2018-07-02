import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  isLoading: boolean;
  constructor(private form: FormBuilder,
              private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loginForm = this.form.group({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }
  login() {
    localStorage.clear();
    this.authService.logout();
    this.isLoading = true;
    if (!this.loginForm.valid) {return; }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((res) => console.log(res), (er) => console.log(er), () => this.isLoading = false);
  }

}
