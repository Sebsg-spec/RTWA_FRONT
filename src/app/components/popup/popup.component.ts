import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PackageService } from 'src/app/services/package.service';
import { Package } from 'src/app/models/Package';
import { DataService } from 'src/app/services/data.service';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { AlertService } from 'src/app/services/alert.service';
import { PackageDetails } from 'src/app/models/PackageDetails';
import { PackageDetailsService } from 'src/app/services/package-details.service';
import { forkJoin } from 'rxjs';
import { FormControlsService } from 'src/app/services/formcontrols.service';


interface Department {
	value?: string;
	viewValue?: string;
}

interface Shift {
	value: string;
	viewValue: string;
}

interface Fun {
	value: string;
	viewValue: string;
}

@Component({
	selector: 'app-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.css']
})
export class PopupComponent {
	@ViewChild('formDetails', { static: false }) formDetails: ElementRef | undefined;
	@Input() surplusData?: Package;


	constructor(
		private packageService: PackageService,
		public dialogRef: MatDialogRef<PopupComponent, AlertComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dataService: DataService,
		private alertService: AlertService,
		private packageDetailsService: PackageDetailsService,
		private formControls: FormControlsService
	) {
		this.tableType = this.dataService.tableType;
		this.formularName = this.dataService.formName;
		this.response = this.dataService.alertResponse;
		this.dataService.buttonType = 'submit';
	}


	employeeArray: { id: number, selectedShift: string, selectedFunction: string }[] = [];
	departments: Department[] = [];

	shifts: Shift[] = [];

	funs: Fun[] = [];

	formText: string = 'Submit';
	response: boolean | undefined;
	user?: string;
	formularName: string | undefined;
	tableType: number | undefined;
	startDate: Date | undefined;
	endDate: Date | undefined;
	selectedCompetences: string | undefined;
	selectedDepartment: string | undefined;
	selectedShift: string | undefined;
	selectedFunction: string | undefined;
	totalEmployees!: number;
	nt_user: string | undefined;
	// time pickers
	startTime = { hour: 7, minute: 0 };
	endTime = { hour: 9, minute: 0 };
	hourStep = 1;
	minuteStep = 15;
	date2!: Date | null;

	ngOnInit(): void {
		this.getFormByType();
		this.user = sessionStorage.getItem('name') ?? '';
	}



	handleShiftHours(shift: string | undefined) {
		switch (shift) {
			case 'Early':
				this.startTime = { hour: 7, minute: 0 };
				this.endTime = { hour: 15, minute: 30 };
				break;
			case 'Late':
				this.startTime = { hour: 15, minute: 30 };
				this.endTime = { hour: 24, minute: 0 };
				break;
			case 'Night':
				this.startTime = { hour: 24, minute: 0 };
				this.endTime = { hour: 7, minute: 0 };
				break;
			default:
				console.log('Error in handleShiftHours function');
				break;
		}
	}

	convertTimeToDate(time: { hour: number; minute: number }): Date {
		return new Date(0, 0, 0, time.hour, time.minute);
	}

	//Function to check minimum time interval of 2 hours
	isIntervalValid(): boolean {
		const selectedStartTime = this.startTime.hour * 60 + this.startTime.minute;
		const selectedEndTime = this.endTime.hour * 60 + this.endTime.minute;

		const adjustedEndTime = selectedEndTime < selectedStartTime ? selectedEndTime + 1440 : selectedEndTime;

		return adjustedEndTime - selectedStartTime >= 120; // 2 hours in minutes
	}

	handleEndTimeChange() {
		if (!this.isIntervalValid()) {
			const selectedStartTime = this.startTime.hour * 60 + this.startTime.minute;
			this.endTime = {
				hour: Math.floor((selectedStartTime + 120) / 60) % 24,
				minute: (selectedStartTime + 120) % 60
			};
		}
	}


	showShiftInterval(shift: string) {
		let shiftHourInterval: string | undefined;
		switch (shift) {
			case 'Early':
				shiftHourInterval = '07:00 - 15:30';
				break;
			case 'Late':
				shiftHourInterval = '15:30 - 00:00';
				break;
			case 'Night':
				shiftHourInterval = '00:00 - 07:00';
				break;
			default:
				shiftHourInterval = 'incorrect';
				break;
		}
		return shiftHourInterval;
	}

