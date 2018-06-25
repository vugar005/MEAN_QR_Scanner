import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {
  constructor( private router: Router) {
  }

  // createNotification(type: string, message: string, title = '') {
  //   switch (type) {
  //     case 'success':
  //       this.snotifyService.success(message, title, {
  //         timeout: 3000,
  //         showProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true
  //       });
  //       break;
  //     case 'error':
  //       this.snotifyService.error(message, title, {
  //         timeout: 3000,
  //         showProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true
  //       });
  //       break;
  //     case 'warning':
  //       this.snotifyService.warning(message, title, {
  //         timeout: 3000,
  //         showProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true
  //       });
  //       break;
  //   }
  // }
  //
  // createError(er) {
  //   return of(this.snotifyService.error(er, 'Error', {
  //     timeout: 3000,
  //     showProgressBar: false,
  //     closeOnClick: false,
  //     pauseOnHover: true
  //   }));
  // }
  //
  // handleError(res) {
  //   if (res.status === 'success') {
  //     return;
  //   }
  //   if (res.status === 'logout') {
  //     this.router.navigateByUrl('/signin');
  //     throw new Error('unauthorized');
  //   }
  //   return this.createError(res.message);
  // }
}
