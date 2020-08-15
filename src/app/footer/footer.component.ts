import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  fullYear: number;
  constructor() { }

  ngOnInit() {
    this.fullYear = new Date().getFullYear();
  }

}
