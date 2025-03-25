
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isHomePage : boolean=false;
  showButtons : boolean=true;
  title = 'Employee Management System';
  onClickAdmin() : void{
    this.isHomePage = true;
    this.showButtons=false;
  }
}


