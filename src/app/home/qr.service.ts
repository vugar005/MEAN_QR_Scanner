import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../auth/models/user.model';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {QrCode} from './models/qrCode';
import {environment} from '../../environments/environment';
declare var require: any;
const CryptoJS = require('crypto-js');
const BACKEND_URL = environment.apiUrl + '/qr';
@Injectable()
export class QrService {
  user: User;
  constructor(private http: HttpClient, private authService: AuthService) {}
  addQrUrl(url) {
    this.user = this.getUser();
    const key: string = this.user ? this.user.id.toString() : '0';
    const cipherText = this.encryptData(url, key);
    console.log(cipherText);
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
      date: data.date,
      author: data.author && {id: data.author._id, name: data.author.email}
    };
    return qrCode;
  }
    encryptData(data, key: string) {
       const  ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '123');
       return ciphertext.toString();
  }
   decyptData(cipherText) {
      const bytes  = CryptoJS.AES.decrypt(cipherText.toString(), '123');
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  removeQr(id): Observable<any> {
    return this.http.delete(`${BACKEND_URL}/${id}`);
  }
}
