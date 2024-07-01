import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Package } from 'src/app/models/Package';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { UserRolesService } from 'src/app/services/user-roles.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { FormControlsService } from 'src/app/services/formcontrols.service';
import { start } from '@popperjs/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-material-table',
	templateUrl: './material-table.component.html',
	styleUrls: ['./material-table.component.css']
})

export class MaterialTableComponent extends MatPaginatorIntl {
	@Input() inputTitle: string = '';
	@Input() set data(value: Element[]) {
		this.dataSource.data = value;
		this.dataDisplayed.data = this.dataSource.filteredData
	}
	dataSource = new MatTableDataSource<Element>([]);
	dataDisplayed = new MatTableDataSource<Element>([]);

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	packageData: Package[] = [];
	packageTableData: Element[] = [];

	// stores the user's role, initially empty
	userRole: string = '';
	// gets the user's account id from the session storage
	username = sessionStorage.getItem('username');
	userId: number | null = this.username !== null ? parseInt(this.username, 10) : null;
	// array of user roles
	userRoles: string[] = [];

	pageTitle!: string | null;

	myControl = new FormControl('');

	filteredOptions: Observable<Options[]> | undefined;

	options: Options[] = [];

	displayedColumns = ['position', 'function', 'department', 'startdate', 'enddate', 'shift', 'totaldays', 'totalemployees', 'actions'];


	constructor(private router: Router,
		private dataService: DataService,
		private userService: UserRolesService,
		private formControls: FormControlsService,
		private translate: TranslateService
	) { 
		super();
		this.translateLabels();

		this.translate.onLangChange.subscribe(() => {
			this.translateLabels();
			this.changes.next();
		});
			
	}

	translateLabels() {
		this.itemsPerPageLabel = this.translate.instant('ITEMS_PER_PAGE');
		this.nextPageLabel = this.translate.instant('NEXT_PAGE');
		this.previousPageLabel = this.translate.instant('PREVIOUS_PAGE');
		this.firstPageLabel = this.translate.instant('FIRST_PAGE');
		this.lastPageLabel = this.translate.instant('LAST_PAGE');
	}

	private _filter(value: string): Options[] {
		const filterValue = value.toLowerCase();
		return this.options.filter(option => option.viewValue.toLowerCase().includes(filterValue));
	}


	ngOnInit(): void {
		this.formControls.getRequestFormByType('Competences').subscribe(
			(response: any[]) => {
				response.forEach((item: any) => {
					this.options.push({
						value: item.value,
						viewValue: item.value
					});
				});
				this.filteredOptions = this.myControl.valueChanges.pipe(
					startWith(''),
					map(value => {
						if (!value) {
							this.dataDisplayed.data = this.dataSource.filteredData;
						}
						return this._filter(value!);
					})
				);
			},
			(error: any) => {
				console.error('Error fetching from data: ', error)
			}
		);



		this.pageTitle = sessionStorage.getItem("pageType")
		if (this.pageTitle == 'landing') {
			this.displayedColumns = ['position', 'type', 'function', 'department', 'startdate', 'enddate', 'shift', 'totaldays', 'totalemployees', 'actions'];
		} else {
			this.displayedColumns = ['position', 'function', 'department', 'startdate', 'enddate', 'shift', 'totaldays', 'totalemployees', 'actions'];
		}
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

	//Initializing sorting based on startdate
	ngAfterViewInit() {
		this.dataDisplayed.paginator = this.paginator;
		this.dataDisplayed.sort = this.sort;
		setTimeout(() => {
			this.sort.active = 'startdate';
			this.sort.direction = 'asc';
		}, 1);
	}

	onOptionsSelected(selection: string) {
		if (selection) {
			const filteredSet = this.dataSource.filteredData.filter(option => option.competences?.includes(selection));
			this.dataDisplayed.data = filteredSet;
			return filteredSet;
		}
		else {
			this.dataDisplayed.data = this.dataSource.filteredData;
			return [];
		}
	}

	//Function to check if the current date is in the past so that we can show the warning sign
	isPastDate(startDate: Date): boolean {
		const currentDate = new Date();
		return startDate < currentDate;
	}

	//Function to open the details page for a specific package
	navigateToOpenView(packageUID: number, nt_user: string) {

		this.dataService.username = nt_user;
		if (packageUID !== undefined && nt_user !== undefined) {
			this.router.navigate(['/openView', packageUID, nt_user]);
		}
		else {
			console.error('Invalid parameters for navigation.');
		}
	}

};

//Interface for displaying table data
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
	packageUID: string;
	nt_user: string;
	[key: string]: any;
}

interface Options {
	value: string | undefined;
	viewValue: string;
}
