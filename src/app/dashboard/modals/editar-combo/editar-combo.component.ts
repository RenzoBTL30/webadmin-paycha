import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ComboService } from 'src/app/servicios/combo.service';

@Component({
  selector: 'app-editar-combo',
  templateUrl: './editar-combo.component.html',
  styleUrls: ['./editar-combo.component.css']
})
export class EditarComboComponent implements OnInit {

  @Output() volveraListarCombos = new EventEmitter<void>();

  @ViewChild('close_modal2') close_modal2:any;

  @Input() id_comb?: number;
  @Input() desc?: string;
  @Input() prec?: string;
  
  constructor(
    private comboService: ComboService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
  }

  editarCombo() {
    this.comboService.editarCombo(
        this.id_comb!,
        this.desc!,
        this.prec!,
    ).subscribe((data) => {
        this.close_modal2.nativeElement.click();
        this.volveraListarCombos.emit();
    }); 
  }

}
