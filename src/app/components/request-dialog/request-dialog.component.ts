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

  displayedColumns: string[] = ['id', 'reason', 'roleRequested', 'roleRequestedId', 'userId', 'accept'];

  roleRequests: any[] = [];

  ngOnInit(){
    this.loadRoleRequests();
  }

  loadRoleRequests() {
    this.roleService.GetRolesRequests().subscribe(
      (data: any[]) => {
        this.roleRequests = data;
       
      },
      (error) => {
        console.error(error); 
      }
    );
  }

  acceptRoleRequest(roleRequest: any) {


    this.roleService.updateRoleRequest(roleRequest.id, roleRequest).subscribe(
      response =>{
        window.location.reload();
      }
    )
    

  }
}
