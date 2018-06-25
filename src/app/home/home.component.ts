import { Component, OnInit } from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe((r) => console.log(r));
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
