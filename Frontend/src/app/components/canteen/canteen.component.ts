// import { Component, OnInit } from '@angular/core';
// import { CanteenService, Canteen } from '../../services/canteen.service';

// @Component({
//   selector: 'app-canteen-list',
//   templateUrl: './canteen.component.html',
//   styleUrls: ['./canteen.component.css']
// })
// export class CanteenComponent implements OnInit {
//   items: Canteen[] = [];
//   selectedItem: Canteen | null = null;

//   constructor(private canteenService: CanteenService) {}

//   ngOnInit(): void {
//     this.loadItems();
//   }

//   loadItems(): void {
//     this.canteenService.getItems().subscribe((data) => {
//       this.items = data;
//     });
//   }

//   // editItem(item: Canteen): void {
//   //   this.selectedItem = item;
//   //   alert(`Edit Item: ${item.itemName}`);
//   // }
//   editItem(item: Canteen) {
//     this.selectedItem = { ...item }; // to create a copy of the item
//   }

//   updateItem(): void {
//     if (!this.selectedItem) return;

//     this.canteenService.updateItem(this.selectedItem.itemId, this.selectedItem).subscribe(() => {
//       this.loadItems(); 
//       this.selectedItem = null; 
//     });
//   }

//   viewItem(item: Canteen): void {
//     alert(`View Item Details:\nItem Name: ${item.itemName}\nCounter: ${item.counter}\nPrice: ₹${item.price}`);
//   }

//   deleteItem(item: Canteen): void {
//     if (confirm(`Are you sure you want to delete ${item.itemName}?`)) {
//       this.canteenService.deleteItem(item.itemId).subscribe(() => {
//         this.loadItems();
//       });
//     }
//   }
// }






// import { Component, OnInit } from '@angular/core';
// import { CanteenService, Canteen } from '../../services/canteen.service';

// @Component({
//   selector: 'app-canteen-list',
//   templateUrl: './canteen.component.html',
//   styleUrls: ['./canteen.component.css']
// })
// export class CanteenComponent implements OnInit {
//   items: Canteen[] = [];
//   selectedItem: Canteen | null = null;

//   showSuccessPopup: boolean = false; // To control popup visibility
//   successMessage: string = ''; // Popup message

//   constructor(private canteenService: CanteenService) {}

//   ngOnInit(): void {
//     this.loadItems();
//   }

//   // Load all items from the canteen service
//   loadItems(): void {
//     this.canteenService.getItems().subscribe((data) => {
//       this.items = data;
//     });
//   }

//   // Edit Item: Copy item to selectedItem for editing
//   editItem(item: Canteen) {
//     this.selectedItem = { ...item }; // Create a copy of the item for editing
//   }

//   // Update Item: Called when form is submitted
//   updateItem(): void {
//     if (!this.selectedItem) return;

//     this.canteenService.updateItem(this.selectedItem.itemId, this.selectedItem).subscribe(() => {
//       this.loadItems(); // Reload items after update
//       this.selectedItem = null; // Deselect the item
//       this.successMessage = 'Item updated successfully!';
//       this.showSuccessPopup = true;

//       // Hide success popup after 3 seconds
//       setTimeout(() => {
//         this.showSuccessPopup = false;
//       }, 3000);
//     });
//   }

//   // View Item: Show item details in an alert
//   viewItem(item: Canteen): void {
//     alert(`View Item Details:\nItem Name: ${item.itemName}\nCounter: ${item.counter}\nPrice: ₹${item.price}`);
//   }

//   // Delete Item: Prompt and delete item if confirmed
//   deleteItem(item: Canteen): void {
//     if (confirm(`Are you sure you want to delete ${item.itemName}?`)) {
//       this.canteenService.deleteItem(item.itemId).subscribe(() => {
//         this.loadItems(); // Reload items after deletion
//       });
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CanteenService, Canteen } from '../../services/canteen.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { CanteenFormComponent } from '../canteen-form/canteen-form.component';

@Component({
  selector: 'app-canteen-list',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.css']
})
export class CanteenComponent implements OnInit {
  dataSource = new MatTableDataSource<Canteen>(); 
  // displayedColumns: string[] = ['itemId', 'counter', 'itemName', 'price', 'actions'];
  displayedColumns: string[] = ['actions', 'itemId', 'counter', 'itemName', 'price' ];
  selectedItem: Canteen | null = null;
  showSuccessPopup: boolean = false;

  constructor(private canteenService: CanteenService,  private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.canteenService.getItems().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  selectItem(item: Canteen): void {
    this.selectedItem = { ...item }; 
  }

  updateItem(): void {
    if (!this.selectedItem) return;

    this.canteenService.updateItem(this.selectedItem.itemId, this.selectedItem).subscribe(() => {
      this.loadItems(); 
      this.selectedItem = null; 
      this.showSuccessPopup = true;

     
      setTimeout(() => {
        this.showSuccessPopup = false;
      }, 3000);
    });
  }


  viewItem(item: Canteen): void {
    alert(`View Item Details:\nItem Name: ${item.itemName}\nCounter: ${item.counter}\nPrice: rupees${item.price}`);
  }

 
  deleteItem(item: Canteen): void {
    if (confirm(`Are you sure you want to delete ${item.itemName}?`)) {
      this.canteenService.deleteItem(item.itemId).subscribe(() => {
        this.loadItems();
      });
    }
  }




editItem(item: Canteen): void {
  const dialogRef = this.dialog.open(CanteenFormComponent, {
    width: '400px',
    data: item
  });

  dialogRef.afterClosed().subscribe((updatedItem) => {
    // if (updatedItem) {
    //   this.updateItem(updatedItem);
    // }
    if (updatedItem) {
      this.canteenService.updateItem(updatedItem.itemId , updatedItem).subscribe(() => {
        this.loadItems();
      });
    }
  });
}

}
