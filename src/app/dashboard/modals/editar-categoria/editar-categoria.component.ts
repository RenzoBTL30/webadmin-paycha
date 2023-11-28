import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  @Output() volveraListarCategorias = new EventEmitter<void>();

  @ViewChild('close_modal2') close_modal2:any;

  @Input() id_categoria?: number;
  @Input() nom?: string;

  
  constructor(
    private catService: CategoriaService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  editarCategoria() {
    this.catService.editarCategoria(this.id_categoria!,this.nom!).subscribe((data) => {
      this.close_modal2.nativeElement.click();
      this.volveraListarCategorias.emit();
    });
  }

}
