import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Lugar } from 'src/app/models/lugar';
import { LugarService } from 'src/app/servicios/lugar.service';

@Component({
  selector: 'app-agregar-lugar',
  templateUrl: './agregar-lugar.component.html',
  styleUrls: ['./agregar-lugar.component.css']
})
export class AgregarLugarComponent implements OnInit {

  @Output() volveraListarLugares = new EventEmitter<void>();

  @ViewChild('close_modal') close_modal:any;

  lugar: Lugar = new Lugar();

  
  constructor(
    private lugarService: LugarService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
  }

  agregarLugar() {
    this.lugarService.agregarLugar(this.lugar).subscribe((data) => {
      this.close_modal.nativeElement.click();
      this.volveraListarLugares.emit();
      this.limpiar();
    })
  }

  limpiar() {
    this.lugar.lugar = '';
    this.lugar.comision = '';
  }

}
