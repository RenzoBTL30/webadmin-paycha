import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
}

interface Accompaniment {
  id: number;
  name: string;
}

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
