import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sales-by-category',
  templateUrl: './sales-by-category.component.html',
  styleUrls: ['./sales-by-category.component.css']
})
export class SalesByCategoryComponent implements OnInit {
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
        type: 'pie',
        height: 325
      },
      title: {
        text: this.translate.instant('title_piechart')
      },
      xAxis: {
        categories: [
          this.translate.instant('logistics'),
          this.translate.instant('assembly'),
          this.translate.instant('pre_assembly'),
          this.translate.instant('clean_up'),
          this.translate.instant('quality_contorl'),
        ]
      },
      yAxis: {
        title: {
          text: this.translate.instant('revenue')
        }
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              name: this.translate.instant('logistics'),
              y: 41.0,
              color: '#044342',
            },
            {
              name: this.translate.instant('assembly'),
              y: 33.8,
              color: '#7e0505',
            },
            {
              name: this.translate.instant('pre_assembly'),
              y: 6.5,
              color: '#ed9e20',
            },
            {
              name: this.translate.instant('clean_up'),
              y: 15.2,
              color: '#6920fb',
            },
            {
              name: this.translate.instant('quality_control'),
              y: 3.5,
              color: '#121212',
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
