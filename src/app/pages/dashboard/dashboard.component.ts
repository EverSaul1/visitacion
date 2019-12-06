import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { VisitationService } from '../../services/visitation.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  meses: any[] = [];
  total: any[] = [];
  mes: string = '';
  chart2 = {
    data :{
      labels: this.meses,
      datasets: [{
          label: 'Visitas en los ultimos 12 meses',
          data: this.total,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }
    ]
    },
    options:{
      barValueSpacing: 1,
      scales: {
          yAxes: [{
            ticks: {
                fontColor: 'rgba(0,0,0,.6)',
                fontStyle: 'bold',
                beginAtZero: true,
                maxTicksLimit: 8,
                padding: 10
            }          
        }],
        xAxes: [{
          barPercentage: 0.4      
      }]       
      },
      responsive: true,
      legend: {          
        position:'bottom',
        display:false
      },
    }
  };


  constructor(
    private _visitationService: VisitationService
  ) { }
  ngOnInit() { 
    this.cargarReporte();
    new Chart('chart-bar',  {
          type: 'bar',
          data: this.chart2.data ,
          options: this.chart2.options
    });
  }

  cargarReporte() {
    this._visitationService.cargarReporte().subscribe((resp:any) => {
      resp.map((resp) => {
        switch (parseInt(resp._id.mes)) {
          case 1:
            this.mes = 'Enero';
            break;
          case 2:
            this.mes = 'Febrero';
            break;
          case 3:
            this.mes = 'Marzo';
            break;
          case 4:
            this.mes = 'Abril';
            break;
          case 5:
            this.mes = 'Mayo';
            break;
          case 6:
            this.mes = 'Junio';
            break;
          case 7:
            this.mes = 'Julio';
            break;
          case 8:
            this.mes = 'Agosto';
            break;
          case 9:
            this.mes = 'Setiembre';
            break;
          case 10:
            this.mes = 'Octubre';
            break;
          case 11:
            this.mes = 'Noviembre';
            break;
          case 12:
            this.mes = 'Diciembre';
            break;
          default:
              this.mes = 'Error'
        }
        this.meses.push(this.mes+ ' '+ '-' + ' '+resp._id.year);
        this.total.push(resp.numero)
      });
    });
  }

}
