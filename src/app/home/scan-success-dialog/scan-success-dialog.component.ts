import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {QrService} from '../qr.service';

@Component({
  selector: 'app-scan-success-dialog',
  templateUrl: './scan-success-dialog.component.html',
  styleUrls: ['./scan-success-dialog.component.scss']
})
export class ScanSuccessDialogComponent implements OnInit {
  url: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer, private qrService: QrService) { }

  ngOnInit() {
   console.log(this.data.url);
   // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`http://${this.data.url}?${Math.floor(Math.random() * 1000)}`);
  }
  getWebsiteScreenShot() {
    this.qrService.getWebsiteScreenShot(this.data.url)
      .subscribe((url) => {
       return url;
      });
  }

}
