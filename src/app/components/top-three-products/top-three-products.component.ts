import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-three-products',
  templateUrl: './top-three-products.component.html',
  styleUrls: ['./top-three-products.component.css']
})
export class TopThreeProductsComponent implements OnInit {
  chart!: Chart;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.createChart();
    this.translate.onLangChange.subscribe(() => {
      this.createChart();
    });
  }

  createChart() {
    this.chart = new Chart({
      chart: {
        type: 'bar',
        height: 225
      },
      title: {
        text: this.translate.instant('TITLE')
      },
      xAxis: {
        categories: [
          this.translate.instant('logistics'),
          this.translate.instant('assembly'),
          this.translate.instant('pre_assembly'),
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
              name: this.translate.instant('logistics'),
              y: 41,
              color: '#044342',
            },
            {
              name: this.translate.instant('assembly'),
              y: 33,
              color: '#7e0505',
            },
            {
              name: this.translate.instant('pre_assembly'),
              y: 15,
              color: '#ed9e20',
            },
          ]
        }
      ],
      credits: {
        enabled: false
      }
    });
  }
}
