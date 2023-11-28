import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Combo } from 'src/app/models/combo';
import { ComboService } from 'src/app/servicios/combo.service';

@Component({
  selector: 'app-agregar-combo',
  templateUrl: './agregar-combo.component.html',
  styleUrls: ['./agregar-combo.component.css']
})
export class AgregarComboComponent implements OnInit {

  @Output() volveraListarCombos = new EventEmitter<void>();

  @ViewChild('close_modal') close_modal:any;

  combo: Combo = new Combo();

  
  constructor(
    private combService: ComboService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
  }

  agregarCombo() {
    this.combService.agregarCombo(this.combo).subscribe((data) => {
      this.close_modal.nativeElement.click();
      this.volveraListarCombos.emit();
      this.limpiar();
    })
  }

  limpiar() {
    this.combo.descripcion = '';
    this.combo.precio = '';
  }

}
