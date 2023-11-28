import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {

  @Input() orden?: any;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  formatearFecha(fecha: string) {
    return this.datePipe.transform(fecha, 'dd-MM-yyyy HH:mm:ss');
  }

}
