import { Component, OnInit } from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authenticated: boolean;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.url.subscribe((r) => console.log(r));
     this.authService.getAuthStatusListener().subscribe((res) => {
      console.log(res);
      this.authenticated = res;
    });
  }
 openTab(e: MatTabChangeEvent) {
    console.log(e.index);
    switch (e.index) {
      case 0:
        this.router.navigateByUrl('/link-to-qr');
        break;
      case 1:
        this.router.navigateByUrl('/qr-to-link');
        break;
      case 2:
        this.router.navigateByUrl('/my-links');
            break;
    }
 }
}
