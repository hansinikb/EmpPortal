// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LibraryService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Library {
  bookId: number;
  bookName: string;
  category: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = 'https://localhost:7294/Library'; 

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Library[]> {
    return this.http.get<Library[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<Library> {
    return this.http.get<Library>(`${this.apiUrl}/${id}`);
  }

  updateBook(id: number, book: Library): Observable<Library> {
    return this.http.put<Library>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
