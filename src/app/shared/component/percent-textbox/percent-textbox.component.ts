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
  selector: "app-percent-textbox",
  templateUrl: "./percent-textbox.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PercentTextboxComponent),
      multi: true,
    },
  ],
})
export class PercentTextboxComponent implements OnInit, ControlValueAccessor {
  @Input() percent: any;
  @Input() disabled: boolean;
  @Input() placeholder: string;
  @Input() showPercentSymbol = true;
  @Output() blur: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() max: any = 100;

  onChange: (percent: any) => {};
  onTouch: () => {};

  constructor() {}

  ngOnInit() {}

  writeValue(obj: string): void {
    if (obj != null) {
      this.percent = obj;
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
    if (!this.percent) {
      this.percent = 0;
    }
    this.onChange(this.percent);
    this.blur.emit(true);
  }
}
