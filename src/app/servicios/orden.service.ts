import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from './global';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private httpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  private agregarAuthorizationHeader(){
    let token = sessionStorage.getItem('token') ?? '';
    if(token!=null){
      return this.httpHeaders.append('Authorization',token);
    }
    return this.httpHeaders;
  }

  constructor(private http: HttpClient) {}

  getOrdenes(estado:string): Observable<any> {
    return this.http.get<any>(`${apiURL}/orden/buscar/porestado/${estado}`, {headers: this.agregarAuthorizationHeader()});
  }
  getOrdenesAndDate(estado:string,page:number,size:number, dates:any): Observable<any> {
    const params={
      page: page ?? 0,
      size: size ?? 10,
      fechaInicio: dates ? dates[0] : null,
      fechaFin: dates ? dates[1] : null
    }
    if(dates){
       params.fechaInicio=moment(dates[0]).format('YYYY-MM-DD')
       params.fechaFin=moment(dates[1]).format('YYYY-MM-DD')
    }
    return this.http.get<any>(`${apiURL}/orden/buscar/porestado/fecha/${estado}`, {headers: this.agregarAuthorizationHeader(), params:params});
  }
  getOrdenesCocina(estado:string): Observable<any> {
    return this.http.get<any>(`${apiURL}/orden/buscar/porestadococina/${estado}`, {headers: this.agregarAuthorizationHeader()});
  }

  updateEstado(id_orden:number, estado:string): Observable<any> {
    return this.http.put<any>(`${apiURL}/orden/update/estado/${id_orden}`, { estado }, {headers: this.agregarAuthorizationHeader()});
  }

  insertTiempoEntrega(id_orden:number, tiempo_entrega:string): Observable<any> {
    return this.http.put<any>(`${apiURL}/orden/inserttiempo/${id_orden}`, { tiempo_entrega }, {headers: this.agregarAuthorizationHeader()});
  }

  //Cancelar pedido u orden
  cancelarOrden(id_orden:number): Observable<any> {
    return this.http.put<any>(`${apiURL}/orden/cancelarorden/${id_orden}`,{},{headers: this.agregarAuthorizationHeader()});
  }
}
