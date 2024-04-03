import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControll } from '../models/FormControll';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class FormcontrollsService {
	private url = "Form";
	constructor(private http: HttpClient) { }

	getRequestFormByType(Type: string): Observable<FormControll[]> {
		return this.http.get<FormControll[]>(`${environment.baseApiUrl}/${this.url}?Type=${Type}`);
	}
}
