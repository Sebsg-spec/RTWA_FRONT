import { Component } from '@angular/core';
import { RequestTableService } from '../services/request-table.service';
import { RequestTable } from '../models/RequestTable';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { LogIn } from '../models/LogIn';
import { LogInService } from '../services/LogInService';
@Component({
	selector: 'app-lack-page',
	templateUrl: './lack-page.component.html',
	styleUrls: ['./lack-page.component.css']
})
export class LackPageComponent {



	constructor(private RequestTableService: RequestTableService, private LoginService: LogInService,  private router: Router, private dataService: DataService,  ){
		this.dataService.tableType = 1;
		this.dataService.formName  = 'Request Employees';
		this.dataService.titleName = 'demanded';

	}


	requestData: RequestTable[] = [];
	surplusTableData: any[] = [];
	sendData: Element[] = [];
	surplusTitle: string = 'Lack Details for:';
	// assign lack page button value to the button component
	lackButtonValue: string = 'Request Employees';

	ngOnInit(): void {
		// Request to the database to get the information specific for surplus table
		const Type = 1;
		this.RequestTableService

		  .getRequestTableByType(Type)
		  .subscribe((result: RequestTable[]) => {
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





	navigateToOpenView() {
        this.router.navigate(['/openView']);
    }

	updateData(requestData: RequestTable[]){
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
	shift: number;
	totaldays: number;
	totalemployees: number;
	requestUID: string;
	nt_user: string;
}
