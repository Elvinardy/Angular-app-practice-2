import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ContainerComponent } from './container/container.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';

const routes: Routes = [
  { path: 'employee', component: EmployeesComponent},
  { path: 'rooms', component: RoomsComponent},
  { path: 'rooms/:roomid', component: RoomsBookingComponent},
  { path: '', redirectTo: '/rooms', pathMatch: 'full'},
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
