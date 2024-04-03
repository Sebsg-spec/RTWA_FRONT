import { Component, OnInit } from '@angular/core';
import { UserRolesService } from 'src/app/services/user-roles.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // stores the user's role, initially empty
  userRole: string = '';
  // gets the user's account id from the session storage
  userId: string | null = sessionStorage.getItem('username');
  // array of user roles
  userRoles: string[] = [];

  constructor(
    private userService: UserRolesService) { }

  ngOnInit(): void {
    const accountId = this.userId; // set the logged-in user's account ID
    this.userService.getUserRoles(accountId!).subscribe(
      roles => {
        // populate the userRoles array with roles
        this.userRoles = roles;
        this.userRole = this.userRoles[0];

        //console.log(`HEADER COMPONENT: => ${accountId} account has the ${this.userRoles[0]} role assigned`);
      },
      error => {
        console.error('Failed to fetch user roles:', error);

      }
    );
  }

}
