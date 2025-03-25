import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Attendance {
  empId: number;
  attDate: string;
  inTime: string;
  outTime: string;
}

@Component({
  selector: 'app-attendance-dialog',
  templateUrl: './attendance-dialog.component.html',
  styleUrls: ['./attendance-dialog.component.css']
})
export class AttendanceDialogComponent {
  empName: string = 'Unknown';

  constructor(
    public dialogRef: MatDialogRef<AttendanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { attendance: Attendance, empName: string }
  ) {
    this.empName = data.empName;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
