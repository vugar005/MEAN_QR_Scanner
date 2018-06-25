import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../auth/models/user.model';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {QrCode} from './models/qrCode';
declare var require: any;
const CryptoJS = require('crypto-js');
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
    this.http.post('http://localhost:3000/api/qr/add', qrCode, httpOptions)
      .subscribe((res) => console.log(res), (er) => console.log(er));
  }
  getUser() {
    return this.authService.user;
  }
  getQrUrls(): Observable<QrCode[]> {
    this.user = this.getUser();
    const id: string = this.user ? this.user.id.toString() : '0';
    return this.http.get(`http://localhost:3000/api/qr/${id}`)
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
    const  ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key);
    return ciphertext.toString();
  }
  private decyptData(cipherText) {
    const bytes  = CryptoJS.AES.decrypt(cipherText.toString(), this.user.id.toString());
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  removeQr(id): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/qr/${id}`);
  }
}
