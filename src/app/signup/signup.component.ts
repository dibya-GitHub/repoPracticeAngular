import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  profileForm: FormGroup;
  submitted:boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.compose([Validators.required,Validators.minLength(6)])],
      re_password: ['', Validators.compose([Validators.required])],
      birthDate: ['', Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required,Validators.maxLength(10)])]
    });
  }
  get form(){
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // if(this.profileForm.invalid){
    //   return true;
    // } 
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
    console.log(this.profileForm.controls);
  } 
}