	onDateChange(selectedDate: Date): void {
		this.date2 = selectedDate;
	}

	handleBlur(event: Event): boolean {
		const inputElement = event.target as HTMLInputElement;

		if (inputElement.validity.rangeOverflow) {
			inputElement.setCustomValidity('Value must be less than or equal to 100.');
		} else {
			inputElement.setCustomValidity('');
		}

		return inputElement.reportValidity();
	}

	onDateRangeSelected(dateRange: { startDate: Date; endDate: Date }) {
		this.startDate = dateRange.startDate;
		this.endDate = dateRange.endDate;

	}

	daysDifference: number | undefined;

	onDaysDifferenceChange(daysDifference: number) {
		this.daysDifference = daysDifference;

	}

	onSelectedOptionsChange(competences: { selected: string }) {
		this.selectedCompetences = competences.selected;
	}


	closeDialog(): void {
		this.dialogRef.close();
	}




	openAlertAndCreateSurplus(): void {

		this.alertService.openAlert().then((userConfirmed: boolean) => {
			if (userConfirmed) {
				return this.createSurplus(); // Return the promise returned by createSurplus()
			} else {
				return Promise.resolve(); // Resolve immediately if user doesn't confirm
			}
		}).then(() => {
			// After createSurplus() completes, call createDetails()
			return this.createDetails();
		}).catch((error) => {
			console.error('Error:', error);
		});
	}

	createSurplus(): Promise<void> {
		return new Promise<void>((resolve, reject) => {

			const surplusData: Package = {
				// Initialize other properties if needed
			};

			// Set the startDate and endDate properties here
			if (this.date2) {
				// Create startDate by combining date2 and startTime
				const startDateLocal = new Date(
					this.date2.getFullYear(),
					this.date2.getMonth(),
					this.date2.getDate(),
					this.startTime.hour,
					this.startTime.minute
				);

				surplusData.startDate = startDateLocal;

				// Create endDate by combining date2 and endTime
				const endDateLocal = new Date(
					this.date2.getFullYear(),
					this.date2.getMonth(),
					this.date2.getDate(),
					this.endTime.hour,
					this.endTime.minute
				);

				// Check if the shift goes past midnight
				const shiftEndTime = this.endTime.hour * 60 + this.endTime.minute;
				const shiftGoesPastMidnight = shiftEndTime < this.startTime.hour * 60 + this.startTime.minute;

				// Set the endDate accordingly
				if (shiftGoesPastMidnight) {
					// If shift goes past midnight, add a day
					endDateLocal.setDate(endDateLocal.getDate() + 1);
				}

				surplusData.endDate = endDateLocal;

			} else if (this.startDate && this.endDate) {

				// ADD HOURS BASED ON SELECTED SHIFT FOR DATE INTERVALS ( 'MORE THAN ONE DAY' FORM )
				const startDateLocal = new Date(
					this.startDate.getFullYear(),
					this.startDate.getMonth(),
					this.startDate.getDate(),
				);
				switch (this.selectedShift) {
					case 'Early':
						startDateLocal.setHours(7, 0);
						break;
					case 'Late':
						startDateLocal.setHours(15, 30);
						break;
					case 'Night':
						startDateLocal.setHours(24, 0);
						break;
					default:
						console.log("Error in setting shift hours");
						break;
				}
				surplusData.startDate = startDateLocal;

				const endDateLocal = new Date(
					this.endDate.getFullYear(),
					this.endDate.getMonth(),
					this.endDate.getDate(),
				);
				switch (this.selectedShift) {
					case 'Early':
						endDateLocal.setHours(15, 30);
						break;
					case 'Late':
						endDateLocal.setHours(24, 0);
						break;
					case 'Night':
						endDateLocal.setHours(7, 0);
						endDateLocal.setDate(endDateLocal.getDate() + 1);
						break;
					default:
						console.log("Error in setting shift hours");
						break;
				}
				surplusData.endDate = endDateLocal;
			}

			// Get data from other form elements
			surplusData.nT_User = this.user;
			surplusData.department = this.selectedDepartment;
			surplusData.shift = this.selectedShift;
			surplusData.functions = this.selectedFunction;
			surplusData.totalEmployees = this.totalEmployees;
			surplusData.totalDays = this.daysDifference;
			surplusData.createdOn = new Date();

			// Convert createdOn to UTC
			surplusData.createdOn.setMinutes(surplusData.createdOn.getMinutes() - surplusData.createdOn.getTimezoneOffset());

			// Set the selected competences
			surplusData.type = this.tableType;
			surplusData.competences = this.selectedCompetences;



			this.packageService.createPackage(surplusData).subscribe(
				(surplusData: Package[]) => {
					//this.dataUpdated.emit(surplusData);
					// reset the date variables
					this.date2 = null;
					this.startDate = undefined;
					this.endDate = undefined;
					this.daysDifference = undefined;
					resolve();
				},
				(error) => {
					console.error('Error adding surplus data:', error);
					reject(error);
				}
			);
		});
	}


