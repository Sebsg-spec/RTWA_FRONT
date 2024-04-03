import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { UserDetailsComponent } from '../open-view/user-details.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<AlertComponent>, 
    private dialog: MatDialog,
    private router: Router
){
  dataService.alertResponse = this.response;
}

response: boolean | undefined;
buttontype: string | undefined;
username: string | undefined;

confirmYes(){
  this.dialogRef.close(true);
  this.response = true;
  this.dataService.alertResponse=this.response;
  
}

ngOnInit(){
  this.buttontype = this.dataService.buttonType;
  this.username = this.dataService.username;

}

confirmYesUser(){
  this.dialogRef.close(true);
  this.response = true;
  this.dataService.alertResponse=this.response;

  // Call openUserDetailsPopup after setting alertResponse
  this.setAlertResponseAndOpenUserDetails().then(() => {
    // Handle success if needed
    
  }).catch((error) => {
    // Handle error if needed
    console.error('Error:', error);
  });
  //this.openUserDetailsPopup(this.dataService.username);
}

// Function to set alertResponse and then call openUserDetailsPopup
setAlertResponseAndOpenUserDetails(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Add any additional logic before calling openUserDetailsPopup if needed
    this.openUserDetailsPopup(this.username);
    //this.router.navigateByUrl('/surplusPage');
    resolve(); // Resolve the Promise once openUserDetailsPopup is called
  });
}


confirmNo(){
  this.dialogRef.close(false);
}

openUserDetailsPopup(username: string | undefined) {
  // Open user details popup using MatDialog
  const dialogRef = this.dialog.open(UserDetailsComponent, {
    width: '400px', // Adjust width as needed
    data: username // You can pass any data needed by the UserDetailsComponent
  });
  this.dialogRef.close(true);
}
}
