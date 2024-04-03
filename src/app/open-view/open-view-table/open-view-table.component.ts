import { Component, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { RequestTableDetailsService } from 'src/app/services/request-table-details.service';
import { RequestTableDetails } from 'src/app/models/RequestTableDetails';
import { ActivatedRoute } from '@angular/router';
import { RequestTableService } from 'src/app/services/request-table.service'
import { RequestTable } from 'src/app/models/RequestTable';
import { DataService} from 'src/app/services/data.service';
import { RequestTablesDetailsHistory } from 'src/app/models/RequestTablesDetailsHistory';
import { RequestTablesHistory } from 'src/app/models/RequestTablesHistory';
import { DateTime } from 'luxon';
 
/**
 * @title Table with selection
 */
@Component({
	selector: 'open-view-table',
	styleUrls: ['./open-view-table.component.css'],
	templateUrl: './open-view-table.component.html',

})
export class OpenViewTableComponent {

	@Output() userChanged = new EventEmitter<string | undefined>();


	// Function where you obtain the user value
	/*updateUser(user: string | undefined): void {

		this.userChanged.emit(user);

	}*/

  requestUID: number | undefined;
  nt_user: string | undefined;
  user?: string;
 
 constructor(private requestTableDetailsService: RequestTableDetailsService, 
             private route: ActivatedRoute, 
             private requestTableService: RequestTableService, 
             private dataService: DataService){
              
             }
 requestData: RequestTableDetails[] = [];
 surplusTableData: Element[] = [];
 requestTableData: RequestTable[] =[];
 
 
 
 ngOnInit(): void {
  this.user = sessionStorage.getItem('username') ?? '';
 
  this.route.params.subscribe(params => {
    this.requestUID = params['requestUID'];
    this.nt_user = params['nt_user'];
    //this.dataService.username = this.nt_user;
    // Request to the database to get the information specific for surplus table
    if (this.requestUID !== undefined) {
      this.requestTableDetailsService
        .getRequestTableDetailsByRequestTableId(this.requestUID)
        .subscribe(
          (result: RequestTableDetails[]) => {
            // Handle successful result
            this.requestData = result;
           
            // Data shown in the tables
            this.requestData.forEach((request, index) => {
              this.surplusTableData.push({
                id: request.id || 0,
                position: index + 1,
                functions: request.functions || '',
                competences: request.competences || '',
                //startdate: request.startDate ? new Date(request.startDate).toLocaleDateString() : '',
                startdate: request.startDate ? new Date(request.startDate) : new Date(),
                //enddate: request.endDate ? new Date(request.endDate).toLocaleDateString() : '',
                enddate: request.endDate ? new Date(request.endDate) : new Date(),
                requestTableId: request.requestTableId || '',
                nt_user: request.nT_User || '',
                shift: request.shift || '',
                createdOn: request.createdOn ? new Date(request.createdOn) : new Date()
                
 
              });
            });
            // Set the data source for the MatTable
            this.dataSource.data = this.surplusTableData;

          },
          (error: any) => {
            // Handle errors (e.g., log or display an error message)
            console.error('Error fetching data:', error);
          }
        );
 
        this.requestTableService
        .getRequestTableByRequestUID(this.requestUID.toString())
        .subscribe(
          (result: RequestTable[]) => {
            // Handle successful result
            this.requestTableData = result;});
 
    }
  });
 
}
 
 
displayedColumns = ['position', 'function', 'competences', 'startdate', 'enddate', 'select'];
dataSource = new MatTableDataSource<Element>();
selection = new SelectionModel<Element>(true, []);
requestToUpdate : RequestTable | undefined;
 
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
}
 
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
    ? this.selection.clear()
        : this.dataSource.data.forEach(row => this.selection.select(row));
}
 
  deleteAndEditChecked(): void {
    // Get the selected rows
    const selectedRows = this.selection.selected;
    // Check if there are selected rows before making the request
 
    // Calculate the updated TotalEmployees value
    const numSelectedRows = selectedRows.length;
    const updatedTotalEmployees = this.requestData.length - numSelectedRows;
    
    if (selectedRows.length > 0) {
      // Iterate over selected rows and delete each one individually
      for (const selectedRow of selectedRows) {
        // Call the deleteSurplus method for each selected row
        const rowToPost: RequestTablesDetailsHistory = { ...selectedRow, status: 1, reporterName: this.user };
        //console.log(rowToPost);


        this.requestTableDetailsService
        .postSurplus(rowToPost)
        .subscribe((response: RequestTablesDetailsHistory[]) => 
        {
          //this.status = selectedRow.status;
        },
        (error) => {
					console.error('Error moving details to history:', error);
					//reject(error);
				}
        );

        // Call the deleteSurplus method for each selected row
      
        this.requestTableDetailsService
        .deleteSurplus(selectedRow)
        .subscribe({
          next: () => {},
          error: (error: any) => {
            console.error(`Error deleting row with ID ${selectedRow.id}:`, error);  
          }
        })

         //Metoda folosita pentru a scadea din TotalEmployees la fiecare checkbox selectat
 
          const requestToUpdate = this.requestTableData.find(item => item.requestUID === selectedRow.requestTableId);
          this.requestToUpdate = requestToUpdate;
          //console.log(requestToUpdate?.requestUID);

				const user = requestToUpdate?.nT_User;

				//console.log(this.dataService.username);

				//this.updateUser(user);

         

          if (requestToUpdate && (updatedTotalEmployees!= 0)) {
            this.requestTableService.updateSurplus(requestToUpdate, updatedTotalEmployees)
              .subscribe({
                next: (requestToUpdate: RequestTable[]) => {
                },
                error: (error: any) => {
                  console.error(`Error decreasing TotalEmployees for row with ID ${selectedRow.id}:`, error);
                }
              });
              
          }
      }
      //const requestToUpdate = this.requestTableData.find(item => item.requestUID === );
      

      if ( this.requestToUpdate && (updatedTotalEmployees == 0))
      {

        this.requestToUpdate.status = 1;
        this.requestToUpdate.reporterName = this.user;

        /*this.requestTableService.updateSurplus(this.requestToUpdate, updatedTotalEmployees)
        .subscribe({
          next: (requestToUpdate: RequestTable[]) => {
          },
          error: (error: any) => {
            console.error(`Error decreasing TotalEmployees for row with ID :`, error);
          }
        });*/

        this.requestTableService
        .postSurplus(this.requestToUpdate)
        .subscribe((response: RequestTablesHistory[]) =>
        {
          //this.status = selectedRow.status;
        },
        (error) => {
          console.error('Error adding details data:', error);
          //reject(error);
        }
        );

        this.requestTableService
        .deleteSurplus(this.requestToUpdate)
        .subscribe((response: RequestTable[]) =>
        {
          //this.status = selectedRow.status;
        },
        (error) => {
          console.error('Error deleting surplus data:', error);
          //reject(error);
        }
        );
      }
    } else {
      console.warn('No rows selected for deletion');
    }
}
}


export interface Element {
  id: number;
  functions: string;
  position: number;
  competences: string;
  startdate: Date;
  enddate: Date;
  requestTableId: string;
  nt_user: string;
  shift: string;
  createdOn: Date;
}
