import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Canteen } from '../../services/canteen.service';

@Component({
  selector: 'app-canteen-form',
  templateUrl: './canteen-form.component.html',
  styleUrls: ['./canteen-form.component.css']
})
export class CanteenFormComponent {
  canteenItem: Canteen;
  showPopup = false;
  message = 'Canteen item updated successfully!';

  constructor(
    public dialogRef: MatDialogRef<CanteenFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Canteen
  ) {
    this.canteenItem = { ...data }; // Clone canteen item data
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.showPopup = true;
    
    setTimeout(() => {
      this.showPopup = false;
      this.dialogRef.close(this.canteenItem); // Close the dialog after showing the popup
    }, 1000);
  }
}
