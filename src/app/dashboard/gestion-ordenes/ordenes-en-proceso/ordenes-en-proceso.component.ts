import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdenService } from 'src/app/servicios/orden.service';
import { OrdenesSocketService } from 'src/app/servicios/ordenes-socket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenes-en-proceso',
  templateUrl: './ordenes-en-proceso.component.html',
  styleUrls: ['./ordenes-en-proceso.component.css']
})
export class OrdenesEnProcesoComponent implements OnInit, OnDestroy {

  ordenesEnProceso:any[]=[];

  searchedString: string = '';
  searchedString2: string = '';
  orden:any = {};
  notification: string = '';
  notification2: string = '';
  isLoading?: boolean;


  constructor(
    private ordenService: OrdenService,
    private ordenesSocket: OrdenesSocketService,
    private datePipe: DatePipe,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getOrdenesEnProceso();
    this.ordenesSocket.conectar();

    this.ordenesSocket.recibirOrdenCancelada().subscribe(response => {
      this.getOrdenesEnProceso();
    });
  }

  ngOnDestroy(): void {
    this.ordenesSocket.desconectar();
  }

  getOrdenesEnProceso(){
    this.isLoading = true;
    this.ordenService.getOrdenes('2').subscribe((data) => {
      this.ordenesEnProceso = data;
      this.isLoading = false;
    });
  }

  formatearFecha(fecha: string) {
    return this.datePipe.transform(fecha, 'HH:mm:ss');
  }

  async updateTiempoEntrega(id_orden:number) {
    const { value: tiempo_entrega } = await Swal.fire({
      title: 'Tiempo estimado de entrega',
      input: 'text',
      inputLabel: 'Ingresa el tiempo de entrega',
    })
    
    if (tiempo_entrega) {
      this.ordenService.insertTiempoEntrega(id_orden, tiempo_entrega).subscribe(res => {
        this.toast.success('El tiempo se inserto correctamente');

        this.notification = 'El tiempo de entrega de un pedido se ha actualizado';
        this.ordenesSocket.notificarActualizacionTiempoEntrega(this.notification);
        this.getOrdenesEnProceso();
      })
    }
  }

  cancelarOrden(id_orden:number) {
    Swal.fire({
      title: '¿Estás seguro que deseas cancelar el pedido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordenService.cancelarOrden(id_orden).subscribe(response => {
          this.toast.success('El pedido ha sido cancelado');

          this.notification2 = 'Tu pedido ha sido cancelado';
          this.ordenesSocket.notificarOrdenCancelada(this.notification2);

          this.getOrdenesEnProceso();
        });        
      }
    })    
  }

  detallePedido(orden:any) {
    this.orden = orden;
  }

}
