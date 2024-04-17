import { Component } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.css']
})

export class RequestDialogComponent {

  constructor(
    private roleService: RolesService
  ) {  }

  displayedColumns: string[] = ['id', 'reason', 'roleRequested', 'userId', 'accept'];

  roleRequests: any[] = [];

  ngOnInit(){
    this.loadRoleRequests();
  }

  loadRoleRequests() {
    // Assuming your service returns an observable
    this.roleService.GetRolesRequests().subscribe(
      (data: any[]) => {
        this.roleRequests = data; // Assign data to roleRequests array
      },
      (error) => {
        console.error(error); // Handle errors
      }
    );
  }

  acceptRoleRequest(roleRequest: any) {


    this.roleService.updateRoleRequest(roleRequest.id, roleRequest).subscribe(
      response =>{
        console.log(response)
        window.location.reload();
      }
    )
    

  }
}
