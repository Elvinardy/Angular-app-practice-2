import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';
import { RoomsAddComponent } from './rooms/rooms-add/rooms-add.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'employee', component: EmployeesComponent},
  { path: 'rooms', component: RoomsComponent},
  { path:'rooms/add', component: RoomsAddComponent},
  { path: 'rooms/:roomid', component: RoomsBookingComponent},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/rooms', pathMatch: 'full'},
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
