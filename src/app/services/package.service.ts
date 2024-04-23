import { Injectable } from '@angular/core';
import { Package } from '../models/Package';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { PackageHistory } from '../models/PackageHistory';


@Injectable({
	providedIn: 'root'
})
export class PackageService {
	private url = "Package";
	constructor(private http: HttpClient) { }
	public getData(): Observable<Package[]> {
		return this.http.get<Package[]>(`${environment.baseApiUrl}/${this.url}/GetData`);
	}

	public getDataByDate(startDate: string): Observable<Package[]> {
		return this.http.get<Package[]>(`${environment.baseApiUrl}/${this.url}/GetDataByDate/${startDate}`);
	}

	public getDataByType(type: number): Observable<Package[]> {
		return this.http.get<Package[]>(`${environment.baseApiUrl}/${this.url}/GetDataByType/${type}`);
	}

	public getDataByPackageUID(packageUID: string): Observable<Package[]> {
		return this.http.get<Package[]>(`${environment.baseApiUrl}/${this.url}/GetDataByPackageUID/${packageUID}`);
	}

	public getDataByLatestAndUser(nt_user?: string): Observable<Package[]> {
		return this.http.get<Package[]>(`${environment.baseApiUrl}/${this.url}/GetDataByLatestAndUser/${nt_user}`);
	}

	public createPackage(packageData: Package): Observable<Package[]> {
		return this.http.post<Package[]>(
			`${environment.baseApiUrl}/${this.url}`,
			packageData
		);
	}

	public createPackageHistory(packageData: PackageHistory): Observable<PackageHistory[]> {
		return this.http.post<PackageHistory[]>(
			`${environment.baseApiUrl}/${this.url}/CreatePackageHistory`,
			packageData
		);
	}

	public editTotalEmployeesInPackage(packageData: Package, acceptedEmployees: number): Observable<Package[]> {
		return this.http.put<Package[]>(
			`${environment.baseApiUrl}/${this.url}/EditTotalEmployeesInPackage/${acceptedEmployees}`,
			packageData
		);
	}

	public deletePackage(packageData: Package): Observable<Package[]> {
		return this.http.delete<Package[]>(
			`${environment.baseApiUrl}/${this.url}/${packageData.packageUID}`
		);
	}
}
