import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css'],
})
export class DashboardHeaderComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter();
  @Input() dropIsShowed: boolean = false;

  usuario: any = {nombre: '', apellidos: '', rol: ''};

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  onToggle() {
    this.toggleEvent.emit();
  }
  
  logOut() {
    this.authService.eliminarDatos();
    this.router.navigate(['']);
  }

  getUsuario() {
    this.usuario.nombre = sessionStorage.getItem('nombre');
    this.usuario.apellidos = sessionStorage.getItem('apellidos');
    this.usuario.rol = sessionStorage.getItem('rol');
  }
}
