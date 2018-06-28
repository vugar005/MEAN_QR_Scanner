import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   authenticated: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.authService.getAuthStatusListener().subscribe((res) => {
      console.log(res);
      this.authenticated = res;
    });
  }
  onLogout() {
    this.authService.logout();
  }

}
