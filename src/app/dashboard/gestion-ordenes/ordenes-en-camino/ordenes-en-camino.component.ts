import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdenService } from 'src/app/servicios/orden.service';

@Component({
  selector: 'app-ordenes-en-camino',
  templateUrl: './ordenes-en-camino.component.html',
  styleUrls: ['./ordenes-en-camino.component.css']
})
export class OrdenesEnCaminoComponent implements OnInit {

  ordenesEnCamino:any[]=[];

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
    this.getOrdenesEnCamino();
  }

  getOrdenesEnCamino(){
    this.isLoading = true;
    this.ordenService.getOrdenes('4').subscribe((data) => {
      this.ordenesEnCamino = data;
      this.isLoading = false;
    });
  }

  formatearFecha(fecha: string) {
    return this.datePipe.transform(fecha, 'hh:mm:ss aaaa')?.toLowerCase();
  }

  detallePedido(orden:any) {
    this.orden = orden;
  }

}
