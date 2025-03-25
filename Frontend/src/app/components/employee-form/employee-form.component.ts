// import { Component, EventEmitter, Inject,Input, Output, ViewChild } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Employee } from '../../services/employee.service';

// @Component({
//   selector: 'app-employee-form',
//   templateUrl: './employee-form.component.html',
//   styleUrls: ['./employee-form.component.css']
// })
// export class EmployeeFormComponent {
//   @Input() employee : any;
//   @Output() update : EventEmitter<any> = new EventEmitter();
//   @Output() cancel : EventEmitter<any> = new EventEmitter();

//   message = 'Employee updated successfully!';
//   constructor() {

//   }

//   ngOnInit(): void {

//     // Convert existing date to YYYY-MM-DD format for input binding
//     if (this.employee.dob) {
//       let localDate = new Date(this.employee.dob);
//       localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
//       this.employee.dob = localDate.toISOString().split('T')[0];
//     }
//   }

//   onCancel(): void {
//     this.cancel.emit(true);
//   }


//   onSubmit(): void {
//     this.update.emit(this.employee);
//   //   this.showPopup = true;
  
//   //   var item : any = {
//   //     EmployeeDetails : this.employee,
//   //     isSuccess : true
//   //   }
//   //   setTimeout(() => {
//   //     this.showPopup = false;
//   //     this.dialogRef.close() // Close the dialog after showing the popup
//   //   }, 1000);
//   }
  
// }


import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  employee: Employee;

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.employee = { ...data }; 
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }

  onSubmit(): void {
    this.dialogRef.close(this.employee); 
  }
}
