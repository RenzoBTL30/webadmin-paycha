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
  mappedAcomps:any[]=[];
  fechaActual:Date = new Date();

  notification: string = '';
  notification2: string = '';

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

    /*
    17/12/2023 01:00pm ---> fecha en la que se hizo el pedido

    04:00pm ---> fecha actual

    3 horas ---> resta entre la fecha_pedido - fecha_actual
    el timer debe comenzar a partir de esas tres horas osea debe comenzar en 180:00

    06:00pm

    5 horas
    */

    this.ordenesSocket.recibirOrdenEnProceso().subscribe(response => {
      this.getOrdenesEnProceso();
      this.startTimer(response.id_orden);
      const time_orden = new Date(response.fecha_orden);
      
    });

  }
  
  ngOnDestroy(): void {
    this.ordenesSocket.desconectar();
  }


  formatearFecha(fecha: string) {
    return this.datePipe.transform(fecha, 'hh:mm:ss aaaa')?.toLowerCase();
  }

  updateEstado(id_orden:number) {

    this.ordenService.updateEstado(id_orden,'3').subscribe((data) =>{
      this.toast.success('Correcto');

      this.notification = 'Tu pedido ha sido actualizado a Preparado';
      this.ordenesSocket.notificarOrdenPreparada(this.notification);

      this.notification2 = 'Un pedido ha sido actualizado a Preparado';
      this.ordenesSocket.notificarNuevaOrdenPreparada(this.notification2);

      this.stopTimer(id_orden);
      this.getOrdenesEnProceso();
    })
  }

  getOrdenesEnProceso() {
    this.ordenService.getOrdenesCocina('2').subscribe((data) => {
      this.ordenesCocina = data;
      console.log(this.ordenesCocina);
    });
  }

  getOrdenesEnProcesoForTimers() {
    let keys = Object.keys(sessionStorage);
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
        } else {
          this.startTimer(orden.id_orden);
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

  startAllTimer(id_orden:number) {
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

  getTimerColorClass(id_orden: number): any {
    let cronometroData = localStorage.getItem(`crono_orden_${id_orden}`);
    let cronometro = cronometroData ? JSON.parse(cronometroData) : null;

    if (cronometro) {
      if (cronometro.timer < 480) { //7 minutos
        return 'timer-green';
      } else if (cronometro.timer < 1080) { //17 minutos
        return 'timer-yellow';
      } else if (cronometro.timer < 180) { //26 minutos
        return 'timer-orange';
      } else {
        return 'timer-red';
      }
    }

    
  }
  
  categorizarPorTipoAcomps(acomps:any[]) {

    this.mappedAcomps = acomps.reduce((acc, curr) => {
    const existingItem = acc.find((item: { tipo: any; }) => item.tipo === curr.tipo);
    
      if (existingItem) {
        existingItem.acompanamientos.push({
          id_acompanamiento: curr.id_acompanamiento,
          acompanamiento: curr.acompanamiento,
          precio: curr.precio,
          tipo: curr.tipo
        });
      } else {
        acc.push({
          tipo: curr.tipo,
          acompanamientos: [{
            id_acompanamiento: curr.id_acompanamiento,
            acompanamiento: curr.acompanamiento,
            precio: curr.precio,
            tipo: curr.tipo,
          }]
        });
      }
    
      return acc;
    }, []);

    return this.mappedAcomps;
  }

  // Método para construir la cadena de acompañamientos
  cadenAcomps(acompanamientos:any[]) {
    return acompanamientos.map(acomp => acomp.acompanamiento).join(', ');
  }

  // Método para construir la cadena de acompañamientos
  cadenCombos(combos:any[]) {
    return combos.map(c => c.combo).join(', ');
  }
}
