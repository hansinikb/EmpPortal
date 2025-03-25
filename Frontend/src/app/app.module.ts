
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CanteenComponent } from './components/canteen/canteen.component';
import { TravelComponent } from './components/travel/travel.component';
import { LibraryComponent } from './components/library/library.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
// import { UspPopupComponent } from './usp-popup/usp-popup.component';
import { UspPopupComponent } from './components/usp-popup/usp-popup.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { CanteenFormComponent } from './components/canteen-form/canteen-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { TravelFormComponent } from './components/travel-form/travel-form.component';
import { LibraryFormComponent } from './components/library-form/library-form.component';
// import { AttendanceDialogComponent } from './component/attendance-dialog/attendance-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CanteenComponent,
    TravelComponent,
    LibraryComponent,
    AttendanceComponent,
    UspPopupComponent,
    EmployeeFormComponent,
    CanteenFormComponent,
    TravelFormComponent,
    LibraryFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    EmployeeFormComponent,
    CanteenFormComponent,
    TravelFormComponent
  ]
})
export class AppModule { }



