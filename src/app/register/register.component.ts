import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = new User();
  constructor(private authService : AuthService, private _router : Router) { }

  ngOnInit() {
  }

  registerUser()
  {
    this.authService.registerUserService(this.registerUserData).subscribe(
      res =>  

      {
        localStorage.setItem('token',res.token)
        this._router.navigate(['/special'])
    
    },

    err => {
      if( err instanceof HttpErrorResponse ) {
        if (err.status === 401) {
          alert('email already exists')
          this.registerUserData.email="";
          this.registerUserData.password="";
          this._router.navigate(['/register'])
        }
      }
    }
    )
  }
}
