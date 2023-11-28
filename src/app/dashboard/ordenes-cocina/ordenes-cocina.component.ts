import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdenService } from 'src/app/servicios/orden.service';

@Component({
  selector: 'app-ordenes-cocina',
  templateUrl: './ordenes-cocina.component.html',
  styleUrls: ['./ordenes-cocina.component.css']
})
export class OrdenesCocinaComponent implements OnInit {

  ordenesCocina: any[] = [];

  constructor(
    private ordenService: OrdenService,
    private datePipe: DatePipe,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getOrdenesEnProceso();
  }

  formatearFecha(fecha: string) {
    return this.datePipe.transform(fecha, 'HH:mm:ss');
  }

  updateEstado(id_orden:number) {
    this.ordenService.updateEstado(id_orden,'3').subscribe((data) =>{
      this.toast.success('Correcto');
      this.getOrdenesEnProceso();
    })
  }

  getOrdenesEnProceso() {
    this.ordenService.getOrdenesCocina('2').subscribe((data) => {
      this.ordenesCocina = data;
      console.log(this.ordenesCocina);
    });

  }


}
