import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationHelperService {
  constructor() {}

  validateAllFormFields(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        this.validateAllFormFields(control as FormArray);
      }
    });
  }
}
