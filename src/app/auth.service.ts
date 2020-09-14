import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Event1 } from './event';
import { Subject } from 'rxjs';
import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  loginUrl = "http://localhost:3000/api/login";
  registerUrl = "http://localhost:3000/api/register"
  eventsUrl = "http://localhost:3000/api/events";
  addUrl = "http://localhost:3000/api/addSpecialEvents";
  specialeventsUrl = "http://localhost:3000/api/special";
  buySpecialEventsUrl = "http://localhost:3000/api/buySpecialEvents";
  getBoughtSpecialEventsUrl = "http://localhost:3000/api/getBoughtSpecialEvents";
  deleteUrl="http://localhost:3000/api/deleteTicket/";
  deleteUrl1="http://localhost:3000/api/deleteTickets";
  updateUrl ="http://localhost:3000/api/updateTicket"
 private source = new Subject<number>();
  badge$ = this.source.asObservable();


  private source1 = new Subject<Array<Event1>>();
  event$ = this.source1.asObservable();


  constructor(private _http : HttpClient,private router:Router) { }


  sendBadge(badgeCount : number)
  {
    this.source.next(badgeCount);
  }

  sendEvent(events: Array<Event1>)
  {
    this.source1.next(events);
  }

  registerUserService(user)
  {

    return this._http.post<any>(this.registerUrl , user);


  }
  loginUserService(user)
  {

    return this._http.post<any>(this.loginUrl , user);


  }

  fetchEvents()
  {

    return this._http.get<any>(this.eventsUrl);

  }

  fetchSpecialEvents(){

    return this._http.get<any>(this.specialeventsUrl);

  }

  addSpecialEvents(event)
  {
    return this._http.post<any>(this.addUrl,event);

  }

  buyTickets(ticket)
  {
    return this._http.post<any>(this.buySpecialEventsUrl,ticket);
  }

  getTickets()
  {
    return this._http.get<any>(this.getBoughtSpecialEventsUrl);
  }

  deleteTicket(event:Ticket)
  {
    return this._http.delete<any>(this.deleteUrl+event._id);

  }

  updateTicket(event:Ticket)
  {
    return this._http.put<any>(this.updateUrl, event);

  }
  deleteTickets()
  {
    return this._http.delete<any>(this.deleteUrl1);

  }

  loggedIn()
  {
    return !!localStorage.getItem('token');


  }

  getToken()
  {
    return localStorage.getItem('token')
  }

  logoutUser()
  {
    localStorage.removeItem('token')
    this.router.navigate(['/events'])

  }
}
