import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-last-few-trans',
  templateUrl: './last-few-trans.component.html',
  styleUrls: ['./last-few-trans.component.css']
})


export class LastFewTransComponent implements OnInit {
  transactions = [
    {
      id: 1,
      title: "Demand",
      shop: "Pre-Assembly",
      location: "East Hartford",
      status: "pending",
    },
    {
      id: 2,
      title: "Demand",
      shop: "Logistics",
      location: "Miamisburg",
      status: "confirmed",
    },
    {
      id: 3,
      title: "Offer",
      shop: "Assembly",
      location: "Phoenix",
      status: "confirmed",
    }
  ];

  ngOnInit(): void {
  }
}
