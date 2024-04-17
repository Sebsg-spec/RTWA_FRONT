import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControls } from '../models/FormControls';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class FormControlsService {
	private url = "Form";
	constructor(private http: HttpClient) { }

	getRequestFormByType(Type: string): Observable<FormControls[]> {
		return this.http.get<FormControls[]>(`${environment.baseApiUrl}/${this.url}?Type=${Type}`);
	}
}
