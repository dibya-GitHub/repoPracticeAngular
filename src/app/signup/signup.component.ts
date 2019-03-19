import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required], 
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      re_password: ['', Validators.required],
      birthDate: ['', Validators.required],
      phoneNumber: ['', Validators.required],

    });
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
  }
}
