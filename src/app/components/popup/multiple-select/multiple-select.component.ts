import { Component, EventEmitter, Output } from '@angular/core';
import { FormcontrollsService } from 'src/app/services/formcontrolls.service';

interface Options {
	value?: string;
	viewValue?: string;
}

@Component({
    selector: 'multiple-select',
    templateUrl: './multiple-select.component.html',
    styleUrls: ['./multiple-select.component.css'],

})
export class MultipleSelectComponent {
    @Output() selectedOptionsChange = new EventEmitter<{selected: string}>();
    selectedCompetences: string = '';
    selectedOptions: string[] = [];
    selected : string = '';
    constructor(private formcontrolls: FormcontrollsService){

    }


ngOnInit(){
    this.getFormByType();
}
   onCompetencesChanged(event: any){
    this.selected = event.toString();
    this.selectedCompetences = this.selected;
    this.onOptionsSelected();
}

   onOptionsSelected() {
    
        this.selectedOptionsChange.emit({selected: this.selectedCompetences});
};


private getFormByType() {
    this.formcontrolls.getRequestFormByType('Competences').subscribe(
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

options: Options[] = [];

}