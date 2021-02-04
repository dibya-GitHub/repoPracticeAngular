import { AbstractControl } from "@angular/forms";

export function ZeroValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (control.value == 0) {
    return { isZero: true };
  }
  return null;
}
