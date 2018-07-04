import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../auth/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   authenticated: boolean;
   user: User;
  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.authService.getAuthStatusListener().subscribe((res) => {
      console.log(res);
      this.authenticated = res;
    });
   this.user = this.authService.user;
  }
  onLogout() {
    this.authService.logout();
  }

}
