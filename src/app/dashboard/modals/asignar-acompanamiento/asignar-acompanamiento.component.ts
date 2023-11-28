import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Acompanamiento } from 'src/app/models/acompanamiento';
import { AcompanamientoService } from 'src/app/servicios/acompanamiento.service';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TipoAcompanamientoService } from 'src/app/servicios/tipo-acompanamiento.service';
import Swal from 'sweetalert2';

interface Accompaniment {
  name: string;
  selected: boolean;
}

interface Product {
  name: string;
  accompaniments: Accompaniment[];
}


@Component({
  selector: 'app-asignar-acompanamiento',
  templateUrl: './asignar-acompanamiento.component.html',
  styleUrls: ['./asignar-acompanamiento.component.css']
})
export class AsignarAcompanamientoComponent implements OnInit {

  productos:any[] = [];
  productosFiltrados:any[] = [];
  categorias:any[] = [];

  idProductos:any[]=[];

  @ViewChild('close_modal_3') close_modal:any;
  @ViewChild('valor_cat') valor_cat:any;

  @Output() volveraListarAcomps = new EventEmitter<void>();

  tipoAcompanamientos:any[] = [];
  acomps:any[]=[];
  acompsFiltrados:any[] = [];

  id_producto?: number;

  @Input() id_acomp?:number;
  @Input() nom?:string;

  constructor(
    private acompService: AcompanamientoService, 
    private prodService: ProductoService,
    private catService: CategoriaService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCategorias();
    //this.getTiposAcomps();
  }

  
  onCategoriaSelected($event: any) {
    this.getProductosFilterCategoria($event.target.value);
  }
  

  // Con esto, se ahorra en hacer una consulta en la BD para filtrar por Id con WHERE
  getProductosFilterCategoria(id_categoria:number) {
    this.prodService.getProductos().subscribe((data) => {
      this.productos = data;
      this.productosFiltrados = this.productos.filter(e => e.id_categoria == id_categoria);
    })
  }

  getCategorias() {
    this.catService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  /*
  onTipoAcompSelected($event: any) {
    this.getAcompsFilterTipoAcomp($event.target.value);
  }

  getTiposAcomps() {
    this.tipoAcompService.getTipoAcomp().subscribe((data) => {
      this.tipoAcompanamientos = data;
    });
  }

  getAcompsFilterTipoAcomp(id_tipo_acompanamiento:number) {
    this.acompService.getAcomps().subscribe((data) => {
      this.acomps = data;
      this.acompsFiltrados = this.acomps.filter(e => e.id_tipo_acompanamiento == id_tipo_acompanamiento);
    });
  }
  */


  asignarAcomp() {
    let idProductos = this.productosFiltrados.map(p => p.id_producto);

    Swal.fire({
      title: '¿Estás seguro que deseas asignar este acompañamiento a los productos de la categoria?',
      text: 'No podrás cambiar esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Asignar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toast.success('Acompañamiento asignado correctamente');
        this.acompService.asignarAcompProd(idProductos, this.id_acomp!).subscribe((data) => {
          this.close_modal.nativeElement.click();
          this.volveraListarAcomps.emit();
          this.limpiar();
        })
        
      }
    })

    
  }

  limpiar() {
    this.valor_cat.nativeElement.value = 0;
  }

  /*
  onCheckboxChange(event: any): void {
    console.log('Nuevo valor del checkbox:', this.id_producto);
    // Aquí puedes realizar cualquier acción que necesites con el valor del checkbox.
  }
  */

}
