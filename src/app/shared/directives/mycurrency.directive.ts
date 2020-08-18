import { Directive, HostListener, ElementRef, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appMycurrency]'
})
export class MycurrencyDirective implements OnInit {
  private el: any;
  @Input()
  isDecimal = true;
  @Input()
  maxDecimalLength = 2;
  @Input()
  formControl: FormControl;

  constructor(
    private elementRef: ElementRef
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.formatCurrency(this.el.value);
  }

  @HostListener('focus', ['$event.target.value', '$event'])
  onFocus(value, event) {
    // this.el.value = this.formatcurrencypipe.parse(value); // opossite of transform
    if (event.which == 9) {
      return false;
    }
    this.el.select();

  }

  @HostListener('keyup', ['$event'])
  onkeyup(event: KeyboardEvent) {
    // Ensure that it is a number and stop the keypress
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
    if (this.formControl) {
      this.formControl.setValue(this.formatCurrency(this.elementRef.nativeElement.value));
    } else {
      this.elementRef.nativeElement.value = this.formatCurrency(this.elementRef.nativeElement.value);
    }
  }
  @HostListener('valueChanges', ['$event'])
  onChange(event: any) {
    if (this.formControl) {
      this.formControl.setValue(this.formatCurrency(this.elementRef.nativeElement.value));
    } else {
      this.elementRef.nativeElement.value = this.formatCurrency(this.elementRef.nativeElement.value);
    }
  }

  formatCurrency(inputString: string): string {
    if (inputString) {
      let isFractionNumber;
      inputString = inputString.split(',').join('');
      if (inputString[inputString.length - 1] === '.') {
        isFractionNumber = true;
      }
      const isNumber = parseFloat(inputString);
      if (!isNaN(isNumber)) {
        inputString = isNumber.toString();
        let fractionNumber;
        let holeNumber;
        if (inputString.indexOf('.') >= 0) {
          const splited = inputString.split('.');
          holeNumber = splited[0].split(',').join('');
          fractionNumber = splited[1];
          isFractionNumber = true;
        } else {
          holeNumber = inputString.split(',').join('');
        }
        const holeNumberArr = holeNumber.split('').reverse();
        const formattedHoleArr = [];
        for (let i = 0; i < holeNumberArr.length; i++) {
          if ((i > 0) && (i % 3 === 0)) {
            formattedHoleArr.push(',');
          }
          formattedHoleArr.push(holeNumberArr[i]);
        }

        let result = formattedHoleArr.reverse().join('');
        if (isFractionNumber) {
          result = (fractionNumber) ? result + '.' + fractionNumber : result + '.';
        }

        return result;
      } else {
        return '';
      }
    } else {
      return '';
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
