import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from './global';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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

  getUsuariosTrabajador(): Observable<any> {
    return this.http.get<any>(`${apiURL}/usuario/listartrabajador`, {headers: this.agregarAuthorizationHeader()});
  }

  getUsuariosCliente(): Observable<any> {
    return this.http.get<any>(`${apiURL}/usuario/listarcliente`, {headers: this.agregarAuthorizationHeader()});
  }

  agregarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${apiURL}/usuario/crear`, usuario, {headers: this.agregarAuthorizationHeader()});
  }

  editarUsuario(
    id_usuario:number,
    email: string, 
    nombre: string,
    apellidos: string,
    celular: string, 
  ): Observable<any> {
  return this.http.put<any>(`${apiURL}/usuario/actualizar/${id_usuario}`, 
    {
      email: email,
      nombre: nombre,
      apellidos: apellidos,
      celular: celular,
    }, {headers: this.agregarAuthorizationHeader()});
  }

  editarUsuarioContrasenia(id_usuario:number, contrasenia: string): Observable<any> {
    return this.http.put<any>(`${apiURL}/usuario/actualizar/contra/${id_usuario}`, { contrasenia }, {headers: this.agregarAuthorizationHeader()});
  }

  deleteUsuario(id_usuario:number): Observable<any> {
    return this.http.put<any>(`${apiURL}/usuario/delete/${id_usuario}`, {headers: this.agregarAuthorizationHeader()});
  }
  
}
