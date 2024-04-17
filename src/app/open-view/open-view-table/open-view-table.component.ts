import { Component, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PackageDetailsService } from 'src/app/services/package-details.service';
import { PackageDetails } from 'src/app/models/PackageDetails';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from 'src/app/services/package.service'
import { Package } from 'src/app/models/Package';
import { PackageDetailsHistory } from 'src/app/models/PackageDetailsHistory';
import { PackageHistory } from 'src/app/models/PackageHistory';


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

  packageData: PackageDetails[] = [];
  packageTableData: Element[] = [];
  requestTableData: Package[] = [];
  dataSource = new MatTableDataSource<Element>();
  selection = new SelectionModel<Element>(true, []);
  requestToUpdate: Package | undefined;

  displayedColumns = ['position', 'function', 'competences', 'startdate', 'enddate', 'select'];
  packageUID: number | undefined;
  nt_user: string | undefined;
  user?: string;

  constructor(private packageDetailsService: PackageDetailsService,
    private route: ActivatedRoute,
    private packageService: PackageService) {

  }


  ngOnInit(): void {
    //Getting the current user
    this.user = sessionStorage.getItem('name') ?? '';

    //Getting the packageUID and user from the params array
    this.route.params.subscribe(params => {
      this.packageUID = params['packageUID'];
      this.nt_user = params['nt_user'];
      
console.log(this.packageUID)
      // Request to the database to get the information specific for opened package table
      if (this.packageUID !== undefined) {

        //Getting all the data with the specific packageUID from the packageDetailsTable
        this.packageDetailsService
          .getDataByPackageId(this.packageUID)
          .subscribe(
            (result: PackageDetails[]) => {
              this.packageData = result;

              // Data shown in the tables
              this.packageData.forEach((request, index) => {
                this.packageTableData.push({
                  id: request.id || 0,
                  position: index + 1,
                  functions: request.functions || '',
                  competences: request.competences || '',
                  startdate: request.startDate ? new Date(request.startDate) : new Date(),
                  enddate: request.endDate ? new Date(request.endDate) : new Date(),
                  packageId: request.packageId || '',
                  nt_user: request.nT_User || '',
                  shift: request.shift || '',
                  createdOn: request.createdOn ? new Date(request.createdOn) : new Date()
                });
              });
              // Set the data source for the MatTable
              this.dataSource.data = this.packageTableData;

            },
            (error: any) => {
              console.error('Error fetching data:', error);
            }
          );

        //Function for getting the updated package from the packageTable
        this.packageService
          .getDataByPackageUID(this.packageUID.toString())
          .subscribe(
            (result: Package[]) => {
              this.requestTableData = result;
            });
      }
    });

  }

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
    const updatedTotalEmployees = this.packageData.length - numSelectedRows;

    if (selectedRows.length > 0) {
      // Iterate over selected rows and delete each one individually
      for (const selectedRow of selectedRows) {
        // Call the deletePackage method for each selected row
        const rowToPost: PackageDetailsHistory = { ...selectedRow, status: 1, reporterName: this.user };



        this.packageDetailsService
          .createPackageDetailsHistory(rowToPost)
          .subscribe((response: PackageDetailsHistory[]) => { },
            (error) => {
              console.error('Error moving details to history:', error);
            }
          );

        // Call the deletePackage method for each selected row
        this.packageDetailsService
          .deletePackageDetails(selectedRow)
          .subscribe({
            next: () => { },
            error: (error: any) => {
              console.error(`Error deleting row with ID ${selectedRow.id}:`, error);
            }
          })

        //Finding the package from which the employees were accepted
        const requestToUpdate = this.requestTableData.find(item => item.packageUID === selectedRow.packageId);
        this.requestToUpdate = requestToUpdate
        const user = requestToUpdate?.nT_User;
        //Method used for substracting the TotalEmployees at every selected checkbox
        if (requestToUpdate && (updatedTotalEmployees != 0)) {
          this.packageService.editTotalEmployeesInPackage(requestToUpdate, updatedTotalEmployees)
            .subscribe({
              next: (requestToUpdate: Package[]) => {
              },
              error: (error: any) => {
                console.error(`Error decreasing TotalEmployees for row with ID ${selectedRow.id}:`, error);
              }
            });

        }
      }
      //const requestToUpdate = this.requestTableData.find(item => item.packageUID === );


      if (this.requestToUpdate && (updatedTotalEmployees == 0)) {

        this.requestToUpdate.status = 1;
        this.requestToUpdate.reporterName = this.user;

        //Function to move the package to the packageHistoryTable if all employees inside were accepted
        this.packageService
          .createPackageHistory(this.requestToUpdate)
          .subscribe((response: PackageHistory[]) => {
          },
            (error) => {
              console.error('Error adding details data:', error);
            }
          );

        //Function to delete the package from the packageTable if all employees inside were accepted
        this.packageService
          .deletePackage(this.requestToUpdate)
          .subscribe((response: Package[]) => {
          },
            (error) => {
              console.error('Error deleting surplus data:', error);
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
  packageId: string;
  nt_user: string;
  shift: string;
  createdOn: Date;
}
