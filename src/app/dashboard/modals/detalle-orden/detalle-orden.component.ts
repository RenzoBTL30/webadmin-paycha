import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {

  @Input() orden?: any;
  mappedAcomps:any[]=[];
  nota_adicional?:string;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  formatearFecha(fecha: string) {
    return this.datePipe.transform(fecha, 'dd MMM YYYY - hh:mm:ss aaaa')?.toLowerCase();
  }

  categorizarPorTipoAcomps(acomps:any[]) {

    this.mappedAcomps = acomps.reduce((acc, curr) => {
    const existingItem = acc.find((item: { tipo: any; }) => item.tipo === curr.tipo);
    
      if (existingItem) {
        existingItem.acompanamientos.push({
          id_acompanamiento: curr.id_acompanamiento,
          acompanamiento: curr.acompanamiento,
          precio: curr.precio,
          tipo: curr.tipo
        });
      } else {
        acc.push({
          tipo: curr.tipo,
          acompanamientos: [{
            id_acompanamiento: curr.id_acompanamiento,
            acompanamiento: curr.acompanamiento,
            precio: curr.precio,
            tipo: curr.tipo,
          }]
        });
      }
    
      return acc;
    }, []);

    return this.mappedAcomps;
  }

  calcularNuevoPrecioProducto(precio_producto:any, acomps:any[], combos:any[]) {
    let nuevoPrecio = precio_producto;

    if (acomps) {
      acomps.forEach(e => {
        nuevoPrecio = nuevoPrecio + e.precio
      });
    }

    if (combos) {
      combos.forEach(e => {
        nuevoPrecio = nuevoPrecio + e.precio
      });
    }
    
    return nuevoPrecio;
  }

  verNotaAdicional(nota_adicional:string) {
    this.nota_adicional = nota_adicional;
  }
}
