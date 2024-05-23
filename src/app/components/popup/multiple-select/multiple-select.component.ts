import { Component, EventEmitter, Output } from '@angular/core';
import { FormControlsService } from 'src/app/services/formcontrols.service';

//Interface for showing the data in the competences dropdown
interface Options {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'multiple-select',
    templateUrl: './multiple-select.component.html',
    styleUrls: ['./multiple-select.component.css'],

})
export class MultipleSelectComponent {
    @Output() selectedOptionsChange = new EventEmitter<{ selected: string }>();

    selectedCompetences: string = '';
    selectedOptions: string[] = [];
    selected: string = '';
    options: Options[] = [];

    constructor(private formControls: FormControlsService) {

    }

    //Initializing the competences from the database
    ngOnInit() {
        this.getFormByType();
    }


    onCompetencesChanged(event: any) {
        this.selected = event.toString();
        this.selectedCompetences = this.selected;
        this.onOptionsSelected();
    }

    //Emit the selected options
    onOptionsSelected() {

        this.selectedOptionsChange.emit({ selected: this.selectedCompetences });
    };

    //Get the data for the dropdown from the database
    private getFormByType() {
        this.formControls.getRequestFormByType('Competences').subscribe(
            (response: any[]) => {
                response.forEach((item: any) => {
                    this.options.push({
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