
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-usp-popup',
  templateUrl: './usp-popup.component.html',
  styleUrls: ['./usp-popup.component.css']
})
export class UspPopupComponent {
  @Input() showPopup: boolean = false;
  @Input() message: string = '';
}


