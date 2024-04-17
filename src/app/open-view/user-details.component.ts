import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  username: string | undefined; //Getting the user from the open-view-table component

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserDetailsComponent>,
    private dataService: DataService
  ) {

  }

  ngOnInit() {
    this.username = this.dataService.username
  }

  closeDialog(): void {
    // Close the dialog when the user clicks OK
    this.dialogRef.close();
    setTimeout(() => window.location.reload(), 1500)
  }


}
