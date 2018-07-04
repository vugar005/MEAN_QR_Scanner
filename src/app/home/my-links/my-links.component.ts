import { Component, OnInit } from '@angular/core';
import {QrService} from '../qr.service';
import {QrCode} from '../models/qrCode';
import * as printStyles from '../print-styles';
@Component({
  selector: 'app-my-links',
  templateUrl: './my-links.component.html',
  styleUrls: ['./my-links.component.scss']
})
export class MyLinksComponent implements OnInit {
  qrCodes: QrCode[];
  constructor(private qrService: QrService) { }

  ngOnInit() {
    this.getMyLinks();
  }
  getMyLinks() {
    this.qrService.getQrUrls()
      .subscribe((res) => {
        this.qrCodes = res;
      });
  }
  onPrint(element) {
     this.qrService.printQR_Code(element);
  }
  onRemove(id) {
    this.qrService.removeQr(id)
      .subscribe((res) => {
        if (res.message === 'OK') {
         this.qrCodes =  this.qrCodes.filter((q) => q.id !== id);
        }
      }, (er) => console.log(er));
  }
}
