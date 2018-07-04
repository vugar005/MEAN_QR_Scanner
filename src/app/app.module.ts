import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatProgressSpinnerModule,
  MatSelectModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {QRCodeModule} from 'angularx-qrcode';
import {ReactiveFormsModule} from '@angular/forms';
import { LinkToQrcodeComponent } from './home/link-to-qrcode/link-to-qrcode.component';
import { QrcodeToLinkComponent } from './home/qrcode-to-link/qrcode-to-link.component';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {SharedService} from './shared/shared.service';
import {AuthService} from './auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {QrService} from './home/qr.service';
import { MyLinksComponent } from './home/my-links/my-links.component';
import { registerLocaleData } from '@angular/common';
import lcoaleAz from '@angular/common/locales/az-Latn';
registerLocaleData(lcoaleAz);
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ScanSuccessDialogComponent } from './home/scan-success-dialog/scan-success-dialog.component';
import { QrUrlDialogComponent } from './home/qr-url-dialog/qr-url-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LinkToQrcodeComponent,
    QrcodeToLinkComponent,
    LoginComponent,
    SignupComponent,
    MyLinksComponent,
    ScanSuccessDialogComponent,
    QrUrlDialogComponent
  ],
  entryComponents: [
    ScanSuccessDialogComponent,
    QrUrlDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDialogModule,
    HttpClientModule,
    MatMenuModule,
    ReactiveFormsModule,
    QRCodeModule,
    ZXingScannerModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [SharedService, AuthService, QrService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
