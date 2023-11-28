import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from './global';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

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

  asignarRol(id_usuario:number, id_rol:number): Observable<any> {
    return this.http.post<any>(`${apiURL}/rol/asignar/${id_usuario}`,{id_rol}, {headers: this.agregarAuthorizationHeader()});
  }

  updateRolUsuario(id_usuario:number, id_rol:number): Observable<any> {
    return this.http.put<any>(`${apiURL}/rol/updaterolusuario/${id_usuario}`,{id_rol}, {headers: this.agregarAuthorizationHeader()});
  }

  crearRol(rol:Rol): Observable<any> {
    return this.http.post<any>(`${apiURL}/rol/crear`,rol, {headers: this.agregarAuthorizationHeader()});
  }

  updateRol(id_rol:number, nombre:string): Observable<any> {
    return this.http.put<any>(`${apiURL}/rol/update/${id_rol}`,{ nombre }, {headers: this.agregarAuthorizationHeader()});
  }

  getRoles(): Observable<any> {
    return this.http.get<any>(`${apiURL}/rol/listar`, {headers: this.agregarAuthorizationHeader()});
  }

  getRolesTrabajador(): Observable<any> {
    return this.http.get<any>(`${apiURL}/rol/listartrabajador`, {headers: this.agregarAuthorizationHeader()});
  }
}
