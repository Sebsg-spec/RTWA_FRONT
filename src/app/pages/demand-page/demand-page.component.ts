import { Component } from '@angular/core';
import { PackageService } from '../../services/package.service';
import { Package } from '../../models/Package';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { LogInService } from '../../services/LogInService';
@Component({
	selector: 'app-demand-page',
	templateUrl: './demand-page.component.html',
	styleUrls: ['./demand-page.component.css']
})
export class DemandPageComponent {



	constructor(private packageService: PackageService, private LoginService: LogInService, private router: Router, private dataService: DataService,) {
		this.dataService.tableType = 1;
		this.dataService.formName = 'Request Employees';
		this.dataService.titleName = 'demanded';

	}

		isSideBarClosed: boolean = false;

	packageData: Package[] = [];
	packageTableData: any[] = [];
	sendData: Element[] = [];
	surplusTitle: string = 'Lack Details for:';
	lackButtonValue: string = 'Request Employees';

	ngOnInit(): void {
		// Request to the database to get the information specific for package table
		const Type = 1;
		this.packageService

			.getDataByType(Type)
			.subscribe((result: Package[]) => {
				this.packageData = result;

				// Data shown in the tables
				this.packageData.forEach((request, index) => {
					this.packageTableData.push({
						position: index + 1,
						function: request.functions || '',
						competences: request.competences || '',
						department: request.department || '',
						startdate: request.startDate ? new Date(request.startDate) : '',
						enddate: request.endDate ? new Date(request.endDate) : '',
						shift: request.shift || '',
						totaldays: request.totalDays,
						totalemployees: request.totalEmployees || 0,
						packageUID: request.packageUID || '',
						nt_user: request.nT_User || '',
					});
				});


				this.sendData = this.packageTableData;
			});

	}

	updateData(packageData: Package[]) {
		this.packageData = packageData;
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
	packageUID: string;
	nt_user: string;
}
