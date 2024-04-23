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

export class HomeComponent  {
  isSideBarClosed: boolean = false;
  sendData: Element[] = [];
  
  constructor() { }




}
