import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private authservice : AuthService) { }

  events = [];
  ngOnInit() {

    this.authservice.fetchEvents().subscribe(
      res => this.events = res,
      err => console.log(err)
    )

  }


}
