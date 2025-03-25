import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Travel } from '../../services/travel.service';

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrls: ['./travel-form.component.css']
})
export class TravelFormComponent {
  travel: Travel;
  showPopup = false;
  message = 'Travel details updated successfully!';

  constructor(
    public dialogRef: MatDialogRef<TravelFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Travel
  ) {
    this.travel = { ...data }; // Clone travel data
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
      this.dialogRef.close(this.travel); // Close the dialog after showing the popup
    }, 1000);
  }
}
