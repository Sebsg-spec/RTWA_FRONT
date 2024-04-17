import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { UserDetailsComponent } from '../../open-view/user-details.component';



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

  ) {
    dataService.alertResponse = this.response;
  }

  response: boolean | undefined;
  buttontype: string | undefined;
  username: string | undefined;

  ngOnInit() {
    //Initialize button type
    this.buttontype = this.dataService.buttonType;
    //Initialize the username for the userDetailsPopUp
    this.username = this.dataService.username;
  }

  //Function used when creating a offer/demand package
  confirmYes() {
    this.dialogRef.close(true);
    this.response = true;
    this.dataService.alertResponse = this.response;

  }

  //Function to deny the pop-up dialog and close it
  confirmNo() {
    this.dialogRef.close(false);
  }

  //Function used when accepting a person or a package
  confirmYesUser() {
    this.dialogRef.close(true);
    this.response = true;
    this.dataService.alertResponse = this.response;

    // Call openUserDetailsPopup after setting alertResponse
    this.setAlertResponseAndOpenUserDetails().then(() => { })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  // Function to set alertResponse and then call openUserDetailsPopup
  setAlertResponseAndOpenUserDetails(): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      this.openUserDetailsPopup(this.username);

      resolve();
    });
  }



  //Function to open user details popup using MatDialog
  openUserDetailsPopup(username: string | undefined) {

    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '400px',
      data: username
    });
    this.dialogRef.close(true);
  }
}
