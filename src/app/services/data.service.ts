import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public tableType: number | undefined ;

  public formName!: string ; 

  public titleName: string | undefined;
  
  public alertResponse: boolean | undefined;

  public username: string | undefined;

  public buttonType : string | undefined;

  public pageType: string | undefined;

}
