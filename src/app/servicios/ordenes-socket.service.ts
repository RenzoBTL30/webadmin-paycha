import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { apiURLSocket } from './global';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdenesSocketService {

  private socketWebAdmin = io(`${apiURLSocket}/orders/status/webadmin`);

  conectar() {
    this.socketWebAdmin.connect();
  }

  desconectar() {
    this.socketWebAdmin.disconnect();
  }

  notificarOrdenEnProceso(message: string) {
    this.socketWebAdmin.emit('en-proceso', message);
  }

  notificarOrdenPreparada(message: string) {
    this.socketWebAdmin.emit('preparado', message);
  }

  notificarOrdenEnCamino(message: string) {
    this.socketWebAdmin.emit('en-camino', message);
  }

  notificarOrdenCompletada(message: string) {
    this.socketWebAdmin.emit('completado', message);
  }

  notificarOrdenCancelada(message: string) {
    this.socketWebAdmin.emit('cancelado', message);
  }

  // Para Cocina
  notificarNuevaOrdenEnProceso(message: string, id_orden: number) {
    this.socketWebAdmin.emit('nueva-orden-en-proceso', message, id_orden);
  }

  notificarActualizacionTiempoEntrega(message: string) {
    this.socketWebAdmin.emit('tiempo-entrega', message);
  }

  recibirOrdenPendiente() {
    return new Observable<any>((observer) => {
      this.socketWebAdmin.on('listar-orden', (message:string) => {
        observer.next(message);
      });
    });
  }

  recibirOrdenEnProceso() {
    return new Observable<any>((observer) => {
      this.socketWebAdmin.on('listar-orden-en-proceso', (message:string, id_orden:number) => {
        observer.next({message, id_orden});
      });
    });
  }

  recibirOrdenCancelada() {
    return new Observable<any>((observer) => {
      this.socketWebAdmin.on('listar-orden', (message:string) => {
        observer.next(message);
      });
    });
  }
  
}
