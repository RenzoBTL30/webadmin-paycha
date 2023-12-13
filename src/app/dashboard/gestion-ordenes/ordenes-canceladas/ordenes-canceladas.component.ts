import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdenService } from 'src/app/servicios/orden.service';

@Component({
  selector: 'app-ordenes-canceladas',
  templateUrl: './ordenes-canceladas.component.html',
  styleUrls: ['./ordenes-canceladas.component.css']
})
export class OrdenesCanceladasComponent implements OnInit {

  ordenesCanceladas:any[]=[];

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
    this.getOrdenesCanceladas();
  }

  getOrdenesCanceladas(){
    this.isLoading = true;
    this.ordenService.getOrdenes('6').subscribe((data) => {
      this.ordenesCanceladas = data;
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
