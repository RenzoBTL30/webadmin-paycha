import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { RolService } from 'src/app/servicios/rol.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Rol } from 'src/app/models/rol';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css'],
})
export class AgregarUsuarioComponent implements OnInit {

  roles: any[] = [];
  @Output() volveraListarUsuarios = new EventEmitter<void>();

  @ViewChild('close_modal') close_modal:any;
  @ViewChild('repeatcontrasenia') repeatcontrasenia:any;

  usuario: Usuario = new Usuario();
  rol: Rol = new Rol();

  showPassword: boolean = false;
  showRepeatedPassword: boolean = false;
  
  constructor(
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRolesTrabajador();
  }

  getRolesTrabajador() {
    this.rolService.getRolesTrabajador().subscribe((data) => {
      this.roles = data;
    });
  }

  agregarUsuario() {
    this.usuarioService.agregarUsuario(this.usuario).subscribe((data) => {
      this.rolService.asignarRol(data.id_usuario,this.rol.id_rol!).subscribe((data) => {
        this.close_modal.nativeElement.click();
        this.volveraListarUsuarios.emit();
        this.limpiar();
      })
    })
  }

  limpiar() {
    this.usuario.nombre = '';
    this.usuario.apellidos = '';
    this.usuario.email = '';
    this.usuario.celular = '';
    this.usuario.contrasenia = '';
    this.repeatcontrasenia.nativeElement.value = '';
    this.rol.id_rol = 0;
  }
}
