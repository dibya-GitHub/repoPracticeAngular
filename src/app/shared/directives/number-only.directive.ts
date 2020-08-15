import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NullTemplateVisitor } from '@angular/compiler';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[numberOnly]'
})
export class NumberOnlyDirective {

  @Input()
  minValue: string;
  @Input()
  maxValue: string;
  @Input()
  isDecimal: boolean;
  @Input()
  maxDecimalLength: number;

  @Input()
  formControl: FormControl;

  constructor(public elementRef: ElementRef) { }

  public regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
  public specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowRight', 'ArrowLeft', 'Delete'];

  @HostListener('change', ['$event'])
  public onChange(event) {
    console.log('change', event)
  }
  @HostListener('input', ['$event'])
  public onInput(event) {
    console.log('input', event)
  }
  @HostListener('valueChanges', ['$event'])
  onValueChange(event: any) {
    console.log('value chagne ', event)
  }
  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const currentValue: string = this.elementRef.nativeElement.value;
    let enteredValue: string;
    if (this.elementRef.nativeElement.selectionStart === this.elementRef.nativeElement.selectionEnd) {
      enteredValue = currentValue.concat(event.key);
    } else {
      enteredValue = event.key;
    }
    if (enteredValue && !String(enteredValue).match(this.regex)) {
      event.preventDefault();
      return;
    }

    const enteredNum = parseFloat(enteredValue);
    const minNum = (this.minValue) ? parseFloat(this.minValue) : this.minValue;
    const maxNum = (this.maxValue) ? parseFloat(this.maxValue) : this.maxValue;
    // Check for decimal length.
    const splitArr = enteredValue.split('.');
    if (this.isDecimal && this.maxDecimalLength > 0 && (splitArr.length > 1)) {
      let decimalPart = splitArr[1];
      if (decimalPart.length > this.maxDecimalLength) {
        event.preventDefault();
        return;
      }
    }
    //Check for Min value
    if (this.minValue && (minNum > enteredNum)) {
      event.preventDefault();
      return;
    }
    // Check for Max value
    if (this.maxValue && (maxNum < enteredNum)) {
      event.preventDefault();
      return;
    }
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    if (this.isDecimal && this.maxDecimalLength > 0) {

      let inputString = this.elementRef.nativeElement.value;
      inputString = (inputString) ? inputString : '0';
      const splitArr = inputString.split('.');
      if (splitArr.length > 1) {
        let decimalPart = splitArr[1];
        if (decimalPart.length < this.maxDecimalLength) {
          const lengthDiff = this.maxDecimalLength - decimalPart.length;
          for (let i = 0; i < lengthDiff; i++) {
            decimalPart += '0';
          }
          inputString = splitArr[0] + '.' + decimalPart;
        } else {
          return;
        }
      } else {
        let decimalPart = '';
        for (let i = 0; i < this.maxDecimalLength; i++) {
          decimalPart += '0';
        }
        inputString = inputString + '.' + decimalPart;
      }

      if (this.formControl) {
        this.formControl.setValue(inputString);
      } else {
        this.elementRef.nativeElement.value = inputString;
      }

    }
  }
}
