import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Event1 } from '../event';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Ticket } from '../ticket';


@Component({
  selector: 'app-special-events-detail',
  templateUrl: './special-events-detail.component.html',
  styleUrls: ['./special-events-detail.component.css'],
  providers: [AuthService]

})
export class SpecialEventsDetailComponent implements OnInit {

  constructor(private authservice : AuthService, private fb: FormBuilder){

    this.form2 = this.fb.group({
      number: new FormControl('', [Validators.required,Validators.minLength(16)]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3)]),
     
    });

    this.form1 = this.fb.group({
    address:new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pin: new FormControl('', [Validators.required, Validators.minLength(6),Validators.pattern('^\d{10}$')])
    });
  }

  events : Array<Ticket>;
  method = false;
  startyear = 2001;
  endyear = 2030;
  startmonth = 1;
  endmonth = 12;
  monthOfYear = _.range(1,12); 
  badge : Number;
  model : any={};
  years = _.range(2019,2030);  // It creates a new list from 1 to 12.
  form1 : FormGroup;
  form2 : FormGroup;
  

  ngOnInit() {
   

    this.authservice.getTickets().subscribe(
    
      events => {
        this.events=events
      this.badge = this.events.length
      }
    );
  

    // this.authservice.event$.subscribe(

    //  events1 =>this.events = events1
 
    // );

  }

  selectMethod1()
  {
    this.method = false;
  }

  selectMethod2()
  {
    this.method = true;
  }

  placeOrder()
  {
    this.authservice.deleteTickets().subscribe(

      res =>
      {
       alert('order placed successfully')
    
      }
    );

  }
 
}
