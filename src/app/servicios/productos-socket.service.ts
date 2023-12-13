import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { apiURLSocket } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosSocketService {

  private socketWebAdmin = io(`${apiURLSocket}/products/webadmin`);

  conectar() {
    this.socketWebAdmin.connect();
  }

  desconectar() {
    this.socketWebAdmin.disconnect();
  }

  notificarDisponibilidadProducto(message: string) {
    this.socketWebAdmin.emit('disponible', message);
  }
}
