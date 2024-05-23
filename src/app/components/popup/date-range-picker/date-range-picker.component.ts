import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OfferPageComponent } from 'src/app/pages/offer-page/offer-page.component';

@Component({
    selector: 'date-range-picker',
    templateUrl: './date-range-picker.component.html',
    styleUrls: ['./date-range-picker.component.css'],
    providers: [
        HttpClient
    ]
})
export class DateRangePickerComponent {
    @Input() typeget?: OfferPageComponent;

    @Output() dateRangeSelected = new EventEmitter<{ startDate: Date; endDate: Date }>();
    @Output() daysDifferenceChange: EventEmitter<number> = new EventEmitter<number>();

    tabletype: number | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    daysDifference: number | undefined;

    //Function to listen to dateevent and transmit it to the pop-up component
    onDateChange(event: any, isStartDate: boolean) {
        const selectedDate = new Date(event.value);

        if (isStartDate) {
            this.startDate = selectedDate;
        } else {
            this.endDate = selectedDate;
        }

        //check if no date was selected
        if(this.startDate && !this.endDate){
            const newEndDate = new Date(this.startDate);
            newEndDate.setDate(this.startDate.getDate());
            this.endDate = newEndDate;
        }

        this.calculateDateInterval();
        this.emitDateRange();
    }

    calculateDateInterval() {
        if (this.startDate && this.endDate) {
            const timeDifference = this.endDate.getTime() - this.startDate.getTime();
            this.daysDifference = (Math.floor(timeDifference / (1000 * 3600 * 24)) + 1);
            this.daysDifferenceChange.emit(this.daysDifference);
        }
    }

    //Functions to transmit tot the pop-up component the start and end date selected
    emitDateRange() {
        if (this.startDate && this.endDate) {
            this.dateRangeSelected.emit({ startDate: this.startDate, endDate: this.endDate });
        }
    }

}


