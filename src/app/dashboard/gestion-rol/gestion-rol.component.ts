import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RolService } from 'src/app/servicios/rol.service';

@Component({
  selector: 'app-gestion-rol',
  templateUrl: './gestion-rol.component.html',
  styleUrls: ['./gestion-rol.component.css']
})
export class GestionRolComponent implements OnInit {

  searchedString: string = '';
  roles: any[] = [];

  id_rol?: number;
  nombre?: string;

  isLoading?: boolean;

  constructor(
    private rolService: RolService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.isLoading = true;
    this.rolService.getRoles().subscribe((data) => {
      this.roles = data;
      this.isLoading = false;
    });
  }

  getRoles2daVez($event:any){
    this.rolService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  edit(
    id_rol: number,
    nombre: string,
  ) {
    this.id_rol = id_rol;
    this.nombre = nombre;
  }

}
