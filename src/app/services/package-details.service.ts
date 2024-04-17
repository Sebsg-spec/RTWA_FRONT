import { Injectable } from '@angular/core';
import { PackageDetails } from '../models/PackageDetails';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { PackageDetailsHistory } from '../models/PackageDetailsHistory';


@Injectable({
	providedIn: 'root'
})

export class PackageDetailsService {

	private url = "PackageDetails";

	constructor(private http: HttpClient) { }

	public getDataByPackageId(packageUID: number): Observable<PackageDetails[]> {
		return this.http.get<PackageDetails[]>(`${environment.baseApiUrl}/${this.url}/GetDataByPackageId/${packageUID}`);
	}

	public createPackageDetails(packageData: PackageDetails): Observable<PackageDetails[]> {
		return this.http.post<PackageDetails[]>(
			`${environment.baseApiUrl}/${this.url}`,
			packageData
		);
	}

	public createPackageDetailsHistory(packageData: PackageDetailsHistory): Observable<PackageDetailsHistory[]> {
		return this.http.post<PackageDetailsHistory[]>(
			`${environment.baseApiUrl}/${this.url}/CreatePackageDetailsHistory`,
			packageData
		);
	}

	public deletePackageDetails(packageData: PackageDetails): Observable<PackageDetails[]> {
		return this.http.delete<PackageDetails[]>(
			`${environment.baseApiUrl}/${this.url}/${packageData.id}`
		);
	}
}