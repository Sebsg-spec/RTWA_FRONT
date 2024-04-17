import { Component } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';
import { UserRolesService } from 'src/app/services/user-roles.service';

@Component({
  selector: 'app-role-request',
  templateUrl: './role-request.component.html',
  styleUrls: ['./role-request.component.css']
})
export class RoleRequestComponent {
  constructor(
    private userService: UserRolesService,
    private roleService: RolesService
  ) {

  }
  user?: string;

  // stores the user's role, initially empty
  userPageRole: string = '';

  roleRequested: string = '';

  reason: string = '';

  roleRequestedID: number = 0;

  account_id: number = 0;
  // gets the user's account id from the session storage
  userId: string | null = sessionStorage.getItem('username');
  // array of user roles
  userRoles: string[] = [];



  ngOnInit(): void {
    this.user = sessionStorage.getItem('name') ?? '';

    const accountId = this.userId; // set the logged-in user's account ID

    this.userService.getUserRoles(accountId!).subscribe(
      roles => {
        // populate the userRoles array with roles
        this.userRoles = roles;
        this.userPageRole = this.userRoles[0];
      },
      error => {
        console.error('Failed to fetch user roles:', error);
      }
    );
    this.roleService.GetRoleRequest(this.userId).subscribe(
      response =>{
        console.log(response)
      }
    )
  }

  submitForm() {
    if (this.roleRequested == "standard") {
      const formData = {
        roleRequested: this.roleRequested,
        reason: this.reason,
        roleRequestedId: 3,
        account_id: this.userId
      };

      this.roleService.CreateRoleRequest(formData).subscribe(
        response => {
          location.reload()
        }
      );
    }
    else if (this.roleRequested == "key-user") {
      const formData = {
        roleRequested: this.roleRequested,
        reason: this.reason,
        roleRequestedId: 2,
        account_id: this.userId
      };
      this.roleService.CreateRoleRequest(formData).subscribe(
        response => {
          location.reload()
        }
      );
    }
    else if (this.roleRequested == "admin") {
      const formData = {
        roleRequested: this.roleRequested,
        reason: this.reason,
        roleRequestedId: 1,
        account_id: this.userId
      };
      this.roleService.CreateRoleRequest(formData).subscribe(
        response => {
          location.reload()
        }
      );
    }
  }

  


}
