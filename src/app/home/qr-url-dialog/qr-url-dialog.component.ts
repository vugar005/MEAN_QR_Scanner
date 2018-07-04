import {Component, Inject, OnInit} from '@angular/core';
import {QrService} from '../qr.service';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-qr-url-dialog',
  templateUrl: './qr-url-dialog.component.html',
  styleUrls: ['./qr-url-dialog.component.scss']
})
export class QrUrlDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private qrService: QrService) { }

  ngOnInit() {
  }

}
