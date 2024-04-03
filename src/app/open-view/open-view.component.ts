import { Component, ViewChild, Inject} from '@angular/core';
import { OpenViewTableComponent } from './open-view-table/open-view-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestTableService } from '../services/request-table.service';
import { DataService } from '../services/data.service';
import { AlertService } from '../alert/alert.service';
 
@Component({
  selector: 'app-open-view',
  templateUrl: './open-view.component.html',
  styleUrls: ['./open-view.component.css']
})
export class OpenViewComponent {
  @ViewChild(OpenViewTableComponent) childComponent: OpenViewTableComponent | undefined;
  constructor(private route: ActivatedRoute, 
              private requestTableService: RequestTableService, 
              private dataService: DataService, 
              private alertService: AlertService, 
              private router: Router)
              {
                this.page = this.dataService.titleName;

                 
              };

  
  user: string | undefined;
  page: string | undefined;
  requestUID: string = '';
  nt_user: string = '';
  department: string = '';
  title: string = '';

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.requestUID = params['requestUID'];
        this.nt_user = params['nt_user'];
        //this.dataService.username = this.nt_user;

        this.requestTableService.getRequestTableByRequestUID(this.requestUID).subscribe(
          (requestData: any) => {
            this.department = requestData[0].department;
            this.title = `List of employees ${this.page} in department ${this.department}`;
          }
        );
      });
    }

    redirect (){
      if (this.page == 'offered'){
        this.router.navigateByUrl('/surplusPage');
      }
      else{
        this.router.navigateByUrl('/lackPage');
      }
    }

    openAlertAndDelete(): void {
      this.alertService.openAlert().then((userConfirmed: boolean) => {
  
        if (userConfirmed) {
          //this.user = this.dataService.username;
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