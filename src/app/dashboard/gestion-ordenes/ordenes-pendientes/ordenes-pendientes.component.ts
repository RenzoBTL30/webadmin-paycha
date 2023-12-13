import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdenService } from 'src/app/servicios/orden.service';
import { OrdenesSocketService } from 'src/app/servicios/ordenes-socket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenes-pendientes',
  templateUrl: './ordenes-pendientes.component.html',
  styleUrls: ['./ordenes-pendientes.component.css']
})
export class OrdenesPendientesComponent implements OnInit, OnDestroy {

  searchedString: string = '';
  searchedString2: string = '';
  ordenesPendientes: any[] = [];
  orden: any = {};
  notification: string = '';
  notification2: string = '';
  notification3: string = '';
  notificationForCocina: string = '';

  isLoading?: boolean;


  constructor(
    private ordenService: OrdenService,
    private ordenesSocket: OrdenesSocketService,
    private datePipe: DatePipe,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getOrdenesPendientes();
    this.ordenesSocket.conectar();

    this.ordenesSocket.recibirOrdenPendiente().subscribe(response => {
      this.getOrdenesPendientes();
    });

    this.ordenesSocket.recibirOrdenCancelada().subscribe(response => {
      this.getOrdenesPendientes();
    })
  }

  ngOnDestroy(): void {
    this.ordenesSocket.desconectar();
  }

  getOrdenesPendientes(){
    this.isLoading = true;
    this.ordenService.getOrdenes('1').subscribe((data) => {
      this.ordenesPendientes = data;
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

        this.notification2 = 'El tiempo de entrega de un pedido se ha actualizado';
        this.ordenesSocket.notificarActualizacionTiempoEntrega(this.notification2);
        this.getOrdenesPendientes();
      })
    }
  }

  updateEstado(id_orden:number){

    Swal.fire({
      title: '¿Estás seguro que deseas actualizar el estado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordenService.updateEstado(id_orden, '2').subscribe(res => {
          this.toast.success('Estado actualizado')

          this.notification = 'Tu pedido ha sido actualizado a En proceso';
          this.ordenesSocket.notificarOrdenEnProceso(this.notification);

          this.notificationForCocina = 'Un nuevo pedido ha ingresado';
          this.ordenesSocket.notificarNuevaOrdenEnProceso(this.notificationForCocina, id_orden);
          this.getOrdenesPendientes();
        })
        
      }
    })
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

          this.notification3 = 'Tu pedido ha sido cancelado';
          this.ordenesSocket.notificarOrdenCancelada(this.notification3);

          this.getOrdenesPendientes();
        });        
      }
    })    
  }

  detallePedido(orden:any) {
    this.orden = orden;
  }
}
