import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { UserRolesService } from 'src/app/services/user-roles.service';
import { RequestDialogComponent } from '../request-dialog/request-dialog.component';
import { Dialog } from '@angular/cdk/dialog';


@Component({
	selector: 'sidemenu',
	templateUrl: './sidemenu.component.html',
	styleUrls: ['./sidemenu.component.css',
	],
	animations: [],
})
export class SidemenuComponent implements OnInit {

	constructor(
		private userService: UserRolesService,
		private roleService: RolesService,
		private router: Router,
		private dialog: Dialog
	) { }

	@Output() sideMenuState = new EventEmitter<boolean>();

	user!: string;
	isSidebarClosed = false;

	// stores the user's role, initially empty
	userRole: string = '';
	// gets the user's account id from the session storage
	userId: string | null = sessionStorage.getItem('username');
	// array of user roles

	requestsAvailable: boolean = false;

	public hasRequestedHigherRole: boolean = false;


	ngOnInit(): void {
		this.user = sessionStorage.getItem('name') ?? '';

			this.roleService.GetRoleRequest(this.userId).subscribe(
			response =>{
					if (response !== null) {
						this.hasRequestedHigherRole = true;
						
					}
			}
		)

			this.roleService.GetRolesRequests().subscribe(
				response =>{
					if(response != null){
						this.requestsAvailable = true
					}
				}
			);
		

		const accountId = this.userId; 

		this.userService.getUserRoles(accountId!).subscribe(
			roles => {
				if (roles[0] === 'viewer') {
					this.userRole = 'Viewer'
				}
				else if (roles[0] === 'standard_user'){
					this.userRole = 'Standard' 
				}else if(roles[0] === 'key_user'){
					this.userRole = 'Key User'
				}else if(roles[0] === 'admin'){
					this.userRole = 'Admin'
				}
			},
			error => {
				console.error('Failed to fetch user roles:', error);
			}
		);
	}

	toggleSidebar() {
		this.isSidebarClosed = !this.isSidebarClosed;
		this.sideMenuState.emit(this.isSidebarClosed);
	}

	openPopUp(): void{
		this.roleService.openAlert();
	}

	openRequestsDialog() {
		//Open the dialog to view role upgrade requests
		this.dialog.open(RequestDialogComponent, {
			width: '500px', 
		});
	}


	logOut(): void {
	sessionStorage.clear()	
		this.router.navigateByUrl('');
	}

}
