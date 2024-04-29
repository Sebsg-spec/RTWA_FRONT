import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-sales-by-category',
  templateUrl: './sales-by-category.component.html',
  styleUrls: ['./sales-by-category.component.css']
})
export class SalesByCategoryComponent {
  chart = new Chart({
    chart: {
      type: 'pie',
      height: 325
    },
    title: {
      text: 'Department wise transactions'
    },
    xAxis: {
      categories: [
        'Logistict',
        'Asembly',
        'Cosmetics',
        'Clothes',
        'Appliances',
      ]
    },
    yAxis: {
      title: {
        text: 'Revenue in %'
      }
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            name: 'Logistics',
            y: 41.0,
            color: '#044342',
          },
          {
            name: 'Assembly',
            y: 33.8,
            color: '#7e0505',
          },
          {
            name: 'Clean-Up',
            y: 6.5,
            color: '#ed9e20',
          },
          {
            name: 'Pre-Assembly',
            y: 15.2,
            color: '#6920fb',
          },
          {
            name: 'Quality Control',
            y: 3.5,
            color: '#121212',
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
