import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {

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

  actualizarPuntos(id_usuario:number, puntos:number): Observable<any> {
    return this.http.put<any>(`${apiURL}/puntos/actualizar/${id_usuario}`, { puntos }, {headers: this.agregarAuthorizationHeader()});
  }

}
