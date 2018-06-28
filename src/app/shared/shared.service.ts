import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Injectable()
export class SharedService {
  constructor(private router: Router,
              private notifications: NotificationsService
  ) {}

  createNotification(type: string, message: string, title = '') {
    this.notifications.create(title, message, type, {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }
}
