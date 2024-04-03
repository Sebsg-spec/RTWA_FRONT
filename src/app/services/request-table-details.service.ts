import { Injectable } from '@angular/core';
import { RequestTableDetails } from '../models/RequestTableDetails';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { RequestTablesDetailsHistory } from '../models/RequestTablesDetailsHistory';


@Injectable({
	providedIn: 'root'
})

export class RequestTableDetailsService {

	private url = "RequestTableDetails";

	constructor(private http: HttpClient) { }

	public getRequestTableDetailsByRequestTableId(requestUID: number): Observable<RequestTableDetails[]> {
		return this.http.get<RequestTableDetails[]>(`${environment.baseApiUrl}/${this.url}/GetDataByRequestTableId/${requestUID}`);
	}

	public getRequestTableDetails(): Observable<RequestTableDetails[]> {
		return this.http.get<RequestTableDetails[]>(`${environment.baseApiUrl}/${this.url}`);
	}

	public addSurplus(requestData: RequestTableDetails): Observable<RequestTableDetails[]> {
		return this.http.post<RequestTableDetails[]>(
			`${environment.baseApiUrl}/${this.url}`,
			requestData
		);
	}

	public postSurplus(requestData: RequestTablesDetailsHistory): Observable<RequestTablesDetailsHistory[]> {
		return this.http.post<RequestTablesDetailsHistory[]>(
			`${environment.baseApiUrl}/${this.url}/PostDetailsToHistory`,
			requestData
		);
	}

	public deleteSurplus(requestData: RequestTableDetails): Observable<RequestTableDetails[]> {
		return this.http.delete<RequestTableDetails[]>(
			`${environment.baseApiUrl}/${this.url}/${requestData.id}`
		);
	}
}