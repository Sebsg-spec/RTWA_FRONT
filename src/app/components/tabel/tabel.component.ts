import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'tabel',
    templateUrl: './tabel.component.html',
    styleUrls: ['./tabel.component.css']
})
export class TabelComponent {
    //at table component creation waits for an array of table columns
    @Input() tableColumns: string[] = [];
    //at table component creation waits for an array of table data
    @Input() tableData: any[] = [];
    constructor(private router: Router) { }

    navigateToOpenView() {
        this.router.navigate(['/openView']);
}

    alertAndSubmit(): void {
        alert('Are you sure you want to accept all employees?');
}
}
