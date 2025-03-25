// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-travel',
//   templateUrl: './travel.component.html',
//   styleUrls: ['./travel.component.css']
// })
// export class TravelComponent {

// }






// import { Component, OnInit } from '@angular/core';
// import { TravelService, Travel } from '../../services/travel.service';

// @Component({
//   selector: 'app-travel-list',
//   templateUrl: './travel.component.html',
//   styleUrls: ['./travel.component.css']
// })
// export class TravelComponent implements OnInit {
//   travels: Travel[] = [];
//   selectedTravel: Travel | null = null;

//   constructor(private travelService: TravelService) {}

//   ngOnInit(): void {
//     this.loadTravels();
//   }

//   loadTravels(): void {
//     this.travelService.getTravels().subscribe((data) => {
//       this.travels = data;
//     });
//   }

//   // editTravel(travel: Travel): void {
//   //   this.selectedTravel = travel;
//   //   alert(`Edit Travel Details for Employee ID: ${travel.empId}`);
//   // }
//   editTravel(travel: Travel) {
//     this.selectedTravel = { ...travel }; // this is to create a copy of the travel data
//     console.log(travel);
//   }

//   updateTravel(): void {
//     console.log("in update travel1 : travel.component.ts");

//     if (!this.selectedTravel || !this.selectedTravel.empId) {
//       console.log("in update travel11 : travel.component.ts");
//       alert("Error: Employee ID is missing!");
//       return;
//     }


//     this.travelService.updateTravel(this.selectedTravel.empId, this.selectedTravel)
//     .subscribe({
//       next: (response) => {
//         console.log(response, "in update travel2");
//         this.loadTravels(); 
//         console.log(response, "in update travel3");
//         this.selectedTravel = null; 
        
//       },
//       error: (error) => {
//         console.error('Update Error:', error);
//         alert(`Update failed: ${error.error?.title || 'Unknown error'}`);
//       }
//     });
//   }
//   viewTravel(travel: Travel): void {
//     alert(`View Travel Details:\nEmployee ID: ${travel.empId}\nAddress: ${travel.homeAddress}\nShift Time: ${travel.shiftTime}`);
//   }

//   deleteTravel(travel: Travel): void {
//     if (confirm(`Are you sure you want to delete travel details for Employee ID: ${travel.empId}?`)) {
//       this.travelService.deleteTravel(travel.empId).subscribe(() => {
//         this.loadTravels();
//       });
//     }
//   }
// }







// import { Component, OnInit } from '@angular/core';
// import { TravelService, Travel } from '../../services/travel.service';
// import { MatTableDataSource } from '@angular/material/table';

// @Component({
//   selector: 'app-travel-list',
//   templateUrl: './travel.component.html',
//   styleUrls: ['./travel.component.css']
// })
// export class TravelComponent implements OnInit {
//   dataSource = new MatTableDataSource<Travel>(); 
//   displayedColumns: string[] = ['actions', 'empId', 'homeAddress', 'shiftTime' ];
//   selectedTravel: Travel | null = null;
//   showSuccessPopup: boolean = false;

//   constructor(private travelService: TravelService) {}

//   ngOnInit(): void {
//     this.loadTravels();
//   }

//   loadTravels(): void {
//     this.travelService.getTravels().subscribe((data) => {
//       this.dataSource.data = data;
//     });
//   }

//   selectTravel(travel: Travel): void {
//     this.selectedTravel = { ...travel }; 
//   }

//   updateTravel(): void {
//     if (!this.selectedTravel) return;

//     this.travelService.updateTravel(this.selectedTravel.empId, this.selectedTravel).subscribe(() => {
//       this.loadTravels(); 
//       this.selectedTravel = null; 
//       this.showSuccessPopup = true;

//       setTimeout(() => {
//         this.showSuccessPopup = false;
//       }, 3000);
//     });
//   }

//   viewTravel(travel: Travel): void {
//     alert(`View Travel Details:\nEmployee ID: ${travel.empId}\nAddress: ${travel.homeAddress}\nShift Time: ${travel.shiftTime}`);
//   }

//   deleteTravel(travel: Travel): void {
//     if (confirm(`Are you sure you want to delete travel details for Employee ID: ${travel.empId}?`)) {
//       this.travelService.deleteTravel(travel.empId).subscribe(() => {
//         this.loadTravels();
//       });
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TravelService, Travel } from '../../services/travel.service';
import { MatTableDataSource } from '@angular/material/table';
import { TravelFormComponent } from '../travel-form/travel-form.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css'],
})
export class TravelComponent implements OnInit {
  dataSource = new MatTableDataSource<Travel>(); 
  displayedColumns: string[] = ['actions', 'empId', 'homeAddress', 'shiftTime' ];
  showSuccessPopup: boolean = false;

  constructor(private travelService: TravelService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTravels();
  }

  loadTravels(): void {
    this.travelService.getTravels().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  openEditDialog(travel: Travel): void {
    const dialogRef = this.dialog.open(TravelFormComponent, {
      width: '400px',
      data: travel
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTravel(result);
      }
    });
  }

  updateTravel(updatedTravel: Travel): void {
    this.travelService.updateTravel(updatedTravel.empId, updatedTravel).subscribe(() => {
      this.loadTravels(); 
      this.showSuccessPopup = true;
      setTimeout(() => {
        this.showSuccessPopup = false;
      }, 3000);
    });
  }

  viewTravel(travel: Travel): void {
    alert(`View Travel Details:\nEmployee ID: ${travel.empId}\nAddress: ${travel.homeAddress}\nShift Time: ${travel.shiftTime}`);
  }

  deleteTravel(travel: Travel): void {
    if (confirm(`Are you sure you want to delete travel details for Employee ID: ${travel.empId}?`)) {
      this.travelService.deleteTravel(travel.empId).subscribe(() => {
        this.loadTravels();
      });
    }
  }
}
