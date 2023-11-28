import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  categorias: any[] = [];
  @Output() volveraListarProductos = new EventEmitter<void>();

  @ViewChild('close_modal') close_modal:any;
  @ViewChild('input_file') input_file:any;

  producto: Producto = new Producto();
  categoria: Categoria = new Categoria();
  file: File | undefined;

  isLoading?: boolean;
  
  constructor(
    private prodService: ProductoService,
    private catService: CategoriaService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  getFileName() {
    return this.file ? this.file.name : 'Seleccionar archivo';
  }

  onFileChanged(event: any) {
    this.file = event.target.files[0];
  }

  agregarProducto() {
    
    this.isLoading = true;

    this.prodService.agregarProducto(this.producto, this.file).subscribe((data) => {
      this.close_modal.nativeElement.click();
      this.isLoading = false;
      this.volveraListarProductos.emit();
      this.limpiar();
    });
    
    console.log(this.producto.nombre);
    console.log(this.producto.descripcion);
    console.log(this.producto.precio);
    console.log(this.file);
    console.log(this.categoria.id_categoria);
  }

  getCategorias() {
    this.catService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  limpiar() {
    this.producto.nombre = '';
    this.producto.descripcion = '';
    this.producto.precio = '';
    this.input_file.nativeElement.value = '';
    this.categoria.id_categoria = 0;
  }

}
