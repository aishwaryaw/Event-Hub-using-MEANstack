import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthGuard } from './auth.guard';
import { SpecialEventsDetailComponent } from './special-events-detail/special-events-detail.component';
import { SpecialEventsListComponent } from './special-events-list/special-events-list.component';
import { CheckoutGuardGuard } from './checkout-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'events',
    component : EventsComponent
  },

  {
    path : 'tickets',
    component : SpecialEventsListComponent
  },

  {
    path : 'checkout',
    component : SpecialEventsDetailComponent,
    canLoad : [CheckoutGuardGuard]
  },
  
  {
    path : 'special',
    component : SpecialEventsComponent,
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
