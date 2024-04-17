import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PackageService } from '../../services/package.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LogInService } from '../../services/LogInService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  username: string = "";
  goodusername: string = "";
  canAcces: string = "";
  loading: boolean = true;



  loginObj: any = {
    Email: '',
    FirstName: '',
    Account_Id: '',
    Result: false,
    Message: ''

  }
  constructor(private router: Router, private loginService: LogInService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUserData();

  }

  loadUserData() {
    this.loginService.getUser().subscribe(response => {
      this.username = response;

      var parts = this.username.split("\\");

      this.goodusername = parts[1];

      this.loginObj.Account_Id = this.goodusername;

      sessionStorage.setItem('username', this.goodusername);

      this.loading = false;
      this.onLogIn();
    });
  }

  onLogIn() {
    this.http.post(`${environment.baseApiUrl}/LogIn/`, this.loginObj)
      .subscribe((respons: any) => {
        if (respons.result) {
          this.canAcces = "true";
          sessionStorage.setItem('canAcces', this.canAcces)
          this.router.navigateByUrl('surplusPage')

        } else {
          this.canAcces = "false"
          sessionStorage.setItem('canAcces', this.canAcces)


        }
      })
  }
}
