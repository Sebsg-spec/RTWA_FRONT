import { Component } from '@angular/core';
import { LogInService } from './services/LogInService';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {


  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('ro');

    this.translateService.use(localStorage.getItem('lang') || 'ro')
  }
  title = 'RTWA';

}
