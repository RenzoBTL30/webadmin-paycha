import { Component, OnInit } from '@angular/core';
import { ComboService } from 'src/app/servicios/combo.service';

@Component({
  selector: 'app-lista-productos-combo',
  templateUrl: './lista-productos-combo.component.html',
  styleUrls: ['./lista-productos-combo.component.css']
})
export class ListaProductosComboComponent implements OnInit {

  comboProds:any[] =[];

  constructor(
    private comboService: ComboService, 
  ) { }

  ngOnInit(): void {
    //this.getComboProd();
  }

  getComboProd(id_combo:number) {
    this.comboService.listarComboProd(id_combo).subscribe((data) => {
      this.comboProds = data;
      console.log(this.comboProds);
    });
  }

}
