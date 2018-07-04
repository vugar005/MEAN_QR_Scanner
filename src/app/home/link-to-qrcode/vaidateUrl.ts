import { AbstractControl } from '@angular/forms';

export function ValidateUrl(control: AbstractControl) {
  if (!control.value.includes('.') ||
    ((control.value.substring(0, 3) === 'wwww' ) && control.value.length() === 3) ) {
    return { validUrl: true };
  }
  return null;
}
