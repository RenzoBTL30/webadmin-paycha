import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from './global';
import { Acompanamiento } from '../models/acompanamiento';

@Injectable({
  providedIn: 'root'
})
export class AcompanamientoService {

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

  getAcomps(): Observable<any> {
    return this.http.get<any>(`${apiURL}/acompanamiento/listar`);
  }

  agregarAcomp(acompanamiento: Acompanamiento): Observable<any> {
    return this.http.post<any>(`${apiURL}/acompanamiento/crear`, acompanamiento, {headers: this.agregarAuthorizationHeader()});
  }

  editarAcomp(id_acompanamiento:number, nombre:string, precio:string, id_tipo_acompanamiento:number): Observable<any> {
    return this.http.put<any>(`${apiURL}/acompanamiento/actualizar/${id_acompanamiento}`, 
    { nombre, precio, id_tipo_acompanamiento}, 
    {headers: this.agregarAuthorizationHeader()});
  }

  deleteAcomp(id_acompanamiento:number): Observable<any> {
    return this.http.put<any>(`${apiURL}/acompanamiento/delete/${id_acompanamiento}`, {headers: this.agregarAuthorizationHeader()});
  }

  asignarAcompProd(id_productos:any[], id_acompanamiento:number): Observable<any> {
    return this.http.post<any>(`${apiURL}/acompanamiento/crear/prodacomp`,{ id_productos, id_acompanamiento }, {headers: this.agregarAuthorizationHeader()});
  }

  listarAcompProd(id_acompanamiento:number): Observable<any> {
    return this.http.get<any>(`${apiURL}/acompanamiento/listar/prodacomp/${id_acompanamiento}`);
  }
}
