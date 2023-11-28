import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from './global';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private httpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private agregarAuthorizationHeader(){
    let token = sessionStorage.getItem('token') ?? '';
    if(token!=null){
      return this.httpHeaders.append('Authorization',token);
    }
    return this.httpHeaders;
  }

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any> {
    return this.http.get<any>(`${apiURL}/producto/listar`);
  }

  // Angular define el httpOptions para formData de manera automática, esto se hace
  // cuando se desea enviar archivos (variables de tipo File)
  agregarProducto(producto: Producto, file: any): Observable<any> {
    const formData = new FormData();
    formData.append('producto', JSON.stringify(producto));
    formData.append('image', file);
  
    return this.http.post<any>(`${apiURL}/producto/crear`, formData, {headers: this.agregarAuthorizationHeader()});
  }

  editarProductoConImagen(
    id_producto:number, 
    nombre:string, 
    desc:string, 
    precio:string, 
    id_cat:number,
    file: any
  ): Observable<any> {
    
    // Creando un objeto llamado producto para almacenar los parametros del método
    // los atributos del objeto tienen que nombrarse igual que los nombres de las columnas de la BD
    // asi se ha realizado con otros objetos como categoria, rol, usuario. Ya que los atributos del objeto de los models deben llamarse igual que las columnas de la BD
    const producto = {
      id_producto: id_producto, 
      nombre: nombre, 
      descripcion: desc, 
      precio: precio, 
      id_categoria: id_cat,
    }

    const formData = new FormData();
    formData.append('producto', JSON.stringify(producto));
    formData.append('image', file);

    return this.http.put<any>(`${apiURL}/producto/update/${id_producto}`, formData);
  }

  editarProductoSinImagen(id_producto:number, nom:string, desc:string, prec:string, id_cat:number): Observable<any> {
    return this.http.put<any>(`${apiURL}/producto/updatesinimagen/${id_producto}`, 
    { 
      nombre:nom,
      descripcion: desc,
      precio: prec,
      id_categoria: id_cat
    }, {headers: this.agregarAuthorizationHeader()});
  }

  deleteProducto(id_producto:number): Observable<any> {
    return this.http.put<any>(`${apiURL}/producto/delete/${id_producto}`, {headers: this.agregarAuthorizationHeader()});
  }


  updateEstadoDisponible(id_producto:number, estado_disponible:string): Observable<any> {
    return this.http.put<any>(`${apiURL}/producto/updateestadodis/${id_producto}/${estado_disponible}`, {headers: this.agregarAuthorizationHeader()});
  }
}
