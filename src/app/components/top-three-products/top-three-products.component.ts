import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-top-three-products',
  templateUrl: './top-three-products.component.html',
  styleUrls: ['./top-three-products.component.css']
})
export class TopThreeProductsComponent {

  chart = new Chart({
    chart: {
      type: 'bar',
      height: 225
    },
    title: {
      text: 'Top 3 departments ussage'
    },
    xAxis: {
      categories: [
        'Logistics',
        'Assembly',
        'Pre-Assembly',
      ]
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    series: [
      {
        type: 'bar',
        showInLegend: false,
        data: [
          {
            name: 'Logistics',
            y: 41,
            color: '#044342',
          },
          {
            name: 'Assembly',
            y: 33,
            color: '#7e0505',
          },
          {
            name: 'Pre-Assembly',
            y: 15,
            color: '#ed9e20',
          },
        ]
      }
    ],
    credits: {
      enabled: false
    }
  })

  constructor() { }

  ngOnInit(): void {
  }

}
