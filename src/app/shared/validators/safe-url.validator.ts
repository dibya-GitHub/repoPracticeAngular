import { AbstractControl, ValidatorFn } from "@angular/forms";

export function safeUrlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value.startsWith("https")) {
      return { validUrl: true };
    }
    return null;
  };
}