	private createDetails() {
		const surplusDetailsData: PackageDetails = {
			// Define your surplusDetailsData here
		};

		this.packageService.getDataByLatestAndUser(this.user).subscribe(
			(response => {
				surplusDetailsData.packageId = response[0].packageUID;
				surplusDetailsData.competences = response[0].competences;
				surplusDetailsData.createdOn = response[0].createdOn;
				surplusDetailsData.functions = response[0].functions;
				surplusDetailsData.startDate = response[0].startDate;
				surplusDetailsData.endDate = response[0].endDate;
				surplusDetailsData.totalDays = response[0].totalDays;
				surplusDetailsData.shift = response[0].shift;
				surplusDetailsData.nT_User = this.user;

				const observables = [];
				for (let i = 0; i < this.totalEmployees; i++) {
					observables.push(this.packageDetailsService.createPackageDetails(surplusDetailsData));
				}

				// Wait for all observables to complete
				forkJoin(observables).subscribe(
					(results) => {
						//this.dataUpdated.emit(results); // emit all results
						// reloadthe page
						 window.location.reload();
					},
					(error) => {
						// handle errors
						console.error('Error adding surplus details:', error);
					}
				);
			})
		);
	}


	private getFormByType() {
		this.formControls.getRequestFormByType('Department').subscribe(
			(response: any[]) => {
				response.forEach((item: any) => {
					this.departments.push({
						value: item.value,
						viewValue: item.value
					});
				});
			},
			(error: any) => {
				console.error('Error fetching form data:', error);
			}
		);

		this.formControls.getRequestFormByType('Shift').subscribe(
			(response: any[]) => {
				response.forEach((item: any) => {
					this.shifts.push({
						value: item.value,
						viewValue: item.value
					});
				});
			},
			(error: any) => {
				console.error('Error fetching form data:', error);
			}
		);

		this.formControls.getRequestFormByType('Functions').subscribe(
			(response: any[]) => {
				response.forEach((item: any) => {
					this.funs.push({
						value: item.value,
						viewValue: item.value
					});
				});

			},
			(error: any) => {
				console.error('Error fetching form data:', error);
			}
		);
	}


}


