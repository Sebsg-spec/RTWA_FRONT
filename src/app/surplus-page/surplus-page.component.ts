import { Component } from '@angular/core';
import { RequestTableService } from '../services/request-table.service';
import { RequestTable } from '../models/RequestTable';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
	selector: 'app-surplus-page',
	templateUrl: './surplus-page.component.html',
	styleUrls: ['./surplus-page.component.css']
})
export class SurplusPageComponent {
	constructor(private RequestTableService: RequestTableService, private router: Router, private dataService: DataService) {
		this.dataService.tableType = 2;
		this.dataService.formName = 'Insert Employee Surplus';
		this.dataService.titleName = 'offered'
	}

	requestData: RequestTable[] = [];
	surplusTableData: any[] = [];
	sendData: Element[] = [];
	surplusTitle: string = 'Surplus Details for:';

	ngOnInit(): void {

		// Fetch the user data

		// Request to the database to get the information specific for surplus table
		const Type = 2;
		this.RequestTableService.getRequestTableByType(Type).subscribe((result: RequestTable[]) => {
			this.requestData = result;


			// Data shown in the tables
			this.requestData.forEach((request, index) => {
				this.surplusTableData.push({
					position: index + 1,
					function: request.functions || '',
					competences: request.competences || '',
					department: request.department || '',
					startdate: request.startDate ? new Date(request.startDate) : '',
					enddate: request.endDate ? new Date(request.endDate) : '',
					shift: request.shift || '',
					totaldays: request.totalDays,
					totalemployees: request.totalEmployees || 0,
					requestUID: request.requestUID || '',
					nt_user: request.nT_User || '',
				});
			});
			this.sendData = this.surplusTableData;
		});
	}


	// assign surplus page button value to the button component
	surplusButtonValue: string = 'Insert Employee';

	navigateToOpenView() {
		this.router.navigate(['/openView']);
	}

	alertAndSubmit(): void {
		const userConfirmed = window.confirm('Are you sure you want to submit?');
		if (userConfirmed) {

		} else {

		}
	}

	updateData(requestData: RequestTable[]) {
		this.requestData = requestData;
	}



}


export interface Element {
	position: number;
	function: string;
	competences: string;
	department: string;
	startdate: Date;
	enddate: Date;
	shift: number,
	totaldays: number;
	totalemployees: number;
	requestUID: string;
	nt_user: string;
}
