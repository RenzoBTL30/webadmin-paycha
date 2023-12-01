import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdenService } from 'src/app/servicios/orden.service';
import { OrdenesSocketService } from 'src/app/servicios/ordenes-socket.service';

@Component({
  selector: 'app-ordenes-cocina',
  templateUrl: './ordenes-cocina.component.html',
  styleUrls: ['./ordenes-cocina.component.css']
})
export class OrdenesCocinaComponent implements OnInit, OnDestroy {

  ordenesCocina: any[] = [];
  notification: string = '';

  constructor(
    private ordenService: OrdenService,
    private ordenesSocket: OrdenesSocketService,
    private datePipe: DatePipe,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getOrdenesEnProceso();
    this.ordenesSocket.conectar();
  }

  ngOnDestroy(): void {
    this.ordenesSocket.desconectar();
  }

  formatearFecha(fecha: string) {
    return this.datePipe.transform(fecha, 'HH:mm:ss');
  }

  updateEstado(id_orden:number) {
    this.ordenService.updateEstado(id_orden,'3').subscribe((data) =>{
      this.toast.success('Correcto');

      this.notification = 'Tu pedido ha sido actualizado a En proceso';
      this.ordenesSocket.notificarOrdenEnProceso(this.notification);
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
