

// import { Component, OnInit } from '@angular/core';
// import { Attendance, AttendanceService } from 'src/app/services/attendance.service';

// @Component({
//   selector: 'app-attendance',
//   templateUrl: './attendance.component.html',
//   styleUrls: ['./attendance.component.css']
// })
// export class AttendanceComponent implements OnInit {
//   attendances: Attendance[] = [];

//   constructor(private attendanceService: AttendanceService) {}

//   ngOnInit(): void {
//     this.attendanceService.getAttendances().subscribe((data) => {
//       this.attendances = data;
//     });
//   }
 
//   loadAttendance(): void {
//     this.attendanceService.getAttendances().subscribe((data) => {
//       this.attendances = data;
//     });
//   }




//   viewAttendance(attendance: Attendance): void {
//     alert(`View Attendance: ${attendance.empId} ${attendance.attDate} ${attendance.inTime} ${attendance.outTime}`);
  
//   }


//   deleteAttendance(attendance: Attendance): void {
//     if (confirm(`please confirm you want to delete ${attendance}?`)) {
//       this.attendanceService.deleteAttendance(attendance.attendanceID).subscribe(() => {
//         this.loadAttendance(); 
//       });
//     }
//   }
// }








// import { Component, OnInit } from '@angular/core';
// import { Attendance, AttendanceService } from 'src/app/services/attendance.service';
// import { Employee, EmployeeService } from 'src/app/services/employee.service';

// @Component({
//   selector: 'app-attendance',
//   templateUrl: './attendance.component.html',
//   styleUrls: ['./attendance.component.css']
// })
// export class AttendanceComponent implements OnInit {
//   attendances: Attendance[] = [];
//   employees: Employee[] = [];
//   empMap: { [key: number]: string } = {}; 

//   constructor(
//     private attendanceService: AttendanceService,
//     private employeeService: EmployeeService
//   ) {}

//   ngOnInit(): void {
//     this.loadEmployees();
//     this.loadAttendance();
//   }

//   loadEmployees(): void {
//     this.employeeService.getEmployees().subscribe((data) => {
//       this.employees = data;
//       this.createEmpMap();
//     });
//   }

//   loadAttendance(): void {
//     this.attendanceService.getAttendances().subscribe((data) => {
//       this.attendances = data;
//     });
//   }

//   createEmpMap(): void {
//     this.employees.forEach(emp => {
//       this.empMap[emp.empID] = emp.empName;
//     });
//   }

//   viewAttendance(attendance: Attendance): void {
//     const empName = this.empMap[attendance.empId] || 'Unknown';
//     alert(`View Attendance: ${empName} ${attendance.attDate} ${attendance.inTime} ${attendance.outTime}`);
//   }

//   deleteAttendance(attendance: Attendance): void {
//     if (confirm(`Please confirm you want to delete attendance for ${this.empMap[attendance.empId] || 'Unknown'}?`)) {
//       this.attendanceService.deleteAttendance(attendance.attendanceID).subscribe(() => {
//         this.loadAttendance();
//       });
//     }
//   }
// }






// import { Component, OnInit } from '@angular/core';
// import { Attendance, AttendanceService } from 'src/app/services/attendance.service';
// import { Employee, EmployeeService } from 'src/app/services/employee.service';

// @Component({
//   selector: 'app-attendance',
//   templateUrl: './attendance.component.html',
//   styleUrls: ['./attendance.component.css']
// })
// export class AttendanceComponent implements OnInit {
//   dataSource = new MatTableDataSource<Attendance>(); 
//   displayedColumns: string[] = ['actions', 'AttendanceId', 'Employee Name', 'AttDate', 'InTime' ,'OutTime'];
//   selectedItem: Attendance | null = null;
//   attendances: Attendance[] = [];
//   employees: Employee[] = [];
//   empMap: { [key: number]: string } = {}; 

//   constructor(
//     private attendanceService: AttendanceService,
//     private employeeService: EmployeeService
//   ) {}

//   ngOnInit(): void {
//     this.loadEmployees();
//     this.loadAttendance();
//   }

//   loadEmployees(): void {
//     this.employeeService.getEmployees().subscribe((data) => {
//       this.employees = data;
//       this.createEmpMap();
//     });
//   }

//   loadAttendance(): void {
//     this.attendanceService.getAttendances().subscribe((data) => {
//       this.attendances = data;
//     });
//   }

//   createEmpMap(): void {
//     this.employees.forEach(emp => {
//       this.empMap[emp.empID] = emp.empName;
//     });
//   }

//   viewAttendance(attendance: Attendance): void {
//     const empName = this.empMap[attendance.empId] || 'Unknown';
//     alert(`View Attendance: ${empName} ${attendance.attDate} ${attendance.inTime} ${attendance.outTime}`);
//   }

//   deleteAttendance(attendance: Attendance): void {
//     if (confirm(`Please confirm you want to delete attendance for ${this.empMap[attendance.empId] || 'Unknown'}?`)) {
//       this.attendanceService.deleteAttendance(attendance.attendanceID).subscribe(() => {
//         this.loadAttendance();
//       });
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance, AttendanceService } from 'src/app/services/attendance.service';
import { Employee, EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  dataSource = new MatTableDataSource<Attendance>();
  displayedColumns: string[] = ['actions', 'attendanceId', 'empName', 'attDate', 'inTime', 'outTime'];
  selectedItem: Attendance | null = null;
  attendances: Attendance[] = [];
  employees: Employee[] = [];
  empMap: { [key: number]: string } = {}; 

  constructor(
    private attendanceService: AttendanceService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadAttendance();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.createEmpMap();
    });
  }

  loadAttendance(): void {
    this.attendanceService.getAttendances().subscribe((data) => {
      this.attendances = data;
      this.dataSource.data = this.attendances;  
    });
  }

  createEmpMap(): void {
    this.employees.forEach(emp => {
      this.empMap[emp.empID] = emp.empName;
    });
  }

  viewAttendance(attendance: Attendance): void {
    const empName = this.empMap[attendance.empId] || 'Unknown';
    alert(`View Attendance: ${empName} ${attendance.attDate} ${attendance.inTime} ${attendance.outTime}`);
  }

  deleteAttendance(attendance: Attendance): void {
    if (confirm(`Please confirm you want to delete attendance for ${this.empMap[attendance.empId] || 'Unknown'}?`)) {
      this.attendanceService.deleteAttendance(attendance.attendanceID).subscribe(() => {
        this.loadAttendance();
      });
    }
  }
}
