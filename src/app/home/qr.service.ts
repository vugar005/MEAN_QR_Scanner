import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../auth/models/user.model';
import {AuthService} from '../auth/auth.service';
import {Observable, of} from 'rxjs';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {QrCode} from './models/qrCode';
import {environment} from '../../environments/environment';
import * as printStyles from './print-styles';
import {SharedService} from '../shared/shared.service';
declare var require: any;
const CryptoJS = require('crypto-js');
const BACKEND_URL = environment.apiUrl + '/qr';
@Injectable()
export class QrService {
  user: User;
  constructor(private http: HttpClient, private authService: AuthService, private sharedService: SharedService) {}
  addQrUrl(url) {
    this.user = this.getUser();
    const key: string = this.user ? this.user.id.toString() : '0';
    const cipherText = this.encryptData(url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const qrCode = {
        url: cipherText,
         id: key
      };
     this.http.post(`${BACKEND_URL}/add`, qrCode, httpOptions)
       .subscribe((res) => console.log(res), (er) => console.log(er));
  }
  getUser() {
    return this.authService.user;
  }
  getQrUrls(): Observable<QrCode[]> {
    this.user = this.getUser();
    const id: string = this.user ? this.user.id.toString() : '0';
    return this.http.get(`${BACKEND_URL}/${id}`)
      .pipe(
        map((res: any) => res.result.map((qr) => this.mapQrCode(qr)))
      );
  }
  private mapQrCode(data): QrCode {
    const qrCode: QrCode = <QrCode>{
      id: data._id,
      url: this.decyptData(data.url),
      encryptedUrl: data.url,
      date: data.date,
      author: data.author && {id: data.author._id, name: data.author.email}
    };
    return qrCode;
  }
    encryptData(data) {
       try {
         const  ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '123');
        return ciphertext.toString();
       } catch (er) {
         this.sharedService.createNotification('error', 'Error on encoding', 'OOPS');
         return;
       }
  }
   decyptData(cipherText): string {
     try {
       const bytes  = CryptoJS.AES.decrypt(cipherText.toString(), '123');
       return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
     } catch (er) {
       console.log(er)
       this.sharedService.createNotification('error', 'Error on scanning', 'OOPS');
       return;
     }
  }
  removeQr(id): Observable<any> {
    return this.http.delete(`${BACKEND_URL}/${id}`)
      .pipe(
        shareReplay(),
        catchError((er) => {
          return of(this.sharedService.createNotification('error', 'Error on deleting url', 'OOPS'));
        })
      );
  }
  printQR_Code(element: HTMLElement) {
    const mywindow = window.open('', 'PRINT', 'height=400,width=600');
    mywindow.document.write(`<html><head><title>${document.title}</title>`);
    mywindow.document.write(`<style>${printStyles.styles}</style>`);
    mywindow.document.write('</head><body>');
    mywindow.document.write(element.innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
  }
  getWebsiteScreenShot(url) {
    return this.http.get(`http://api.whoapi.com/?apikey=e5ded4c6688fceb8935892d2c27738a1&r=screenshot&
    domain=${url}&process=thumb&resolution=1024x768&asap=&node_geo=&delay=&thumbwidth=&thumbheight=`)
      .pipe(
        map((res: any) => res.full_size)
      );
  }
}
