import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdenService } from 'src/app/servicios/orden.service';

@Component({
  selector: 'app-ordenes-completadas',
  templateUrl: './ordenes-completadas.component.html',
  styleUrls: ['./ordenes-completadas.component.css']
})
export class OrdenesCompletadasComponent implements OnInit {

  ordenesCompletadas:any[]=[];

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
    this.getOrdenesCompletadas();
  }

  getOrdenesCompletadas(){
    this.isLoading = true;
    this.ordenService.getOrdenes('5').subscribe((data) => {
      this.ordenesCompletadas = data;
      this.isLoading = false;
    });
  }

  formatearFecha(fecha: string) {
    return this.datePipe.transform(fecha, 'HH:mm:ss');
  }

  detallePedido(orden:any) {
    this.orden = orden;
  }

}
