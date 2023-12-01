import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class OrdenesSocketService {

  private socketWebAdmin = io('http://localhost:3000/orders/status/webadmin');

  conectar() {
    this.socketWebAdmin.connect();
  }

  desconectar() {
    this.socketWebAdmin.disconnect();
  }

  notificarOrdenEnProceso(message: any) {
    this.socketWebAdmin.emit('en-proceso', message);
  }

  notificarOrdenPreparada(message: any) {
    this.socketWebAdmin.emit('preparado', message);
  }

  notificarOrdenEnCamino(message: any) {
    this.socketWebAdmin.emit('en-camino', message);
  }

  notificarOrdenCompletada(message: any) {
    this.socketWebAdmin.emit('completado', message);
  }
}
