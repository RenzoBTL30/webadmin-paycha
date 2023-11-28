import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  searchedString: string = '';
  usuarios: any[] = [];
  roles: any[] = [];

  id_usuario?: number;
  email?: string;
  nombre?: string;
  apellidos?: string;
  celular?: string;
  id_rol?: number;


  isUserModalOpen: boolean = false;

  isLoading?: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsuariosTrabajador();
  }

  getUsuariosTrabajador() {
    this.isLoading = true;
    this.usuarioService.getUsuariosTrabajador().subscribe((data) => {
      this.usuarios = data;
      this.isLoading = false;
    });
  }

  getUsuariosTrabajador2daVez($event:any){
    this.usuarioService.getUsuariosTrabajador().subscribe((data) => {
      this.usuarios = data;
    });
  }

  edit(
    id_usuario: number,
    email: string,
    nombre: string,
    apellidos: string,
    celular: string,
    id_rol: number,
  ) {
    this.id_usuario = id_usuario;
    this.email = email;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.celular = celular;
    this.id_rol = id_rol;
  }

  
  deleteUsuario(id_usuario: number) {

    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toast.success('Usuario eliminado correctamente');
        this.usuarioService.deleteUsuario(id_usuario).subscribe((data) =>{
          this.getUsuariosTrabajador();
        });
        
      }
    })

    
  }

}
