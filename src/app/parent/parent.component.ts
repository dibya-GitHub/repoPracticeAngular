import { Component, OnInit } from '@angular/core';
import { RestcountriesService } from '../restcountries.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  restCountriesData: any;
  constructor(private restcountries: RestcountriesService) { }

  ngOnInit() {
    this.restcountries.getCountries().subscribe((res) => {
      this.restCountriesData = res;
    });
  }
}
