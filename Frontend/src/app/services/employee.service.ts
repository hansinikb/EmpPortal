
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  empID: number;
  empName: string;
  age: number;
  email: string;
  dob: string;
  phno: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7294/Employee'; 

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
  getEmployeeById(id: number) : Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`)
  }
  updateEmployee(id:number,employee:Employee) : Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`,employee);
  }
  deleteEmployee(id:number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
