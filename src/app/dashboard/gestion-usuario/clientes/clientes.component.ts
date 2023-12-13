import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PuntosService } from 'src/app/servicios/puntos.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  searchedString: string = '';
  usuarios: any[] = [];
  roles: any[] = [];

  isUserModalOpen: boolean = false;

  isLoading?: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private puntosService: PuntosService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsuariosCliente();
  }

  getUsuariosCliente() {
    this.isLoading = true;
    this.usuarioService.getUsuariosCliente().subscribe((data) => {
      this.usuarios = data;
      this.isLoading = false;
    });
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
          this.getUsuariosCliente();
        });
        
      }
    })
    
  }

  async actualizarPuntos(id_usuario:number) {
    const { value: puntos } = await Swal.fire({
      title: 'Puntos de descuento',
      input: 'number',
      inputLabel: 'Ingresa los puntos',
    })
    
    if (puntos) {
      
      this.puntosService.actualizarPuntos(id_usuario, puntos).subscribe(res => {
        this.toast.success('Los puntos han sido actualizados correctamente');
        this.getUsuariosCliente();
      })
      
    }
  }

}
