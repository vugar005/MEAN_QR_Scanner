import {Component, OnInit, ViewChild} from '@angular/core';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';
import {QrService} from '../qr.service';

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
  constructor(private qrService: QrService) { }

  ngOnInit() {
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
    const res = this.qrService.decyptData(resultString);
    alert( res);
    this.qrResultString = res;
  }

  onDeviceSelectChange(selectedValue: string) {
    console.log('Selection changed: ', selectedValue);
    this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  }
  onScanError() {
 //   alert('error happened during scanning');
  }
}
