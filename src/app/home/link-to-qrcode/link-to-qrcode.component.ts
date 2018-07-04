import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QrService} from '../qr.service';
import {ValidateUrl} from './vaidateUrl';
import {SharedService} from '../../shared/shared.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-link-to-qrcode',
  templateUrl: './link-to-qrcode.component.html',
  styleUrls: ['./link-to-qrcode.component.scss']
})
export class LinkToQrcodeComponent implements OnInit {
  encryptedUrl: string;
  url: string;
  qrForm: FormGroup;
  constructor(private form: FormBuilder, private qrService: QrService,
              private sharedService: SharedService, private authService: AuthService) { }
  ngOnInit() {
    this.initForm();
  }
  generateQrCode() {
    if (!this.qrForm.valid) { return; }
    try {
      const url = this.substringUrl(this.qrForm.value.urlName.toString());
      this.encryptData(url);
       if (this.authService.user) {
         this.postQrUrl(this.qrForm.value.urlName);
       }
    } catch (e) {
      this.sharedService.createNotification('error', 'Something went wrong!', 'Error');
    }
  }
  substringUrl(data) {
    let urlInput  = data;
    const httpSubstring = urlInput.slice(0, 7);
    const httpsSubstring = urlInput.slice(0, 8);
    if ( httpSubstring === 'http://' ) {
      urlInput = urlInput.slice(7, urlInput.length);
    }  else if (httpsSubstring === 'https://') {
      urlInput = urlInput.slice(8, urlInput.length);
    }
    if (urlInput.substring(0, 3) === 'www') {
      urlInput = urlInput.slice(4, urlInput.length);
    }
    this.qrForm.controls['urlName'].setValue(urlInput);
    return urlInput;
  }
  onPrint(element) {
    this.qrService.printQR_Code(element);
  }
  encryptData(urlInput) {
    this.encryptedUrl = this.qrService.encryptData( urlInput);
     if (!this.encryptedUrl) { return; }
    this.url = `www.${urlInput}`;
  }
  postQrUrl(url) {
    this.qrService.addQrUrl(url);

  }
  initForm() {
    this.qrForm = this.form.group({
      'urlName': new FormControl('', [Validators.required, ValidateUrl])
    });
  }
}
