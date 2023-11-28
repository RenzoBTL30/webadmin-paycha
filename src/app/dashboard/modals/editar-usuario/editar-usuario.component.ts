import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { RolService } from 'src/app/servicios/rol.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  roles: any[] = [];
  @Output() volveraListarUsuarios = new EventEmitter<void>();

  @ViewChild('close_modal2') close_modal2:any;

  // -- No funciona recibiendo el objeto porque los name de los dos modals(agregar-usuario y editar-usuario)
  // usan el mismo atributo name="" en los inputs, y ocurre un conflicto, por tanto, es mejor enviar los atributos del objeto
  // y definir un name diferente. Por ejemplo, si el atributo es "apellidos", debe cambiarse a "ape"
  // @Input() usuarioEdit!: any;

  @Input() id_usuario?: number;
  @Input() ema?: string;
  @Input() nom?: string;
  @Input() ape?: string;
  @Input() cel?: string;
  @Input() id_r?:number;

  contra:string = '';

  rol: Rol = new Rol();

  showPassword: boolean = false;
  showRepeatedPassword = false;
  
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

  editarUsuario() {
    this.usuarioService.editarUsuario(
      this.id_usuario!,
      this.ema!,
      this.nom!,
      this.ape!,
      this.cel!,
    ).subscribe((data) => {

      console.log(this.contra);

      if (this.contra != '') {
        this.editarUsuarioContrasenia()
      }

      this.rolService.updateRolUsuario(this.id_usuario!,this.id_r!).subscribe((data) => {
        this.close_modal2.nativeElement.click();
        this.volveraListarUsuarios.emit();
      });
    });
  }

  editarUsuarioContrasenia() {
    this.usuarioService.editarUsuarioContrasenia(
      this.id_usuario!,
      this.contra!,
    ).subscribe((data) => {

    });
  }
}
