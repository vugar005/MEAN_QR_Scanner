import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {transition, trigger, useAnimation} from '@angular/animations';
import {flipInY } from 'ngx-animate';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('flipInY', [transition('* => *', useAnimation(flipInY))])
  ],
})
export class HomeComponent implements OnInit {
  authenticated: boolean;
  links = [
    {path: '/link-to-qr', label: 'Link To QR' },
    {path: '/qr-to-link', label: 'QR To URL' }
  ];
  flipInY = false;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.url.subscribe((r) => console.log(r));
     this.authService.getAuthStatusListener().subscribe((res) => {
      console.log(res);
      this.authenticated = res;
    });
  }
  onRouteChange() {}
}
