
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Attendance {
  attendanceID: number;
  empId: number;
  attDate: string;
  inTime: string;
  outTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'https://localhost:7294/Attendance'; 

  constructor(private http: HttpClient) {}

  getAttendances(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.apiUrl);
  }
  getAttendanceById(id: number) : Observable<Attendance> {
    return this.http.get<Attendance>(`${this.apiUrl}/${id}`)
  }
  updateAttendance(id:number,attendance:Attendance) : Observable<Attendance> {
    return this.http.put<Attendance>(`${this.apiUrl}/${id}`,attendance);
  }
  deleteAttendance(id:number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
