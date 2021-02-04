import {
  Component,
  OnInit,
  forwardRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-numeric-textbox",
  templateUrl: "./numeric-textbox.component.html",
  styleUrls: ["./numeric-textbox.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumericTextboxComponent),
      multi: true,
    },
  ],
})
export class NumericTextboxComponent implements OnInit, ControlValueAccessor {
  @Input() amount: any;
  @Input() disabled: boolean;
  @Input() min: any;
  @Input() max: any;
  @Input() placeholder: string;
  @Output() blur: EventEmitter<boolean> = new EventEmitter<boolean>();

  onChange: (amount: any) => {};
  onTouch: () => {};
  decimals = 0;
  format = "0,0.";

  constructor() {}

  ngOnInit() {
    this.decimals = 2;
    for (let index = 0; index < this.decimals; index++) {
      this.format += "0";
    }
  }

  writeValue(obj: string): void {
    if (obj != null) {
      this.amount = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  onBlur() {
    if (!this.amount) {
      this.amount = 0;
    }
    this.onChange(this.amount);
    this.blur.emit(true);
  }
}
