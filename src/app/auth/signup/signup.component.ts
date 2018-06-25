import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpFom: FormGroup;
  hide = true;
  hide2 = true;
  isLoading: boolean;
  constructor(private form: FormBuilder,
              private authService: AuthService) {
             }

  ngOnInit() {
    this.signUpFom = this.form.group({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    });
  }
  submit(e) {
    this.signUpFom.controls['recapture'].setValue(e);
  }
  signUp() {
    this.isLoading = true;
    if (!this.signUpFom.valid) {return; }
    console.log(this.signUpFom);
    this.isLoading = true;
    this.authService.createUser(this.signUpFom.value.email, this.signUpFom.value.password);
  }
}
