import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdenService } from 'src/app/servicios/orden.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenes-en-proceso',
  templateUrl: './ordenes-en-proceso.component.html',
  styleUrls: ['./ordenes-en-proceso.component.css']
})
export class OrdenesEnProcesoComponent implements OnInit {

  ordenesEnProceso:any[]=[];

  searchedString: string = '';
  searchedString2: string = '';
  orden:any = {};
  isLoading?: boolean;


  constructor(
    private ordenService: OrdenService,
    private datePipe: DatePipe,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getOrdenesEnProceso();
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
        this.getOrdenesEnProceso;
      })
    }
  }

  detallePedido(orden:any) {
    this.orden = orden;
  }

}
