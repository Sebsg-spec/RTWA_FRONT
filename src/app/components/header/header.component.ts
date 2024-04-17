import { Component, OnInit } from '@angular/core';
import { FormControlsService } from 'src/app/services/formcontrols.service';
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

  endUser: string | undefined;
  support: string | undefined;
  suggest: string | undefined
  feedback: string | undefined;
  constructor(
    private userService: UserRolesService,
    private formControlservice: FormControlsService) { }

  ngOnInit(): void {
    const accountId = this.userId;
    this.userService.getUserRoles(accountId!).subscribe(
      roles => {
        // populate the userRoles array with roles
        this.userRoles = roles;
        this.userRole = this.userRoles[0];
      },
      error => {
        console.error('Failed to fetch user roles:', error);
      }
    );

    // this.formControlservice.getRequestFormByType('Enduser').subscribe(
    //   (response: any) => {
    //     this.endUser = response[0].value;
    //   },
    //   (error: any) => {
    //     console.error('Error fetching form data:', error);
    //   }
    // );
    // this.formControlservice.getRequestFormByType('Support').subscribe(
    //   (response: any) => {
    //     this.support = response[0].value;
    //   },
    //   (error: any) => {
    //     console.error('Error fetching form data:', error);
    //   }
    // );
    // this.formControlservice.getRequestFormByType('Suggest').subscribe(
    //   (response: any) => {
    //     this.suggest = response[0].value;
    //   },
    //   (error: any) => {
    //     console.error('Error fetching form data:', error);
    //   }
    // );
    // this.formControlservice.getRequestFormByType('Feedback').subscribe(
    //   (response: any) => {
    //     this.feedback = response[0].value;
    //   },
    //   (error: any) => {
    //     console.error('Error fetching form data:', error);
    //   }
    // );
  }

}
