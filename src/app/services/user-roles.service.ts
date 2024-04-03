import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserRolesService {

	private apiUrl = environment.baseApiUrl;

	constructor(private http: HttpClient) { }

	// Match account_id with its role in the db and return an array of roles
	// In the components, access the first item in the userRoles array to get user's role
	getUserRoles(accountId: string): Observable<string[]> {
		return this.http.get<string[]>(`${this.apiUrl}/account/userRoles?accountId=${accountId}`);
	}
}
