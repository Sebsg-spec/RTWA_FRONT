import { Component, Input, OnInit } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { UserRolesService } from 'src/app/services/user-roles.service';

@Component({
	selector: 'app-button',
	templateUrl: './app-button.component.html',
	styleUrls: ['./app-button.component.css']
})
export class AppButtonComponent implements OnInit {
	@Input() buttonText: string = '';
	@Input() buttonType: number | undefined;

	// stores the user's role, initially empty
	userRole: string = '';
	// gets the user's account id from the session storage
	 username = sessionStorage.getItem('username');
	 userId: number | null = this.username !== null ? parseInt(this.username, 10) : null;
	// array of user roles
	userRoles: string[] = [];

	constructor(private popupService: PopupService, private userService: UserRolesService) { }

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
	}

	openPopup(): void {
		this.popupService.openPopup();
	}
}
