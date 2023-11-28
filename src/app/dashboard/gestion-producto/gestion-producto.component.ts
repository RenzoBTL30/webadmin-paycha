import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-producto',
  templateUrl: './gestion-producto.component.html',
  styleUrls: ['./gestion-producto.component.css']
})
export class GestionProductoComponent implements OnInit {

  searchedString: string = '';
  filtroCategoria: string = '';
  filtroDisponibilidad: string = '';
  productos: any[] = [];
  

  id_producto?:number;
  nombre?:string;
  descripcion?:string;
  precio?:string;
  imagen?:string;
  id_categoria?:number;

  nom_categoria?:string;

  isLoading?: boolean;

  constructor(
    private prodService: ProductoService,
    private catService: CategoriaService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProductos();
  }

  onSwitchChange(id_producto:number, estado_dis:string) {
    this.prodService.updateEstadoDisponible(id_producto, estado_dis).subscribe((data) => {

    });
  }

  getProductos() {
    this.isLoading = true;
    this.prodService.getProductos().subscribe((data) => {
      this.productos = data;
      this.isLoading = false;
    });
  }

  getProductos2daVez($event:any){
    this.prodService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  edit(
    id_producto:number,
    nombre:string,
    descripcion:string,
    precio:string,
    imagen:string,
    id_categoria:number,
  ) {
    this.id_producto = id_producto;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
    this.id_categoria = id_categoria;
  }

  detalleProducto(
    nombre:string,
    descripcion:string,
    precio:string,
    imagen:string,
    nom_categoria:string,
  ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
    this.nom_categoria = nom_categoria;
  }

  
  deleteProducto(id_producto: number) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toast.success('Producto eliminado correctamente');
        this.prodService.deleteProducto(id_producto).subscribe((data) =>{
          this.getProductos();
        });
        
      }
    })

    
  }

}
