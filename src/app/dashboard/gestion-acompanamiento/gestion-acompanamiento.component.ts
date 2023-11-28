import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AcompanamientoService } from 'src/app/servicios/acompanamiento.service';
import { ListaProductosAcompComponent } from '../modals/lista-productos-acomp/lista-productos-acomp.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-acompanamiento',
  templateUrl: './gestion-acompanamiento.component.html',
  styleUrls: ['./gestion-acompanamiento.component.css']
})
export class GestionAcompanamientoComponent implements OnInit {

  // Referenciando al hijo para acceder a sus funciones
  @ViewChild('listaProductosAcompComponent', { static: false }) listaProductosAcompComponent?: ListaProductosAcompComponent;

  searchedString: string = '';
  acompanamientos: any[] = [];

  id_acompanamiento?: number;
  
  id_acompa?: number;

  nombre?: string;
  precio?: string;
  id_tipo_acompanamiento?: number;

  isLoading?: boolean;

  constructor(
    private acompService: AcompanamientoService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAcomps();
  }

  getAcomps() {
    this.isLoading = true;
    this.acompService.getAcomps().subscribe((data) => {
      this.acompanamientos = data;
      this.isLoading = false;
    });
  }

  getAcomps2daVez($event:any){
    this.acompService.getAcomps().subscribe((data) => {
      this.acompanamientos = data;
    });
  }

  getAcompProd(id_acompanamiento:number) {
    //Utilizando la funcion getAcompProd del hijo y enviando el parametro id_acompanamiento
    //se utilizo esta forma porque la 2da forma con Output y EventEmitter genera null
    this.listaProductosAcompComponent?.getAcompProd(id_acompanamiento);
  }

  edit(
    id_acompanamiento: number,
    nombre: string,
    precio: string,
    id_tipo_acompanamiento: number
  ) {
    this.id_acompanamiento = id_acompanamiento;
    this.nombre = nombre;
    this.precio = precio;
    this.id_tipo_acompanamiento = id_tipo_acompanamiento;
  }


  asignar(
    id_acompanamiento: number
  ) {
    this.id_acompa = id_acompanamiento;
  }
  
  deleteAcomp(id_acompanamiento: number) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este acompañamiento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toast.success('Acompañamiento eliminado correctamente');
        this.acompService.deleteAcomp(id_acompanamiento).subscribe((data) =>{
          this.getAcomps();
        });
        
      }
    })

    
  }

}
