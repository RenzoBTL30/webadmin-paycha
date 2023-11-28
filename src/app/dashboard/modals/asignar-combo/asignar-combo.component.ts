import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ComboService } from 'src/app/servicios/combo.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-combo',
  templateUrl: './asignar-combo.component.html',
  styleUrls: ['./asignar-combo.component.css']
})
export class AsignarComboComponent implements OnInit {

  productos:any[] = [];
  productosFiltrados:any[] = [];
  categorias:any[] = [];

  idProductos:any[]=[];

  @ViewChild('close_modal_3') close_modal:any;
  @ViewChild('valor_cat') valor_cat:any;

  @Output() volveraListarAcomps = new EventEmitter<void>();

  tipoAcompanamientos:any[] = [];

  id_producto?: number;

  @Input() id_comb?:number;
  @Input() desc?:string;

  constructor(
    private comboService: ComboService, 
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


  asignarCombo() {
    let idProductos = this.productosFiltrados.map(p => p.id_producto);

    Swal.fire({
      title: '¿Estás seguro que deseas asignar este combo a los productos de la categoria?',
      text: 'No podrás cambiar esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Asignar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toast.success('Combo asignado correctamente');
        this.comboService.asignarComboProd(idProductos, this.id_comb!).subscribe((data) => {
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
