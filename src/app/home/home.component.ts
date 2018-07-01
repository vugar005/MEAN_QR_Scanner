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
  links = [
    {path: '/link-to-qr', label: 'Link To QR Code' },
    {path: '/qr-to-link', label: 'QR To URL Link' },
    {path: '/my-links', label: 'My Links' }
  ];
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.url.subscribe((r) => console.log(r));
     this.authService.getAuthStatusListener().subscribe((res) => {
      console.log(res);
      this.authenticated = res;
    });
  }
}
