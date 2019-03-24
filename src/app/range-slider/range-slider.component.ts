import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css'],
  encapsulation:ViewEncapsulation.None 
})
export class RangeSliderComponent implements OnInit {
  value:number = 0;
  
  constructor() { }

  ngOnInit() {
  }
  rangeSliderFn(val){
    this.value = val;
  }

}
