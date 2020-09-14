import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';
import { Event1 } from '../event';
import { Router } from '@angular/router';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-special-events-list',
  templateUrl: './special-events-list.component.html',
  styleUrls: ['./special-events-list.component.css']
})
export class SpecialEventsListComponent implements OnInit {

  events : Array<Ticket>;
  badge :number;
  constructor(private authservice : AuthService, private router : Router) {}

  ngOnInit() {
  
      this.authservice.getTickets().subscribe(
  
        events => 
        {
          this.events = events
          this.badge=events.length
        }
      );
    }

    deleteTicket(event : Ticket)
    {
      //let eventArray = this.events;
      this.authservice.updateTicket(event).subscribe(

       quantity1 => {
         window.location.reload();
         if(event.quantity-1 == 0)
         {
          this.authservice.deleteTicket(event).subscribe(
           delEvent => 
           {
             console.log(delEvent)
           for(let i=0; i < this.events.length; i++)
            
              if(this.events[i]._id === delEvent._id)
              {
                this.events.splice(i,1);
                
              }
            }
          )
         }
         
          this.authservice.sendBadge(this.events.length);
          this.badge--;
        });  

    }

    checkout()
    {
      
      this.authservice.sendEvent(this.events);
      this.router.navigate(['/checkout']);

    }
    
  }


