import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from './global';
import { Lugar } from '../models/lugar';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

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

  getLugares(): Observable<any> {
    return this.http.get<any>(`${apiURL}/lugar/listarweb`);
  }

  agregarLugar(lugar: Lugar): Observable<any> {
    return this.http.post<any>(`${apiURL}/lugar/crear`, lugar, {headers: this.agregarAuthorizationHeader()});
  }

  editarLugar(id_lugar:number, lugar:string, comision:string): Observable<any> {
    return this.http.put<any>(`${apiURL}/lugar/update/${id_lugar}`, 
    { 
      lugar: lugar,
      comision: comision
    }, {headers: this.agregarAuthorizationHeader()});
  }

  deleteLugar(id_lugar:number): Observable<any> {
    return this.http.put<any>(`${apiURL}/lugar/delete/${id_lugar}`, {headers: this.agregarAuthorizationHeader()});
  }
}
