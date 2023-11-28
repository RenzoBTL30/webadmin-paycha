import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AcompanamientoService } from 'src/app/servicios/acompanamiento.service';
import { TipoAcompanamientoService } from 'src/app/servicios/tipo-acompanamiento.service';

@Component({
  selector: 'app-editar-acompanamiento',
  templateUrl: './editar-acompanamiento.component.html',
  styleUrls: ['./editar-acompanamiento.component.css']
})
export class EditarAcompanamientoComponent implements OnInit {

  tipoAcomps: any[] = [];
  @Output() volveraListarAcomps = new EventEmitter<void>();

  @ViewChild('close_modal2') close_modal2:any;

  @Input() id_acomp?: number;
  @Input() nom?: string;
  @Input() prec?: string;
  @Input() id_tipacomp?: number;

  fileEdit: File | undefined;

  isLoadingEdit?: boolean;
  
  constructor(
    private tipoAcompService: TipoAcompanamientoService,
    private acompService: AcompanamientoService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTipoAcomps();
  }

  getTipoAcomps() {
    this.tipoAcompService.getTipoAcomp().subscribe((data) => {
      this.tipoAcomps = data;
    });
  }

  editarAcomp() {
    this.acompService.editarAcomp(
        this.id_acomp!,
        this.nom!,
        this.prec!,
        this.id_tipacomp!
    ).subscribe((data) => {
        this.close_modal2.nativeElement.click();
        this.volveraListarAcomps.emit();
    }); 
  }

}
