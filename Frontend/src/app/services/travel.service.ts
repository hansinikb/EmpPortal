// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TravelService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Travel {
  empId: number;
  homeAddress: string;
  shiftTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  private apiUrl = 'https://localhost:7294/Travel'; 

  constructor(private http: HttpClient) {}

  getTravels(): Observable<Travel[]> {
    return this.http.get<Travel[]>(this.apiUrl);
  }

  getTravelById(id: number): Observable<Travel> {
    return this.http.get<Travel>(`${this.apiUrl}/${id}`);
  }

  updateTravel(empId: number, travel: Travel): Observable<Travel> {
    console.log(`Sending PUT request to: ${this.apiUrl}/${empId}`, travel);
    return this.http.put<Travel>(`${this.apiUrl}/${empId}`, travel);
  }



  deleteTravel(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
