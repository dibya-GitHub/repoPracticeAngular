import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-maintainance',
  templateUrl: './error-maintainance.component.html',
  styleUrls: ['./error-maintainance.component.css']
})
export class ErrorMaintainanceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToHome() {
    this.router.navigate(['/'])
  }
}
