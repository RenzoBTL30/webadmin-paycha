import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/servicios/rol.service';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.css']
})
export class AgregarRolComponent implements OnInit {

  @Output() volveraListarRoles = new EventEmitter<void>();

  @ViewChild('close_modal') close_modal:any;

  rol: Rol = new Rol();
  
  constructor(
    private rolService: RolService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
  }

  agregarRol() {
    this.rolService.crearRol(this.rol).subscribe((data) => {
      this.close_modal.nativeElement.click();
      this.volveraListarRoles.emit();
      this.limpiar();
    })
  }

  limpiar() {
    this.rol.nombre = '';
  }

}
