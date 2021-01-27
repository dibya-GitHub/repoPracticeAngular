import { Directive, ElementRef, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Directive({
  selector: '[appPercentage]'
})
export class PercentageDirective {

  private regex: RegExp = new RegExp(/^(\d{0,3}(\.\d{1,7})?|999(\.0{0,7})?)$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Delete', 'ArrowLeft', 'ArrowRight', '.'];

  constructor(private el: ElementRef, @Inject(DOCUMENT) document: Document) {

  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const input = this.el.nativeElement;
    let current: string = input.value;

    let next: string;
    if (input.selectionStart === input.selectionEnd) {
      next = current.concat(event.key);
    } else {
      next = current.replace(current.slice(input.selectionStart, input.selectionEnd), event.key);
    }

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event'])
  onblur(event: KeyboardEvent) {
    let current: string = this.el.nativeElement.value;
    if (current.indexOf(".") == 0) {
      current = "0".concat(current);
    }
    this.el.nativeElement.value = current;
  }
}
