import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { EventsComponent } from './events/events.component';
import { Ticket } from './ticket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  title = 'authentication-demo';
  constructor(private _authService : AuthService) {}
  eventarray : Array<Ticket>;
  error:boolean = true;
  badge1 : number = 0;
  
  ngOnInit()
  {
  
   this._authService.getTickets().subscribe(
    
   events => {
    this.eventarray= events;
    for(let i=0; i<this.eventarray.length ; i++ )
    {
      this.badge1 = this.eventarray[i].quantity + this.badge1;
    }

    }
   );
  

 
    // this._authService.badge$.subscribe(

    //   badge => this.badge1 = badge
    // );
  
 
  
 }
displayError()
{
  this.error = true;
}


}
