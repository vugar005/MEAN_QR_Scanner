import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatProgressSpinnerModule,
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LinkToQrcodeComponent,
    QrcodeToLinkComponent,
    LoginComponent,
    SignupComponent,
    MyLinksComponent
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
    HttpClientModule,
    ReactiveFormsModule,
    QRCodeModule,
    ZXingScannerModule,
  ],
  providers: [SharedService, AuthService, QrService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
