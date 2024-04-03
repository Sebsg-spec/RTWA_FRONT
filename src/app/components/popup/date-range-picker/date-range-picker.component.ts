import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SurplusPageComponent } from 'src/app/surplus-page/surplus-page.component';

@Component({
    selector: 'date-range-picker',
    templateUrl: './date-range-picker.component.html',
    styleUrls: ['./date-range-picker.component.css'],
    standalone: true,
    imports: [MatFormFieldModule, MatDatepickerModule, MatNativeDateModule],
})
export class DateRangePickerComponent {
    @Input() typeget?: SurplusPageComponent;
    @Output() dateRangeSelected = new EventEmitter<{ startDate: Date; endDate: Date }>();
    @Output() typeemit = new EventEmitter<number>();
    @Output() daysDifferenceChange: EventEmitter<number> = new EventEmitter<number>();  
    tabletype: number | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    daysDifference: number | undefined;

    onDateChange(event: any, isStartDate: boolean) {
        const selectedDate = new Date(event.value);
            
        if (isStartDate) {
            this.startDate = selectedDate;
        } else {
            this.endDate = selectedDate;
        }
        
        this.calculateDateInterval();
        this.emitDateRange();
}

    calculateDateInterval() {
        if (this.startDate && this.endDate) {
            const timeDifference = this.endDate.getTime() - this.startDate.getTime();
            this.daysDifference = (Math.floor(timeDifference / (1000 * 3600 * 24))+1);         
            this.daysDifferenceChange.emit(this.daysDifference);      
        }
}

    emitDateRange() {
        if (this.startDate && this.endDate) {
          this.dateRangeSelected.emit({ startDate: this.startDate, endDate: this.endDate });
        }
}

    sendValue( num: number){
        
        this.typeemit.emit(num);  
}
    
}


