import { Injectable } from '@angular/core';
import { RequestTable } from '../models/RequestTable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { LogIn } from '../models/LogIn';
import { RequestTablesHistory } from '../models/RequestTablesHistory';


@Injectable({
	providedIn: 'root'
})
export class RequestTableService {
	private url = "RequestTable";
	constructor(private http: HttpClient) { }

	public getRequestTableByType(type: number): Observable<RequestTable[]> {
		return this.http.get<RequestTable[]>(`${environment.baseApiUrl}/${this.url}/GetDataByType/${type}`);
	}

	public getRequestTable(): Observable<RequestTable[]> {
		return this.http.get<RequestTable[]>(`${environment.baseApiUrl}/${this.url}`);
	}

	public getRequestTableByRequestUID(requestUID: string): Observable<RequestTable[]> {
		return this.http.get<RequestTable[]>(`${environment.baseApiUrl}/${this.url}/GetDataByRequestUID/${requestUID}`);
	}

	public getRequestTableByLatestandUser(nt_user?: string): Observable<RequestTable[]> {
		return this.http.get<RequestTable[]>(`${environment.baseApiUrl}/${this.url}/GetDataByLatestandUser/${nt_user}`);
	}

	public addSurplus(requestData: RequestTable): Observable<RequestTable[]> {
		return this.http.post<RequestTable[]>(
			`${environment.baseApiUrl}/${this.url}`,
			requestData
		);
	}

	public postSurplus(requestData: RequestTablesHistory): Observable<RequestTablesHistory[]> {
		return this.http.post<RequestTablesHistory[]>(
			`${environment.baseApiUrl}/${this.url}/PostSurplusToHistory`,
			requestData
		);
	}

	public updateSurplus(requestData: RequestTable, acceptedEmployees: number): Observable<RequestTable[]> {
		return this.http.put<RequestTable[]>(
			`${environment.baseApiUrl}/${this.url}/EditTotalEmployeesInRequestTable/${acceptedEmployees}`,
			requestData
		);
	}

	public deleteSurplus(requestData: RequestTable): Observable<RequestTable[]> {
		return this.http.delete<RequestTable[]>(
			`${environment.baseApiUrl}/${this.url}/${requestData.requestUID}`
		);
	}








}
