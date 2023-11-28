import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Acompanamiento } from 'src/app/models/acompanamiento';
import { TipoAcompanamiento } from 'src/app/models/tipo_acompanamiento';
import { AcompanamientoService } from 'src/app/servicios/acompanamiento.service';
import { TipoAcompanamientoService } from 'src/app/servicios/tipo-acompanamiento.service';

@Component({
  selector: 'app-agregar-acompanamiento',
  templateUrl: './agregar-acompanamiento.component.html',
  styleUrls: ['./agregar-acompanamiento.component.css']
})
export class AgregarAcompanamientoComponent implements OnInit {

  tipoAcomps: any[] = [];
  @Output() volveraListarAcomps = new EventEmitter<void>();

  @ViewChild('close_modal') close_modal:any;

  acomp: Acompanamiento = new Acompanamiento();
  tipoAcomp: TipoAcompanamiento = new TipoAcompanamiento();

  isLoading?: boolean;
  
  constructor(
    private acompService: AcompanamientoService,
    private tipoAcompService: TipoAcompanamientoService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTipoAcomps();
  }

  agregarAcomp() {
    
    this.isLoading = true;

    this.acompService.agregarAcomp(this.acomp).subscribe((data) => {
      this.close_modal.nativeElement.click();
      this.isLoading = false;
      this.volveraListarAcomps.emit();
      this.limpiar();
    });

  }

  getTipoAcomps() {
    this.tipoAcompService.getTipoAcomp().subscribe((data) => {
      this.tipoAcomps = data;
    });
  }

  limpiar() {
    this.acomp.nombre = '';
    this.acomp.precio = '';
    this.tipoAcomp.id_tipo_acompanamiento = 0;
  }


}
