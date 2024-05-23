import { Component, ViewChild } from '@angular/core';
import { OpenViewTableComponent } from './open-view-table/open-view-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../services/package.service';
import { DataService } from '../services/data.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-open-view',
  templateUrl: './open-view.component.html',
  styleUrls: ['./open-view.component.css']
})
export class OpenViewComponent {
  @ViewChild(OpenViewTableComponent) childComponent: OpenViewTableComponent | undefined;
  constructor(private route: ActivatedRoute,
    private packageService: PackageService,
    private dataService: DataService,
    private alertService: AlertService,
    private router: Router) {

  };

  isSideBarClosed: boolean = false;

  user: string | undefined;
  page: string | null = sessionStorage.getItem("pageType")
  packageUID: string = '';
  nt_user: string = '';
  department: string = '';
  title: string = '';

  ngOnInit(): void {

    //Getting the packageUID and user from the params array
    this.route.params.subscribe(params => {
      this.packageUID = params['packageUID'];
      this.nt_user = params['nt_user'];
      
      //Getting the department for the opened package
      this.packageService.getDataByPackageUID(this.packageUID).subscribe(
        (packageData: any) => {
          if (sessionStorage.getItem("pageType") === "landing"){
            if(packageData[0].type === 1){
              this.page = "demand"
            }else if(packageData[0].type === 2){
              this.page = "offered"
            }
          }
          this.department = packageData[0].department;
          this.title = `list of employees ${this.page} in department`;
        }
      );
    });
  }

  //Function to check if the current page is offer/demand and redirect accordingly
  redirect() {
    if (sessionStorage.getItem("pageType") == 'offered') {
      this.router.navigateByUrl('/offer');
    }
    else if (sessionStorage.getItem("pageType") == 'demand'){
      this.router.navigateByUrl('/demand');
    }
     else if (sessionStorage.getItem("pageType") == 'landing'){
      this.router.navigateByUrl('/home')
    }
  }

  openAlertAndDelete(): void {
    this.alertService.openAlert().then((userConfirmed: boolean) => {

      if (userConfirmed) {

        return this.deleteAndEdit();

      } else {

        return Promise.resolve();
      }
    }).then(() => {

    });
  }

  deleteAndEdit(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.childComponent) {
        this.childComponent.deleteAndEditChecked();

        this.redirect();
      }
    });
  }


}