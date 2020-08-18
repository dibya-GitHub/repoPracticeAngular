import { Directive, HostListener, Input, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  @Input() formGroup: NgForm;
  constructor(private el: ElementRef) { }
  ngAfterViewInit(): void {
    const inputChildren: any[] = this.el.nativeElement.querySelectorAll('input');
    for (let index = 0; index < inputChildren.length; index++) {
      const inputChild = inputChildren[index];
      if (!(inputChild.readOnly || inputChild.disabled)) {
        inputChild.focus();
        break;
      }
    }
  }
}
