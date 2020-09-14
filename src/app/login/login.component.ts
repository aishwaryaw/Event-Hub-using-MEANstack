import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = new User();

  constructor(private authService : AuthService, private _router : Router) { 

      }

  ngOnInit() {

  }

  
loginUser()
  {

    this.authService.loginUserService(this.loginUserData).subscribe(

      res => 
      {
        localStorage.setItem('token' , res.token)
        this._router.navigate(['/special'])
        this.authService.getTickets().subscribe(
    
          events => this.authService.sendBadge(events.length)
        );
      
        
      }
        ,
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              alert(err)
              this.loginUserData.email = "";
              this.loginUserData.password="";
              this._router.navigate(['/login'])
            }
            
          }

          
        }
    )

  }
}
