import {Component, OnInit, ViewChild} from '@angular/core';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';

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
  constructor() { }

  ngOnInit() {
    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }
  onCamerasFound(cameras: MediaDeviceInfo[]) {
    console.log('cameras');
   if (cameras) {
     console.log(cameras)
     this.hasCameras = true;
     this.selectedDevice = cameras[0];
   }
  }
  handleQrCodeResult(resultString: string) {
    alert( resultString);
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selectedValue: string) {
    console.log('Selection changed: ', selectedValue);
    this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  }
  onScanError() {
 //   alert('error happened during scanning');
  }
}
