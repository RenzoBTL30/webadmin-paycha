import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from './global';
import { TipoAcompanamiento } from '../models/tipo_acompanamiento';

@Injectable({
  providedIn: 'root'
})
export class TipoAcompanamientoService {

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

  getTipoAcomp(): Observable<any> {
    return this.http.get<any>(`${apiURL}/tipoacompanamiento/listar`);
  }

  agregarTipoAcomp(tipoAcompanamiento: TipoAcompanamiento): Observable<any> {
    return this.http.post<any>(`${apiURL}/tipoacompanamiento/crear`, tipoAcompanamiento, {headers: this.agregarAuthorizationHeader()});
  }

  editarTipoAcomp(id_tipo_acompanamiento:number, tipo:string, tipo_seleccion:string, limite_opciones:number): Observable<any> {
    return this.http.put<any>(`${apiURL}/tipoacompanamiento/actualizar/${id_tipo_acompanamiento}`, 
    { tipo:tipo,
      tipo_seleccion: tipo_seleccion,
      limite_opciones: limite_opciones
    }, 
    {headers: this.agregarAuthorizationHeader()});
  }

  deleteTipoAcomp(id_tipo_acompanamiento:number): Observable<any> {
    return this.http.delete<any>(`${apiURL}/tipoacompanamiento/delete/${id_tipo_acompanamiento}`, {headers: this.agregarAuthorizationHeader()});
  }
}
