import {Component, OnInit, ViewChild} from '@angular/core';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';
import {QrService} from '../qr.service';
import {MatDialog} from '@angular/material';
import {ScanSuccessDialogComponent} from '../scan-success-dialog/scan-success-dialog.component';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-qrcode-to-link',
  templateUrl: './qrcode-to-link.component.html',
  styleUrls: ['./qrcode-to-link.component.scss']
})
export class QrcodeToLinkComponent implements OnInit {
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  constructor(private qrService: QrService, private dialog: MatDialog, private sharedService: SharedService) { }

  ngOnInit() {
    // setTimeout(() => {
    //   this.dialog.open(ScanSuccessDialogComponent, {
    //     data: {
    //       url: 'www.pixabay.com'
    //     }
    //   });
    // }, 500)
    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }
  onCamerasFound(cameras: MediaDeviceInfo[]) {
    console.log('cameras');
   if (cameras) {
     console.log(cameras);
     this.hasCameras = true;
      if (cameras[1]) {
        this.selectedDevice = cameras[1];
      } else {
        this.selectedDevice = cameras[0];
      }
   }
  }
  handleQrCodeResult(resultString: string) {
    const result: string = this.qrService.decyptData(resultString);
    if (result) {
      const dialogRef = this.dialog.open(ScanSuccessDialogComponent, {
        data: {
          url: result
        }
      });
      dialogRef.afterClosed().subscribe((res: boolean) => {
        if (res) {
          window.location.assign(`http://${result}`);
        }
      } );
    }
  }

  onDeviceSelectChange(selectedValue: string) {
    console.log('Selection changed: ', selectedValue);
    this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  }
  onScanError() {
  }
}
