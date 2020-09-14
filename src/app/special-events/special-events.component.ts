import { Component, OnInit, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Event1 } from '../event';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css'],
  outputs : ['badgeEvent']

})
export class SpecialEventsComponent implements OnInit , AfterViewInit {

 
  constructor(private authservice : AuthService , private _router : Router) { }

  
  disable = false;
  badge = 0;
  quantity1 = 1;
  events : Array<Event1>;
  private badgeEvent = new EventEmitter();
  error :boolean = false;
  hideEvents = false;
  ticket = new Ticket();
  
  @ViewChild ('quantity', {static: false}) quantityRef : ElementRef;

  ngAfterViewInit() {

    this.quantity1 = this.quantityRef.nativeElement.value;

  }
  ngOnInit() {
    this.hideEvents = false;
    this.authservice.fetchSpecialEvents().subscribe(
      res => 
      {
        this.events = res;
        this.hideEvents = false;
      },
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
    )

}

addEvent()
{
  this.hideEvents = true;

}

onSubmitAddEvent(event : Event1)
{
  this.authservice.addSpecialEvents(event).subscribe(
    res => 
    {
      this.events.push(res); 
      this.hideEvents = false;

    },
    err => console.log(err)

  )

}

buyTicket(event: Event1)
{
  this.disable = true;
 
  this.ticket.name = event.name;
  this.ticket.description = event.description;
  this.ticket.date = event.date;
  this.ticket.price = event.price;
  this.ticket._id=event._id;
  this.ticket.quantity= this.quantity1;

  this.authservice.buyTickets(this.ticket).subscribe(
    res => 
    {

   
    this.authservice.badge$.subscribe(
      badge =>
      {
       
        this.authservice.sendBadge(this.quantity1 + badge)
    
  }
    );
    this.events.push(res)
},
    err => console.log(err)

  );

  window.location.reload();
}
  // this.authservice.getTickets().subscribe(
    
  //   events => 
  //   {
  //     this.authservice.badge$.subscribe(
  //       badge =>
  //       {
  //         if(badge ==0)
  //         this.authservice.sendBadge(this.quantity1)
  //         else
  //         this.authservice.sendBadge(this.quantity1 + badge)
      
  //   }
  //     );
  // }

}



 
 

