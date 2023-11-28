import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-categoria',
  templateUrl: './gestion-categoria.component.html',
  styleUrls: ['./gestion-categoria.component.css']
})
export class GestionCategoriaComponent implements OnInit {

  searchedString: string = '';
  categorias: any[] = [];

  id_categoria?: number;
  nombre?: string;

  isLoading?: boolean;

  constructor(
    private catService: CategoriaService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.isLoading = true;
    this.catService.getCategorias().subscribe((data) => {
      this.categorias = data;
      this.isLoading = false;
    });
  }

  getCategorias2daVez($event:any){
    this.catService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  edit(
    id_categoria: number,
    nombre: string,
  ) {
    this.id_categoria = id_categoria;
    this.nombre = nombre;
  }

  
  deleteCategoria(id_categoria: number) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta categoría?',
      text: "ADVERTENCIA: Recuerda que debes eliminar todos los productos de la categoría antes de eliminarla",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toast.success('Categoría eliminada correctamente');
        this.catService.deleteCategoria(id_categoria).subscribe((data) =>{
          this.getCategorias();
        });
        
      }
    })

    
  }

}
