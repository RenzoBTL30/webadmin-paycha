import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ComboService } from 'src/app/servicios/combo.service';
import { ListaProductosComboComponent } from '../modals/lista-productos-combo/lista-productos-combo.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gestion-combo',
  templateUrl: './gestion-combo.component.html',
  styleUrls: ['./gestion-combo.component.css']
})
export class GestionComboComponent implements OnInit {

  // Referenciando al hijo para acceder a sus funciones
  @ViewChild('listaProductosComboComponent', { static: false }) listaProductosComboComponent?: ListaProductosComboComponent;

  searchedString: string = '';
  combos: any[] = [];

  id_combo?: number;
  descripcion?: string;
  precio?: string;

  id_com?: number;

  isLoading?: boolean;

  constructor(
    private comboService: ComboService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCombos();
  }

  getCombos() {
    this.isLoading = true;
    this.comboService.getCombos().subscribe((data) => {
      this.combos = data;
      this.isLoading = false;
    });
  }

  getCombos2daVez($event:any){
    this.comboService.getCombos().subscribe((data) => {
      this.combos = data;
    });
  }

  getComboProd(id_combo:number) {
    this.listaProductosComboComponent?.getComboProd(id_combo);
  }

  edit(
    id_combo: number,
    descripcion: string,
    precio: string,
  ) {
    this.id_combo = id_combo;
    this.descripcion = descripcion;
    this.precio = precio;
  }

  asignar(
    id_combo: number
  ) {
    this.id_com = id_combo;
  }

  
  deleteCombo(id_combo: number) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este combo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toast.success('Combo eliminado correctamente');
        this.comboService.deleteCombo(id_combo).subscribe((data) =>{
          this.getCombos();
        });
        
      }
    })

    
  }

}
