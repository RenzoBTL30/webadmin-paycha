import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cronometro } from 'src/app/models/cronometro';
import { OrdenService } from 'src/app/servicios/orden.service';
import { OrdenesSocketService } from 'src/app/servicios/ordenes-socket.service';

@Component({
  selector: 'app-ordenes-cocina',
  templateUrl: './ordenes-cocina.component.html',
  styleUrls: ['./ordenes-cocina.component.css']
})
export class OrdenesCocinaComponent implements OnInit, OnDestroy {

  ordenesCocina: any[] = [];
  ordenesCocinaForTimers: any[] = [];

  notification: string = '';

  constructor(
    private ordenService: OrdenService,
    private ordenesSocket: OrdenesSocketService,
    private datePipe: DatePipe,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getOrdenesEnProceso();
    this.getOrdenesEnProcesoForTimers();
    this.ordenesSocket.conectar();

    this.ordenesSocket.recibirOrdenEnProceso().subscribe(response => {
      this.getOrdenesEnProceso();
      this.startTimer(response.id_orden);
    });

  }
  
  ngOnDestroy(): void {
    this.ordenesSocket.desconectar();
  }


  formatearFecha(fecha: string) {
    return this.datePipe.transform(fecha, 'HH:mm:ss');
  }

  updateEstado(id_orden:number) {

    this.ordenService.updateEstado(id_orden,'3').subscribe((data) =>{
      this.toast.success('Correcto');

      this.notification = 'Tu pedido ha sido actualizado a Preparado';
      this.ordenesSocket.notificarOrdenPreparada(this.notification);
      this.stopTimer(id_orden);
      this.getOrdenesEnProceso();
    })
  }

  getOrdenesEnProceso() {
    this.ordenService.getOrdenesCocina('2').subscribe((data) => {
      this.ordenesCocina = data;
    });
  }

  getOrdenesEnProcesoForTimers() {
    this.ordenService.getOrdenesCocina('2').subscribe((data) => {
      this.ordenesCocinaForTimers = data;

      // Verificar y reanudar los temporizadores después de obtener las órdenes
      this.ordenesCocinaForTimers.forEach(orden => {
        const cronometroData = localStorage.getItem(`crono_orden_${orden.id_orden}`);
        if (cronometroData) {
          const cronometro = JSON.parse(cronometroData);
          if (cronometro.isRunning) {
            this.reanudarTimer(orden.id_orden);
          }
        }
      });
    });
  }

  startTimer(id_orden:number) {
    //let o const
    let cronometro:Cronometro = new Cronometro();
    cronometro.isRunning = true;
    cronometro.intervalId = setInterval(() => {
      cronometro.timer++;
      this.saveTimerState(cronometro, id_orden);
    }, 1000);
  }

  
  reanudarTimer(id_orden: number) {
    let cronometroData = localStorage.getItem(`crono_orden_${id_orden}`);
    let cronometro = cronometroData ? JSON.parse(cronometroData) : null;
  
    if (cronometro && cronometro.isRunning) {
      cronometro.intervalId = setInterval(() => {
        cronometro.timer++;
        this.saveTimerState(cronometro, id_orden);
      }, 1000);
    }
  }
  
  saveTimerState(cronometro:Cronometro, id_orden:number) {
    localStorage.setItem(`crono_orden_${id_orden}`, JSON.stringify({
      intervalId: cronometro.intervalId,
      timer: cronometro.timer,
      isRunning: cronometro.isRunning
    }));
  }

  stopTimer(id_orden:number) {
    let cronometroData = localStorage.getItem(`crono_orden_${id_orden}`);
    let cronometro = cronometroData ? JSON.parse(cronometroData) : null;

    if (cronometro && cronometro.intervalId) {
      clearInterval(cronometro.intervalId);
      cronometro.intervalId = null;
    }

    localStorage.removeItem(`crono_orden_${id_orden}`);
  }

  mostrarTiempoTranscurrido(id_orden: number): string {
    const cronometroData = localStorage.getItem(`crono_orden_${id_orden}`);
    const cronometro = cronometroData ? JSON.parse(cronometroData) : null;
  
    if (cronometro) {
      return this.formatTime(cronometro.timer);
    } else {
      return '00:00:00';
    }
  }
  
  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }
  
  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  
  isTimerRunning(id_orden: number): boolean {
    const cronometroData = localStorage.getItem(`crono_orden_${id_orden}`);
    const cronometro = cronometroData ? JSON.parse(cronometroData) : null;
  
    return cronometro && cronometro.isRunning;
  }

  getTimerColorClass(id_orden: number): any {
    let cronometroData = localStorage.getItem(`crono_orden_${id_orden}`);
    let cronometro = cronometroData ? JSON.parse(cronometroData) : null;

    if (cronometro) {
      if (cronometro.timer < 60) {
        return 'timer-green';
      } else if (cronometro.timer < 90) {
        return 'timer-yellow';
      } else if (cronometro.timer < 180) {
        return 'timer-orange';
      } else {
        return 'timer-red';
      }
    }

    
  }
}
