import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoDecimal]'
})
export class NoDecimalDirective {
  private regexNoDecimel: RegExp = new RegExp(/^\d+$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Delete', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) {

  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regexNoDecimel)) {
      event.preventDefault();
    }
  }

}

