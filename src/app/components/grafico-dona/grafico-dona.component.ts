import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input('ChartData') doughnutChartData: number[] = [];
  @Input('ChartLabels') doughnutChartLabels: string[] = [];
  @Input('ChartType') doughnutChartType: string = '';
  @Input('ChartLegend:') lineChartLegend: string = '';
}
