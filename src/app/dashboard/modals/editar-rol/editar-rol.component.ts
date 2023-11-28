import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RolService } from 'src/app/servicios/rol.service';

@Component({
  selector: 'app-editar-rol',
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.css']
})
export class EditarRolComponent implements OnInit {

  @Output() volveraListarRoles = new EventEmitter<void>();

  @ViewChild('close_modal2') close_modal2:any;

  @Input() id_rol?: number;
  @Input() nom?: string;

  
  constructor(
    private rolService: RolService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  editarRol() {
    this.rolService.updateRol(this.id_rol!,this.nom!).subscribe((data) => {
      this.close_modal2.nativeElement.click();
      this.volveraListarRoles.emit();
    });
  }

}
