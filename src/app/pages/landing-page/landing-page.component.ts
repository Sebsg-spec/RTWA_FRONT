
import { formatDate } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { end } from '@popperjs/core';
import { Package } from 'src/app/models/Package';
import { DataService } from 'src/app/services/data.service';
import { PackageService } from 'src/app/services/package.service';

interface DateItem {
	date: Date;
	type: number;
}



@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.css'], encapsulation: ViewEncapsulation.None
})

export class LandingPageComponent implements OnInit {
	constructor(private packageService: PackageService, private dataService: DataService) {
		const today = new Date();
		this.selectedCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		this.selectedNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
		let page = 'landing';
		sessionStorage.setItem('pageType', page)

	}


	date: string | undefined;

	endDate: string | undefined;

	selectedCurrentMonth: Date | null;

	selectedNextMonth: Date | null;

	selected!: Date

	dateArr: DateItem[] = [];

	dateSet: Set<string> = new Set();

	packageData: Package[] = [];

	packageTableData: any[] = [];

	sendData: Element[] = [];

	isSideMenuClosed: boolean = false;

	startAt!: Date;

	calendar = false;


	currentCalendar: 'current' | 'next' | null = null;



	ngOnInit(): void {

		setTimeout(() => {

			this.calendar = true
		}, 400);

		this.packageService.getData().subscribe(
			response => {
				if (response && response.length > 0) {
					this.packageData = response;

					response.forEach(item => {
						if (item.startDate && item.type !== undefined && item.type !== null) {
							const date = new Date(item.startDate);
							let endDate: Date;

							if (item.endDate) {
								endDate = new Date(item.endDate);
							}
							else {
								endDate = new Date();
							}
							if (!isNaN(date.getTime())) {
								const formattedDate = date.toISOString().slice(0, 10);
								const endFormattedDate = endDate?.toISOString().slice(0, 10);

								let currentDate = date;
								while (currentDate <= endDate) {
									//Check if there's already an entry for this date
									const existingEntryIndex = this.dateArr.findIndex(entry => entry.date.toISOString().slice(0, 10) === currentDate.toISOString().slice(0, 10));
									if (existingEntryIndex !== -1) {
										//if there's already an entry combine types
										if (this.dateArr[existingEntryIndex].type !== 3) {
											this.dateArr[existingEntryIndex].type = 3
										}
									} else {
										//if there's no existing entry, add a new one
										this.dateArr.push({
											date: new Date(currentDate),
											type: item.type,
										});
									}
									//move to the next date
									currentDate.setDate(currentDate.getDate() + 1);
								}
							} else {
								console.error('Invalid date format:', item.startDate);
							}
						} else {
							console.error('Missing startDate or type:', item);
						}
					});
				} else {
					console.error('Empty or invalid response:', response);
				}
			},
			error => {
				console.error('Error fetching data:', error);
			}
		);

		let today = new Date();
		let month = today.getMonth() + 1;
		let year = today.getUTCFullYear();
		let day = today.getDay();

		this.startAt = new Date(year, month, day);
	}

	dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
		if (view === 'month') {
			// Extract year, month, and day from the cellDate
			const cellYear = cellDate.getFullYear();
			const cellMonth = cellDate.getMonth();
			const cellDay = cellDate.getDate();

			// Check if any date in dateArr matches the cellDate
			const dateObj = this.dateArr.find(item => {
				const itemDate = new Date(item.date);
				return itemDate.getFullYear() === cellYear &&
					itemDate.getMonth() === cellMonth &&
					itemDate.getDate() === cellDay;
			});

			// If a matching date is found, apply appropriate styling based on type
			if (dateObj) {
				if (dateObj.type === 1) {
					return 'custom-date-lack';
				} else if (dateObj.type === 2) {
					return 'custom-date-surplus';
				} else if (dateObj.type === 3) {
					return 'custom-date-both';
				}
			}
		}
		return '';
	};

	onDateSelected(selectedDate: Date | null, calendarNumber: number) {
		if (calendarNumber == 1) {
			this.currentCalendar = 'current';
		}
		else {
			this.currentCalendar = 'next';
		}

		this.date = selectedDate?.toString()

		if (selectedDate) {
			const formattedDate = formatDate(selectedDate, 'yyyy-MM-dd', 'en-US');
			this.date = formattedDate
			this.packageService.getDataByDate(formattedDate).subscribe((result: Package[]) => {
				this.packageData = result;
				this.packageTableData = [];
				
				// Populate packageTableData with the new data
				this.packageData.forEach((request, index) => {
					this.packageTableData.push({
						position: index + 1,
						type: request.type || '',
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
				// Update sendData with the new packageTableData
				this.sendData = this.packageTableData;
			});
		}
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
	type: number;
}
