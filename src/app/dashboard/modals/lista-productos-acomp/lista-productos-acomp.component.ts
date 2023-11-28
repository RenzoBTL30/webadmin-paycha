import { Component, Input, OnInit } from '@angular/core';
import { AcompanamientoService } from 'src/app/servicios/acompanamiento.service';

@Component({
  selector: 'app-lista-productos-acomp',
  templateUrl: './lista-productos-acomp.component.html',
  styleUrls: ['./lista-productos-acomp.component.css']
})
export class ListaProductosAcompComponent implements OnInit {

  acomProds:any[] =[];

  constructor(
    private acompService: AcompanamientoService, 
  ) { }

  ngOnInit(): void {
    //this.getAcompProd();
  }

  getAcompProd(id_acompanamiento:number) {
    this.acompService.listarAcompProd(id_acompanamiento).subscribe((data) => {
      this.acomProds = data;
    });
  }

}
