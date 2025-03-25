
// import { Component, OnInit } from '@angular/core';
// import { EmployeeService, Employee } from '../../services/employee.service';

// @Component({
//   selector: 'app-employee-list',
//   templateUrl: './employee-list.component.html',
//   styleUrls: ['./employee-list.component.css']
// })
// export class EmployeeListComponent implements OnInit {
//   employees: Employee[] = [];

//   constructor(private employeeService: EmployeeService) {}

//   ngOnInit(): void {
//     this.employeeService.getEmployees().subscribe((data) => {
//       this.employees = data;
//     });
//   }
 
//   loadEmployees(): void {
//     this.employeeService.getEmployees().subscribe((data) => {
//       this.employees = data;
//     });
//   }

//   selectedEmployee: any = null; 


//   editEmployee(employee: Employee) {
//     this.selectedEmployee = { ...employee }; 
//   }


//   showSuccessPopup: boolean = false; 
//   successMessage: string = '';
//   updateEmployee() {
//     if (!this.selectedEmployee) return;
  
//     this.employeeService.updateEmployee(this.selectedEmployee.empID, this.selectedEmployee).subscribe((updatedEmployee) => {
//       const index = this.employees.findIndex(e => e.empID === updatedEmployee.empID);
//       if (index !== -1) {
//         this.employees[index] = updatedEmployee;
//       }
  
//       this.selectedEmployee = null; 
      

//       this.successMessage='Updated successfully';
//       this.showSuccessPopup=true;

//       setTimeout(() => {
//         this.showSuccessPopup = false;
//       }, 3000);

//     });
//   }

//   viewEmployee(employee: Employee): void {
//     alert(`View Employee: ${employee.empName} ${employee.email} ${employee.phno}`);
  
//   }

//   deleteEmployee(employee: Employee): void {
//     if (confirm(`please confirm you want to delete ${employee.empName}?`)) {
//       this.employeeService.deleteEmployee(employee.empID).subscribe(() => {
//         this.loadEmployees(); 
//       });
//     }
//   }
// }





// import { Component, OnInit } from '@angular/core';
// import { EmployeeService, Employee } from '../../services/employee.service';
// import { MatTableDataSource } from '@angular/material/table';

// @Component({
//   selector: 'app-employee-list',
//   templateUrl: './employee-list.component.html',
//   styleUrls: ['./employee-list.component.css']
// })
// export class EmployeeListComponent implements OnInit {
//   employees: Employee[] = [];
//   dataSource = new MatTableDataSource<Employee>([]);

//   // displayedColumns: string[] = ['empID', 'empName', 'age', 'email', 'dob', 'phno', 'actions'];

//   displayedColumns: string[] = ['actions', 'empID', 'empName', 'age', 'email', 'dob', 'phno'];

//   selectedEmployee: Employee | null = null;
//   showSuccessPopup = false; 


//   constructor(private employeeService: EmployeeService) {}

//   ngOnInit(): void {
//     this.loadEmployees();
//   }

//   loadEmployees(): void {
//     this.employeeService.getEmployees().subscribe((data) => {
//       this.employees = data;
//       this.dataSource.data = data;
//     });
//   }

//   selectEmployee(employee: Employee): void {
//     this.selectedEmployee = { ...employee };
//     // if (this.selectedEmployee.dob) {
//     //   this.selectedEmployee.dob = new Date(this.selectedEmployee.dob).toISOString().split('T')[0];
//     // }
//     if (this.selectedEmployee.dob) {
//       let localDate = new Date(this.selectedEmployee.dob);
//       localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); //for addjust for timezone
  
//       this.selectedEmployee.dob = localDate.toISOString().split('T')[0];//formating date
//     }
//   }

//   updateEmployee(): void {
//     if (!this.selectedEmployee) return;

//     this.employeeService.updateEmployee(this.selectedEmployee.empID, this.selectedEmployee).subscribe((updatedEmployee) => {
//       const index = this.employees.findIndex(e => e.empID === updatedEmployee.empID);
//       if (index !== -1) {
//         this.employees[index] = updatedEmployee;
//       }


//       this.showSuccessPopup = true;
//       setTimeout(() => {
//         this.showSuccessPopup = false;
//       }, 3000);


//       this.selectedEmployee = null;
//       this.loadEmployees();
//     });
//   }

//   deleteEmployee(employee: Employee): void {
//     if (confirm(`are you sure you want to delete ${employee.empName}?`)) {
//       this.employeeService.deleteEmployee(employee.empID).subscribe(() => {
//         this.loadEmployees();
//       });
//     }
//   }

//   viewEmployee(employee: Employee): void {
//     alert(`View Employee: ${employee.empName}, ${employee.email}, ${employee.phno}`);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService, Employee } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  isEmployeeEditOpen: boolean = false;
  employees: Employee[] = [];
  emp : any;
  showPopup = false;
  message :string= "Successfully saved";
  isEditSuccess: boolean = false;
  dataSource = new MatTableDataSource<Employee>([]);
  displayedColumns: string[] = ['actions', 'empID', 'empName', 'age', 'email', 'dob', 'phno'];

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.dataSource.data = data;
    });
  }

  // openEmployeeDialog(employee: Employee): void {
  //   this.isEmployeeEditOpen = true;
  //   this.emp = employee;
  //   // const dialogRef = this.dialog.open(EmployeeFormComponent, {
  //   //   width: '400px',
  //   //   data: employee
  //   // });

  //   // dialogRef.afterClosed().subscribe(updatedEmployee => {
  //   //   if (updatedEmployee.EmployeeDetails) {
  //   //     this.employeeService.updateEmployee(updatedEmployee.empID, updatedEmployee).subscribe(() => {
  //   //       this.loadEmployees();
  //   //     });
  //   //   }
  //   // });
  // }
  openEmployeeDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '400px',
      data: { ...employee } 
    });

    dialogRef.afterClosed().subscribe(updatedEmployee => {
      if (updatedEmployee) {
        this.employeeService.updateEmployee(updatedEmployee.empID, updatedEmployee).subscribe(() => {
          this.loadEmployees();
          // setTimeout(() => {
          //   this.showPopup = false;
          // }, 2000);
        });
      }
    });
  }

  onSubmit(updatedEmployee : Employee){
      this.employeeService.updateEmployee(updatedEmployee.empID, updatedEmployee).subscribe(() => {
        this.showPopup = true;
        
        this.isEmployeeEditOpen = false;
        this.loadEmployees();
      });
  }

  deleteEmployee(employee: Employee): void {
    if (confirm(`Are you sure you want to delete ${employee.empName}?`)) {
      this.employeeService.deleteEmployee(employee.empID).subscribe(() => {
        this.loadEmployees();

      });
    }
  }

  viewEmployee(employee: Employee): void {
    alert(`View Employee: ${employee.empName}, ${employee.email}, ${employee.phno}`);
  }

  close($event: any) {
    this.isEditSuccess = $event;
    this.isEmployeeEditOpen = false;
  }
}
