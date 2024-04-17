import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private dialog: MatDialog) { }
  openAlert(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const dialogRef = this.dialog.open(AlertComponent, {});

      dialogRef.afterClosed().subscribe((userConfirmed: boolean) => {
        resolve(userConfirmed);
      });
    });
  }


}