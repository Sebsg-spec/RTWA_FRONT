import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoleRequestComponent } from '../components/role-request/role-request.component';
import { RequestRole } from '../models/RoleRequest';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = "Account";
  constructor(private dialog: MatDialog, private http: HttpClient) { }
  openAlert(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const dialogRef = this.dialog.open(RoleRequestComponent, {});

      dialogRef.afterClosed().subscribe((userConfirmed: boolean) => {
        resolve(userConfirmed);
      });
    });
  }

  public GetRoleRequest(account_id: number | null): Observable<any> {

    return this.http.get<Request>(`${environment.baseApiUrl}/${this.url}/roleRequest?accountId=${account_id}`);
  }

  public GetRolesRequests(): Observable<any> {

    return this.http.get<Request>(`${environment.baseApiUrl}/${this.url}/rolesRequested`)
  }

  public CreateRoleRequest(request: RequestRole): Observable<any> {

    return this.http.post<Request>( `${environment.baseApiUrl}/${this.url}/roleRequest`, request );
  }

  public updateRoleRequest(id: number, requestData: any): Observable<any> {
    return this.http.put<any>(`${environment.baseApiUrl}/${this.url}/updateRelations/${id}`, requestData);
  }


  public deleteRoleRequest(id: number): Observable<any> {
    
    return this.http.delete<any>(`${environment.baseApiUrl}/${this.url}/roleDelete/${id}`);
  }

}
