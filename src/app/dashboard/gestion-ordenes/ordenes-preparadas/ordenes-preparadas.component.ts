import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdenService } from 'src/app/servicios/orden.service';

@Component({
  selector: 'app-ordenes-preparadas',
  templateUrl: './ordenes-preparadas.component.html',
  styleUrls: ['./ordenes-preparadas.component.css']
})
export class OrdenesPreparadasComponent implements OnInit {

  ordenesPreparadas:any[]=[];

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
    this.getOrdenesPreparadas();
  }

  getOrdenesPreparadas(){
    this.isLoading = true;
    this.ordenService.getOrdenes('3').subscribe((data) => {
      this.ordenesPreparadas = data;
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
