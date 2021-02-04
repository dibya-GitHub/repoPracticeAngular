import { Component, OnInit, forwardRef } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-toggle-button",
  templateUrl: "./toggle-button.component.html",
  styleUrls: ["./toggle-button.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true,
    },
  ],
})
export class ToggleButtonComponent implements OnInit, ControlValueAccessor {
  @Input() checked: boolean;
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() label: string;
  @Input() isDisabled: boolean;

  onChange: (isChecked: boolean) => {};
  onTouch: () => {};

  constructor() {}

  ngOnInit() {}

  writeValue(obj: boolean): void {
    this.checked = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onClicked(event) {
    if (!this.isDisabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
    }
  }

  onChanged() {
    this.onChange(this.checked);
  }
}
