import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9 ]*")])
  });


  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

constructor(private user : UserService, private router : Router, private auth : AuthService) { }

  error = false
  response: any

  loginUser() {

    console.warn(this.loginForm.value)

    this.response = this.loginForm.value

   
      this.error = false

      this.user.verifyUser(this.response).subscribe((result:any) => {
     
        if(result["success"]){
          this.auth.login().subscribe(() => {});
          sessionStorage.setItem('key', this.response.email);
          this.router.navigate(['/home']);
        }else{
          this.error = true
          
          alert("Invalid Credentials")
          console.warn("Invalid Credentials")

        }

      })

    
  }


}
