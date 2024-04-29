import { Component } from '@angular/core';
import {
  faLocation,
  faShop,
  faBoxes,
  faMoneyBill,
  faHandshake,
  faClipboardList,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css']
})
export class TopWidgetsComponent {
  faShop = faShop;
  faClipboard = faClipboardCheck ; 
  faHandShake = faHandshake
  faMoneyBill = faMoneyBill;

  constructor() { }

  ngOnInit(): void {
  }

}
