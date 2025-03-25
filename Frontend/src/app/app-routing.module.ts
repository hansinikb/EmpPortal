import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { LibraryComponent } from './components/library/library.component';
import { TravelComponent } from './components/travel/travel.component';
import { CanteenComponent } from './components/canteen/canteen.component';


const routes: Routes = [
  { path: '', redirectTo: '/Attendance', pathMatch: 'full' }, 
  { path: 'Employee', component: EmployeeListComponent }, 
  { path: 'Attendance', component: AttendanceComponent }, 
  { path: 'Library', component: LibraryComponent }, 
  { path: 'Travel', component: TravelComponent }, 
  { path: 'Canteen', component: CanteenComponent }, 

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
