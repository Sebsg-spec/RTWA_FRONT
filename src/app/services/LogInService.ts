import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})


export class LogInService {
	constructor(private http: HttpClient) { }

	getUser(): Observable<any> {
		return this.http.get('https://localhost:7254/user', { withCredentials: true, responseType: "text" });
	}
}


