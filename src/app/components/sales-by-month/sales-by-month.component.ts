import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sales-by-month',
  templateUrl: './sales-by-month.component.html',
  styleUrls: ['./sales-by-month.component.css']
})
export class SalesByMonthComponent implements OnInit {
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
        type: 'line',
        height: 325
      },
      title: {
        text: this.translate.instant('title_month')
      },
      xAxis: {
        categories: [
          this.translate.instant('JAN'),
          this.translate.instant('FEB'),
          this.translate.instant('MAR'),
          this.translate.instant('APR'),
          this.translate.instant('MAY'),
          this.translate.instant('JUN'),
          this.translate.instant('JUL'),
          this.translate.instant('AUG'),
          this.translate.instant('SEP'),
          this.translate.instant('OCT'),
          this.translate.instant('NOV'),
          this.translate.instant('DEC')
        ]
      },
      yAxis: {
        title: {
          text: this.translate.instant('monthly_usage')
        }
      },
      series: [
        {
          name: this.translate.instant('logistics'),
          type: 'line',
          color: '#044342',
          data: [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139, 196]
        },
        {
          name: this.translate.instant('assembly'),
          type: 'line',
          color: '#7e0505',
          data: [
            47, 52, 44, 35, 58, 69, 32, 53, 71, 82, 99, 159
          ]
        },
        {
          name: this.translate.instant('pre_assembly'),
          type: 'line',
          color: '#ed9e20',
          data: [
            17, 22, 14, 25, 18, 19, 22, 43, 11, 32, 29, 59
          ]
        }
      ],
      credits: {
        enabled: false
      }
    });
  }
}
