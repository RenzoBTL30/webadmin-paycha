import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from './global';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

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

  getCategorias(): Observable<any> {
    return this.http.get<any>(`${apiURL}/categoria/listar`);
  }

  agregarCategoria(categoria: Categoria): Observable<any> {
    return this.http.post<any>(`${apiURL}/categoria/crear`, categoria, {headers: this.agregarAuthorizationHeader()});
  }

  editarCategoria(id_categoria:number, nombre:string): Observable<any> {
    return this.http.put<any>(`${apiURL}/categoria/actualizar/${id_categoria}`, { nombre }, {headers: this.agregarAuthorizationHeader()});
  }

  deleteCategoria(id_categoria:number): Observable<any> {
    return this.http.delete<any>(`${apiURL}/categoria/delete/${id_categoria}`, {headers: this.agregarAuthorizationHeader()});
  }
}
