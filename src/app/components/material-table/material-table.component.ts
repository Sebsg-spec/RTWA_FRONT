import { Component, ViewChild, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { RequestTableService } from 'src/app/services/request-table.service';
import { RequestTable } from 'src/app/models/RequestTable';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { UserRolesService } from 'src/app/services/user-roles.service';

@Component({
	selector: 'app-material-table',
	templateUrl: './material-table.component.html',
	styleUrls: ['./material-table.component.css']
})

export class MaterialTableComponent implements OnInit {
	@Input() inputTitle: string = '';
	@Input() set data(value: Element[]) {
		this.dataSource.data = value;
	}
	dataSource = new MatTableDataSource<Element>([]);

	constructor(private router: Router,
		private cdr: ChangeDetectorRef,
		private dataService: DataService,
		private userService: UserRolesService) { }


	requestData: RequestTable[] = [];
	surplusTableData: Element[] = [];

	// stores the user's role, initially empty
	userRole: string = '';
	// gets the user's account id from the session storage
	userId: string | null = sessionStorage.getItem('username');
	// array of user roles
	userRoles: string[] = [];


	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	displayedColumns = ['position', 'function', 'department', 'startdate', 'enddate', 'shift', 'totaldays', 'totalemployees', 'actions'];

	ngOnInit(): void {

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

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		setTimeout(() => {
			this.sort.active = 'startdate';
			this.sort.direction = 'asc';
		});

	}

	isPastDate(startDate: Date): boolean {
		const currentDate = new Date();
		return startDate < currentDate;
	}

	navigateToOpenView(requestUID: number, nt_user: string) {

		this.dataService.username = nt_user;
		if (requestUID !== undefined && nt_user !== undefined) {
			this.router.navigate(['/openView', requestUID, nt_user]);
		}
		else {
			console.error('Invalid parameters for navigation.');
		}
	}

};

export interface Element {
	position: number;
	function: string;
	competences: string;
	department: string;
	startdate: Date;
	enddate: Date;
	shift: number;
	totaldays: number;
	totalemployees: number;
	requestUID: string;
	nt_user: string;
	[key: string]: any;
}
