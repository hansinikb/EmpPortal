import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Canteen {
  itemId: number;
  counter: string;
  itemName: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CanteenService {
  private apiUrl = 'https://localhost:7294/Canteen';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Canteen[]> {
    return this.http.get<Canteen[]>(this.apiUrl);
  }

  getItemById(id: number): Observable<Canteen> {
    return this.http.get<Canteen>(`${this.apiUrl}/${id}`);
  }

  addItem(item: Canteen): Observable<Canteen> {
    return this.http.post<Canteen>(this.apiUrl, item);
  }

  updateItem(id: number, item: Canteen): Observable<Canteen> {
    return this.http.put<Canteen>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
