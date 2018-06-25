import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {HomeComponent} from './home/home.component';
import {LinkToQrcodeComponent} from './home/link-to-qrcode/link-to-qrcode.component';
import {QrcodeToLinkComponent} from './home/qrcode-to-link/qrcode-to-link.component';
import {MyLinksComponent} from './home/my-links/my-links.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', component: HomeComponent, children: [
      {path: 'link-to-qr', component: LinkToQrcodeComponent},
      {path: 'qr-to-link', component: QrcodeToLinkComponent},
      {path: 'my-links', component: MyLinksComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
