import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from './global';
import { Observable } from 'rxjs';
import { Combo } from '../models/combo';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

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

  getCombos(): Observable<any> {
    return this.http.get<any>(`${apiURL}/combo/listar`);
  }

  agregarCombo(combo: Combo): Observable<any> {
    return this.http.post<any>(`${apiURL}/combo/crear`, combo, {headers: this.agregarAuthorizationHeader()});
  }

  editarCombo(id_combo:number, descripcion:string, precio:string): Observable<any> {
    return this.http.put<any>(`${apiURL}/combo/actualizar/${id_combo}`, { descripcion, precio }, {headers: this.agregarAuthorizationHeader()});
  }

  deleteCombo(id_combo:number): Observable<any> {
    return this.http.put<any>(`${apiURL}/combo/delete/${id_combo}`, {headers: this.agregarAuthorizationHeader()});
  }

  asignarComboProd(id_productos:any[], id_combo:number): Observable<any> {
    return this.http.post<any>(`${apiURL}/combo/crear/prodcombo`,{ id_productos, id_combo }, {headers: this.agregarAuthorizationHeader()});
  }

  listarComboProd(id_combo:number): Observable<any> {
    return this.http.get<any>(`${apiURL}/combo/listar/prodcombo/${id_combo}`);
  }
}
