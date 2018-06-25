import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   authStatus: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authStatus = this.authService.getAuthStatusListener().subscribe((res) => {
      console.log(res);
      this.authStatus = res;
    });
  }
  onLogout() {
    this.authService.logout();
  }

}
