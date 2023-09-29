import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
    lname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9 ]*")]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9 ]*")]),
  });

  get fname() { return this.registerForm.get('fname') }
  get lname() { return this.registerForm.get('lname') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get confirmPassword() { return this.registerForm.get('confirmPassword') }

  constructor(private user: UserService, private router: Router) { }


  error = false
  response: any
  registerUser() {
    console.warn(this.registerForm.value)
    this.response = this.registerForm.value
    if (this.response["password"] == this.response["confirmPassword"]) {

      let body = {
        "fname": this.response["fname"],
        "lname": this.response["lname"],
        "email": this.response["email"],
        "password": this.response["password"]
      }

      this.user.registerUser(body).subscribe((result: any) => {
        if (result["success"]) {
          this.router.navigate(['/home'])
        } else {
          
          alert(result["message"])

        }
      })
      
    }
    else {
      this.error = true
      alert("Password not matched")
    }
  }


}
