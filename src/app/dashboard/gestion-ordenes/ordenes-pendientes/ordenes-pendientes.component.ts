import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdenService } from 'src/app/servicios/orden.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenes-pendientes',
  templateUrl: './ordenes-pendientes.component.html',
  styleUrls: ['./ordenes-pendientes.component.css']
})
export class OrdenesPendientesComponent implements OnInit {

  searchedString: string = '';
  searchedString2: string = '';
  ordenesPendientes: any[] = [];
  orden:any = {};
  isLoading?: boolean;


  constructor(
    private ordenService: OrdenService,
    private datePipe: DatePipe,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getOrdenesPendientes();
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
          this.getOrdenesPendientes();
        })
        
      }
    })
  }

  detallePedido(orden:any) {
    this.orden = orden;
  }

}
