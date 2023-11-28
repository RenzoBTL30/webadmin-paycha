import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css']
})
export class AgregarCategoriaComponent implements OnInit {

  @Output() volveraListarCategorias = new EventEmitter<void>();

  @ViewChild('close_modal') close_modal:any;
  @ViewChild('repeatcontrasenia') repeatcontrasenia:any;

  categoria: Categoria = new Categoria();

  
  constructor(
    private catService: CategoriaService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
  }

  agregarCategoria() {
    this.catService.agregarCategoria(this.categoria).subscribe((data) => {
      this.close_modal.nativeElement.click();
      this.volveraListarCategorias.emit();
      this.limpiar();
    })
  }

  limpiar() {
    this.categoria.nombre = '';
  }

}
