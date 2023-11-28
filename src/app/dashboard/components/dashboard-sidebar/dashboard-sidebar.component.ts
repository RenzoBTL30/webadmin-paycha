import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/models/modulo';

export const modulosAdmin: Modulo[] = [
  { nombre: 'Gestionar Trabajadores', ruta: 'gestionar-trabajadores' },
  { nombre: 'Gestionar Clientes', ruta: 'gestionar-clientes' },
  { nombre: 'Gestionar Roles', ruta: 'gestionar-roles' },
  { nombre: 'Pedidos Completados', ruta: 'ordenes-completadas' },
  { nombre: 'Reporte de Ventas', ruta: 'reporte-ventas' }
];

export const modulosGestorTienda: Modulo[] = [
  { nombre: 'Gestionar Pedidos', ruta: 'gestionar-ordenes/pendientes' },
  { nombre: 'Gestionar Productos', ruta: 'gestionar-productos' },
  { nombre: 'Gestionar Categorías', ruta: 'gestionar-categorias' },
  { nombre: 'Gestionar Acompanamientos', ruta: 'gestionar-acompanamientos' },
  { nombre: 'Gestionar Tipos de Acompanamiento', ruta: 'gestionar-tipoacompanamientos' },
  { nombre: 'Gestionar Combos', ruta: 'gestionar-combos' },
  { nombre: 'Gestionar Lugares', ruta: 'gestionar-lugares' },
  { nombre: 'Gestionar Clientes', ruta: 'gestionar-clientes' },
  { nombre: 'Pedidos Completados', ruta: 'ordenes-completadas' },
];

export const modulosCocina: Modulo[] = [
  { nombre: 'Ordenes Cocina', ruta: 'ordenes-cocina' },
];


@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css'],
})

export class DashboardSidebarComponent implements OnInit {
  @Input() sidebarIsOpen: boolean = false;

  modulos: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getModulos();
  }

  routeToMenu(route: string) {
    this.router.navigate([`/dashboard/${route}`]);
  }

  getModulos() {
    switch (sessionStorage.getItem('rol')) {
      case 'Administrador':
        this.modulos = modulosAdmin;
        break;
      case 'Gestor de la tienda':
        this.modulos = modulosGestorTienda;
        break;
      case 'Cocina':
        this.modulos = modulosCocina;
        break;
    
      default:
        break;
    }
  }
}
