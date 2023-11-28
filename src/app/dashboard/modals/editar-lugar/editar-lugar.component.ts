import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LugarService } from 'src/app/servicios/lugar.service';

@Component({
  selector: 'app-editar-lugar',
  templateUrl: './editar-lugar.component.html',
  styleUrls: ['./editar-lugar.component.css']
})
export class EditarLugarComponent implements OnInit {

  @Output() volveraListarLugares = new EventEmitter<void>();

  @ViewChild('close_modal2') close_modal2:any;

  @Input() id_lugar?: number;
  @Input() lug?: string;
  @Input() com?: string;

  
  constructor(
    private lugarService: LugarService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  editarLugar() {
    this.lugarService.editarLugar(this.id_lugar!,this.lug!,this.com!).subscribe((data) => {
      this.close_modal2.nativeElement.click();
      this.volveraListarLugares.emit();
    });
  }

}
