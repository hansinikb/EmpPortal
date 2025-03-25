// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-library',
//   templateUrl: './library.component.html',
//   styleUrls: ['./library.component.css']
// })
// export class LibraryComponent {

// }






// import { Component, OnInit } from '@angular/core';
// import { LibraryService, Library } from '../../services/library.service';

// @Component({
//   selector: 'app-library',
//   templateUrl: './library.component.html',
//   styleUrls: ['./library.component.css']
// })
// export class LibraryComponent implements OnInit {
//   books: Library[] = [];
//   selectedBook: any = null;

//   constructor(private libraryService: LibraryService) {}

//   ngOnInit(): void {
//     this.libraryService.getBooks().subscribe((data) => {
//       this.books = data;
//     });
//   }

//   loadBooks(): void {
//     this.libraryService.getBooks().subscribe((data) => {
//       this.books = data;
//     });
//   }

 
//   editBook(book: Library) {
//     this.selectedBook = { ...book }; // to create a copy of the book data
//   }

//   // updateBook(): void {
//   //   if (!this.selectedBook) return;

//   //   this.libraryService.updateBook(this.selectedBook.bookId, this.selectedBook).subscribe(() => {
//   //     this.loadBooks(); 
//   //     this.selectedBook = null; // this is to clear selection after update
//   //   });
//   // }
//   updateBook(): void {
//     if (!this.selectedBook) return;
  
//     this.libraryService.updateBook(this.selectedBook.bookId, this.selectedBook).subscribe((updatedBook) => {
//       // Update the list with the new book data
//       const index = this.books.findIndex(b => b.bookId === updatedBook.bookId);
//       if (index !== -1) {
//         this.books[index] = updatedBook;
//       }
  
//       this.selectedBook = null; // Clear selection after update
//     });
//   }
  

//   viewBook(book: Library): void {
//     alert(`View Book: ${book.bookName}, Category: ${book.category}, Author: ${book.author}`);
//   }



//   deleteBook(book: Library): void {
//     if (confirm(`Please confirm you want to delete "${book.bookName}"?`)) {
//       this.libraryService.deleteBook(book.bookId).subscribe(() => {
//         this.loadBooks();
//       });
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LibraryService, Library } from '../../services/library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  displayedColumns: string[] = [ 'actions', 'bookId', 'bookName', 'category', 'author'];
  dataSource = new MatTableDataSource<Library>();
  selectedBook: Library | null = null;
  showSuccessPopup: boolean = false;

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.libraryService.getBooks().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  selectBook(book: Library): void {
    this.selectedBook = { ...book }; 
  }
  editBook(book: Library) {
    this.selectedBook = { ...book };
  }
  updateBook(): void {
    if (!this.selectedBook) return;

    this.libraryService.updateBook(this.selectedBook.bookId, this.selectedBook).subscribe(() => {
      this.loadBooks();
      this.selectedBook = null; 
      this.showSuccessPopup = true;
      setTimeout(() => this.showSuccessPopup = false, 3000);
    });
  }

  viewBook(book: Library): void {
    alert(`View Book: ${book.bookName}, Category: ${book.category}, Author: ${book.author}`);
  }

  deleteBook(book: Library): void {
    if (confirm(`Are you sure you want to delete "${book.bookName}"?`)) {
      this.libraryService.deleteBook(book.bookId).subscribe(() => {
        this.loadBooks();
      });
    }
  }
}
