import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QrService} from '../qr.service';
import {User} from '../../auth/models/user.model';

@Component({
  selector: 'app-link-to-qrcode',
  templateUrl: './link-to-qrcode.component.html',
  styleUrls: ['./link-to-qrcode.component.scss']
})
export class LinkToQrcodeComponent implements OnInit {
  qrString: string;
  qrForm: FormGroup;
  constructor(private form: FormBuilder, private qrService: QrService) { }

  ngOnInit() {
    this.initForm();
  }
  generateQrCode() {
    if (this.qrForm.valid) {
      const user: User = JSON.parse(localStorage.getItem('qr_user'));
     if (user) {
       this.encryptWithUserId(user);
     } else {
        this.encryptWithoutUserId();
     }
    }
  }
  encryptWithUserId(user:User) {
    const id: string = user ? user.id.toString() : '0';
    this.qrString = this.qrService.encryptData( this.qrForm.value.urlName,  id);
    this.qrService.addQrUrl(this.qrForm.value.urlName);
  }
  encryptWithoutUserId() {
     this.qrString = this.qrForm.value.urlName;
  }
  initForm() {
    this.qrForm = this.form.group({
      'urlName': new FormControl('', [Validators.required])
    });
  }
}