/*nextFormPage() {
	let popupForm = document.querySelector('.lack-form');
	let generalFormElements = document.querySelectorAll('.form-general-info');
	let nextBtn = document.getElementById('next-btn');
	let submitBtn = document.getElementById('submit-btn');
	let backBtn = document.getElementById('back-btn');
	let formDetails = document.getElementById('form-details');

	let list: number[] = [];
	for (let i = 1; i <= this.totalEmployees; i++) {
		list.push(i);
	}

	this.employeeArray = list.map(id => ({ id, selectedShift: '', selectedFunction: '' }));

	(popupForm as HTMLElement).classList.toggle('widen');
	for (const element of Array.from(generalFormElements)) {
		(element as HTMLElement).classList.toggle('hidden');
	};
	(nextBtn as HTMLElement).classList.toggle('hidden');
	(backBtn as HTMLElement).classList.toggle('hidden');
	(submitBtn as HTMLElement).classList.toggle('hidden');
	if (this.formDetails) {
		this.formDetails.nativeElement.classList.toggle('hidden');
	}
}

backFormPage() {
	let popupForm = document.querySelector('.lack-form');
	let generalFormElements = document.querySelectorAll('.form-general-info');
	let nextBtn = document.getElementById('next-btn');
	let submitBtn = document.getElementById('submit-btn');
	let backBtn = document.getElementById('back-btn');
	let formDetails = document.getElementById('form-details')
	let nrOfPeople = this.totalEmployees;
	(popupForm as HTMLElement).classList.toggle('widen');
	for (const element of Array.from(generalFormElements)) {
		(element as HTMLElement).classList.toggle('hidden');
	}
	(nextBtn as HTMLElement).classList.toggle('hidden');
	(backBtn as HTMLElement).classList.toggle('hidden');
	(submitBtn as HTMLElement).classList.toggle('hidden');
	if (this.formDetails) {
		this.formDetails.nativeElement.classList.toggle('hidden');
	}
}*/

// resetForm() {
// 	this.startDate = undefined;
// 	this.endDate = undefined;
// 	this.selectedDepartment = undefined;
// 	this.selectedCompetences = undefined;
// 	this.selectedFunction = undefined;
// 	this.selectedShift = undefined;
// 	this.totalEmployees = 0;
// 	this.date2 = null;
// 	console.log(this.startDate, this.endDate, this.selectedDepartment, this.selectedCompetences, this.selectedFunction, this.selectedShift, this.totalEmployees, this.date2);
// }

// private createDetails1() {

// 	const surplusDetailsData: PackageDetails = {

// 	};

// 	this.packageService.getDataByLatestAndUser(this.user).subscribe(
// 		(response => {

// 			surplusDetailsData.packageID = response[0].packageUID;
// 			surplusDetailsData.competences = response[0].competences;
// 			surplusDetailsData.createdOn = response[0].createdOn;
// 			surplusDetailsData.functions = response[0].functions;
// 			surplusDetailsData.startDate = response[0].startDate;
// 			surplusDetailsData.endDate = response[0].endDate;
// 			surplusDetailsData.totalDays = response[0].totalDays;
// 			surplusDetailsData.shift = response[0].shift;
// 			surplusDetailsData.nT_User = this.user;

// 			for (let i = 0; i < this.totalEmployees; i++) {
// 				this.packageDetailsService.createPackageDetails(surplusDetailsData).subscribe(
// 					(surplusDetailsData: PackageDetails[]) => {
// 						//this.dataUpdated.emit(surplusDetailsData);

// 					}

// 				);
// 			}
// 		})
// 	);
// }

/* createSurplus(): Promise<void> {
   return new Promise<void>((resolve, reject) => {

	 const surplusData: Package = {
	   // Initialize other properties if needed
	 };

	 // Set the startDate and endDate properties here
	 if (this.startDate && this.endDate) {
	   surplusData.startDate = this.startDate;
	   surplusData.endDate = this.endDate;
	 }

	 // Get data from other form elements
	 surplusData.nt_user = this.user;
	 surplusData.department = this.selectedDepartment;
	 surplusData.shift = this.selectedShift;
	 surplusData.functions = this.selectedFunction;
	 surplusData.totalEmployees = this.totalEmployees;
	 surplusData.totalDays = this.daysDifference;
	 surplusData.createdOn = new Date();

	 // Set the selected competences
	 surplusData.type = this.tableType;
	 surplusData.competences = this.selectedCompetences;

	 //Add data into SurplusTableDetails

	 this.packageService.createPackage(surplusData).subscribe(
	   (surplusData: Package[]) => {
		 this.dataUpdated.emit(surplusData);

		 setTimeout(() => { this.reloadPage() }, 400);
		 //this.reloadPage();
		 resolve();


	   },
	   (error) => {
		 console.error('Error adding surplus data:', error);
		 reject(error);
	   }
	 );









   });
 }*/
