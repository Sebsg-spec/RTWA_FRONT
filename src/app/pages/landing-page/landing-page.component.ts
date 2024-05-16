
import { formatDate } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
  styleUrls: ['./landing-page.component.css'],
})

export class LandingPageComponent implements OnInit {
  constructor(private packageService: PackageService) {
    sessionStorage.setItem('pageTitle', this.page);
  }

  displayMonths = 2;

  navigation = 'arrows';

  showWeekNumbers = false;

  outsideDays = 'visible';

  page = "landing";

  dateArr: DateItem[] = [];

  dateSet: Set<string> = new Set();

  isSideMenuClosed: boolean = false;

  startAt!: Date;

  calendar = false;

  currentCalendar: 'current' | 'next' | null = null;

  model: NgbDate | null = null;

  date: string | null = null;

  packageData: Package[] = [];

  packageTableData: any[] = [];

  sendData: any[] = [];
  
  highlightedDates: { date: NgbDateStruct, type: number }[] = [];


  // Check if a date is highlighted
  isHighlighted(date: NgbDateStruct): boolean {
    return this.highlightedDates.some(highlightedDate =>
      date.year === highlightedDate.date.year &&
      date.month === highlightedDate.date.month &&
      date.day === highlightedDate.date.day
    );
  }

  getHighlightType(date: NgbDateStruct): number | null {
    const highlight = this.highlightedDates.find(highlightedDate =>
      date.year === highlightedDate.date.year &&
      date.month === highlightedDate.date.month &&
      date.day === highlightedDate.date.day
    );
    return highlight ? highlight.type : null;
  }


  ngOnInit(): void {
    this.packageService.getData().subscribe(
      response => {
        if (response && response.length > 0) {
          this.packageData = response;

          response.forEach(item => {
            if (item.startDate && item.type !== undefined && item.type !== null) {
              const startDate = new Date(item.startDate);
              let endDate: Date;

              if (item.endDate) {
                endDate = new Date(item.endDate);
              } else {
                endDate = new Date();
              }

              if (!isNaN(startDate.getTime())) {
                // Loop through all the dates between startDate and endDate
                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                  // Convert to NgbDateStruct
                  const ngbDate = { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };

                  // Check if there's already an entry for this date
                  const existingEntryIndex = this.highlightedDates.findIndex(entry =>
                    entry.date.year === ngbDate.year &&
                    entry.date.month === ngbDate.month &&
                    entry.date.day === ngbDate.day
                  );

                  if (existingEntryIndex !== -1) {
                    // If there's already an entry, combine types
                    this.highlightedDates[existingEntryIndex].type = 3;
                  } else {
                    // If there's no existing entry, add a new one
                    this.highlightedDates.push({ date: ngbDate, type: item.type });
                  }

                  // Move to the next date
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

  }



  onDateSelection(date: NgbDate) {
    const selectedDate = new Date(date.year, date.month - 1, date.day);

    this.date = selectedDate?.toString();
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate, 'yyyy-MM-dd', 'en-US');
      this.date = formattedDate;

      this.packageService.getDataByDate(formattedDate).subscribe((result: Package[]) => {
        this.packageData = result;

        // Clear the existing packageTableData
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
