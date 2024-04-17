import { Component } from '@angular/core';
import { PackageService } from '../../services/package.service';
import { Package } from '../../models/Package';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-offer-page',
	templateUrl: './offer-page.component.html',
	styleUrls: ['./offer-page.component.css']
})

export class OfferPageComponent {

	constructor(private packageService: PackageService, private router: Router, private dataService: DataService) {

		this.dataService.tableType = 2;

		this.dataService.formName = 'Insert Employee Surplus';

		this.dataService.titleName = 'offered'
	}

	isSideBarClosed: boolean = false;

	packageData: Package[] = [];

	packageTableData: any[] = [];

	sendData: Element[] = [];

	surplusTitle: string = 'Surplus Details for:';

	surplusButtonValue: string = 'Insert Employee';


	ngOnInit(): void {

		// Request to the database to get the information specific for surplus table
		const Type = 2;
		this.packageService.getDataByType(Type).subscribe((result: Package[]) => {
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
	shift: number,
	totaldays: number;
	totalemployees: number;
	packageUID: string;
	nt_user: string;
}
