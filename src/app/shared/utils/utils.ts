import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

export class Utils {
  public static formatMilliSecToDate(milliseconds) {
    if (milliseconds) {
      return moment(milliseconds).format("DD-MM-YYYY HH:mm");
    }
    return '';
  }
  public static validateAllFormFields(formGroup: FormGroup) {
    window.scrollTo(0, 0);
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormArray) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
