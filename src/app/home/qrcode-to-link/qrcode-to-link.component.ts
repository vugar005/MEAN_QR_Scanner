import {Component, OnInit, ViewChild} from '@angular/core';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';
import {QrService} from '../qr.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

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
  decodeForm: FormGroup;
  constructor(private qrService: QrService,
              private form: FormBuilder
              ) { }

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
    this.initForm();
  }
  initForm() {
    this.decodeForm = this.form.group({
      'code': new FormControl('')
    });
  }
  onManualDecode() {
    this.handleQrCodeResult(this.decodeForm.value.code)
  }
  onCamerasFound(cameras: MediaDeviceInfo[]) {
    console.log('cameras');
   if (cameras) {
     console.log(cameras);
     this.hasCameras = true;
     const rearCamera = cameras.find(c => c.label.includes('back'));
     if (rearCamera) {
       this.selectedDevice = rearCamera;
       return ;
     }
        this.selectedDevice = cameras[0];
   }
  }
  handleQrCodeResult(resultString: string) {
    const result: string = this.decodeQrCode(resultString);
    if (result) {
      window.location.assign(`http://${result}`);
      // const dialogRef = this.dialog.open(ScanSuccessDialogComponent, {
      //   data: {
      //     url: result
      //   }
      // });
      // dialogRef.afterClosed().subscribe((res: boolean) => {
      //   if (res) {
      //     window.location.assign(`http://${result}`);
      //   }
      // } );
    }
  }
  decodeQrCode(data: string) {
    return this.qrService.decyptData(data);
  }
  onDeviceSelectChange(selectedValue: string) {
    console.log('Selection changed: ', selectedValue);
    this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  }
  onScanError() {
  }
}
