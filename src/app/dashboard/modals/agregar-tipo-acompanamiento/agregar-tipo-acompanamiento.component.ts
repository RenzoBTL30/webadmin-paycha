import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TipoAcompanamiento } from 'src/app/models/tipo_acompanamiento';
import { TipoAcompanamientoService } from 'src/app/servicios/tipo-acompanamiento.service';

@Component({
  selector: 'app-agregar-tipo-acompanamiento',
  templateUrl: './agregar-tipo-acompanamiento.component.html',
  styleUrls: ['./agregar-tipo-acompanamiento.component.css']
})
export class AgregarTipoAcompanamientoComponent implements OnInit {

  @Output() volveraListarTipoAcomps = new EventEmitter<void>();

  @ViewChild('close_modal') close_modal:any;

  tipoAcomp: TipoAcompanamiento = new TipoAcompanamiento();
  
  constructor(
    private tipoAcompService: TipoAcompanamientoService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
  }

  agregarTipoAcomp() {

    this.tipoAcompService.agregarTipoAcomp(this.tipoAcomp).subscribe((data) => {
      this.close_modal.nativeElement.click();
      this.volveraListarTipoAcomps.emit();
      this.limpiar();
    });
    
  }

  limpiar() {
    this.tipoAcomp.tipo = '';
    this.tipoAcomp.tipo_seleccion = '';
    this.tipoAcomp.limite_opciones = undefined;
  }

}
