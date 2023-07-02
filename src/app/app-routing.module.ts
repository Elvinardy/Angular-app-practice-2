import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/guard.guard';

const routes: Routes = [
  { path: 'employee', component: EmployeesComponent, canActivate:[LoginGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'rooms',
    loadChildren: () => import('./rooms/rooms.module')
    .then((m)=>m.RoomsModule),
    canActivate:[LoginGuard],
    canLoad: [LoginGuard]
  }, // lazy loading of module
  { path: '**', redirectTo: 'login', pathMatch: 'full'},
  { path: 'booking/:roomid',
  loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule),
    //canActivate: [LoginGuard]
  },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
