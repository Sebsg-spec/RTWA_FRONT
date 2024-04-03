import { Component, OnInit } from '@angular/core';
import { UserRolesService } from 'src/app/services/user-roles.service';


@Component({
	selector: 'sidemenu',
	templateUrl: './sidemenu.component.html',
	styleUrls: ['./sidemenu.component.css',
	],
	animations: [],
})
export class SidemenuComponent implements OnInit {

	constructor(
		private userService: UserRolesService) { }

	user?: string;

	// stores the user's role, initially empty
	userRole: string = '';
	// gets the user's account id from the session storage
	userId: string | null = sessionStorage.getItem('username');
	// array of user roles
	userRoles: string[] = [];

	ngOnInit(): void {
		this.user = sessionStorage.getItem('username') ?? '';

		const accountId = this.userId; // set the logged-in user's account ID

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
	}

	isSidebarClosed = false;

	toggleSidebar() {
		this.isSidebarClosed = !this.isSidebarClosed;
	}
}
