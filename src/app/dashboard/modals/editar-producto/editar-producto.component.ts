import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  categorias: any[] = [];
  @Output() volveraListarProductos = new EventEmitter<void>();

  @ViewChild('close_modal2') close_modal2:any;
  @ViewChild('input_file_edit') input_file_edit:any;


  @Input() id_prod?: number;
  @Input() nom?: string;
  @Input() desc?: string;
  @Input() prec?: string;
  @Input() imag?: string;
  @Input() id_cat?: number;

  fileEdit: File | undefined;

  isLoadingEdit?: boolean;
  
  constructor(
    private catService: CategoriaService,
    private prodService: ProductoService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  getEditFileName() {
    return this.fileEdit ? this.fileEdit.name : 'Seleccionar archivo';
  }

  onFileEditChanged(event: any) {
    this.fileEdit = event.target.files[0];
  }

  getCategorias() {
    this.catService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  editarProducto() {

    this.isLoadingEdit = true;

    if (this.input_file_edit.nativeElement.value == '') {

      this.prodService.editarProductoSinImagen(
        this.id_prod!,
        this.nom!,
        this.desc!,
        this.prec!,
        this.id_cat!,
      ).subscribe((data) => {
        this.close_modal2.nativeElement.click();
        this.volveraListarProductos.emit();
      });

    } else {
      
      this.prodService.editarProductoConImagen(
        this.id_prod!,
        this.nom!,
        this.desc!,
        this.prec!,
        this.id_cat!,
        this.fileEdit!,
      ).subscribe((data) => {
        this.close_modal2.nativeElement.click();
        this.isLoadingEdit = false;
        this.volveraListarProductos.emit();
        this.limpiarInputFile();
      });
      
    }
    
  }

  limpiarInputFile(){
    this.input_file_edit.nativeElement.value = '';
  }

}
