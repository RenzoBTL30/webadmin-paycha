import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHeaderComponent } from './dashboard/components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from './dashboard/components/dashboard-sidebar/dashboard-sidebar.component';
import { SearchPipe } from './pipes/search.pipe';
import { UsuariosComponent } from './dashboard/gestion-usuario/usuarios/usuarios.component';
import { AgregarUsuarioComponent } from './dashboard/modals/agregar-usuario/agregar-usuario.component';
import { GestionProductoComponent } from './dashboard/gestion-producto/gestion-producto.component';
import { GestionCategoriaComponent } from './dashboard/gestion-categoria/gestion-categoria.component';
import { GestionRolComponent } from './dashboard/gestion-rol/gestion-rol.component';
import { ReporteVentasComponent } from './dashboard/reporte-ventas/reporte-ventas.component';
import { ClientesComponent } from './dashboard/gestion-usuario/clientes/clientes.component';
import { EditarUsuarioComponent } from './dashboard/modals/editar-usuario/editar-usuario.component';
import { AgregarCategoriaComponent } from './dashboard/modals/agregar-categoria/agregar-categoria.component';
import { EditarCategoriaComponent } from './dashboard/modals/editar-categoria/editar-categoria.component';
import { AgregarProductoComponent } from './dashboard/modals/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './dashboard/modals/editar-producto/editar-producto.component';
import { AgregarRolComponent } from './dashboard/modals/agregar-rol/agregar-rol.component';
import { DetalleProductoComponent } from './dashboard/modals/detalle-producto/detalle-producto.component';
import { EditarRolComponent } from './dashboard/modals/editar-rol/editar-rol.component';
import { GestionLugarComponent } from './dashboard/gestion-lugar/gestion-lugar.component';
import { AgregarLugarComponent } from './dashboard/modals/agregar-lugar/agregar-lugar.component';
import { EditarLugarComponent } from './dashboard/modals/editar-lugar/editar-lugar.component';
import { FilterCategoriaPipe } from './pipes/filter_promo.pipe';
import { FilterDisponibilidadPipe } from './pipes/filter_disponibilidad.pipe';
import { OrdenesPendientesComponent } from './dashboard/gestion-ordenes/ordenes-pendientes/ordenes-pendientes.component';
import { DetalleOrdenComponent } from './dashboard/modals/detalle-orden/detalle-orden.component';
import { GestionAcompanamientoComponent } from './dashboard/gestion-acompanamiento/gestion-acompanamiento.component';
import { GestionComboComponent } from './dashboard/gestion-combo/gestion-combo.component';
import { AgregarAcompanamientoComponent } from './dashboard/modals/agregar-acompanamiento/agregar-acompanamiento.component';
import { AgregarComboComponent } from './dashboard/modals/agregar-combo/agregar-combo.component';
import { EditarAcompanamientoComponent } from './dashboard/modals/editar-acompanamiento/editar-acompanamiento.component';
import { EditarComboComponent } from './dashboard/modals/editar-combo/editar-combo.component';
import { GestionTipoAcompanamientoComponent } from './dashboard/gestion-tipo-acompanamiento/gestion-tipo-acompanamiento.component';
import { AgregarTipoAcompanamientoComponent } from './dashboard/modals/agregar-tipo-acompanamiento/agregar-tipo-acompanamiento.component';
import { EditarTipoAcompanamientoComponent } from './dashboard/modals/editar-tipo-acompanamiento/editar-tipo-acompanamiento.component';
import { AsignarAcompanamientoComponent } from './dashboard/modals/asignar-acompanamiento/asignar-acompanamiento.component';
import { AsignarComboComponent } from './dashboard/modals/asignar-combo/asignar-combo.component';
import { ListaProductosAcompComponent } from './dashboard/modals/lista-productos-acomp/lista-productos-acomp.component';
import { ListaProductosComboComponent } from './dashboard/modals/lista-productos-combo/lista-productos-combo.component';
import { GestionOrdenesComponent } from './dashboard/gestion-ordenes/gestion-ordenes.component';
import { OrdenesEnProcesoComponent } from './dashboard/gestion-ordenes/ordenes-en-proceso/ordenes-en-proceso.component';
import { OrdenesPreparadasComponent } from './dashboard/gestion-ordenes/ordenes-preparadas/ordenes-preparadas.component';
import { OrdenesCocinaComponent } from './dashboard/ordenes-cocina/ordenes-cocina.component';
import { OrdenesCompletadasComponent } from './dashboard/ordenes-completadas/ordenes-completadas.component';
import { OrdenesEnCaminoComponent } from './dashboard/gestion-ordenes/ordenes-en-camino/ordenes-en-camino.component';
import { Search2Pipe } from './pipes/search2.pipe';
import { OrdenesCanceladasComponent } from './dashboard/gestion-ordenes/ordenes-canceladas/ordenes-canceladas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [
    FilterPipe,
    FilterCategoriaPipe,
    FilterDisponibilidadPipe,
    SearchPipe,
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardSidebarComponent,
    UsuariosComponent,
    ClientesComponent,
    GestionProductoComponent,
    GestionCategoriaComponent,
    GestionRolComponent,
    ReporteVentasComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
    GestionProductoComponent,
    GestionCategoriaComponent,
    GestionRolComponent,
    ReporteVentasComponent,
    AgregarCategoriaComponent,
    EditarCategoriaComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    AgregarRolComponent,
    DetalleProductoComponent,
    EditarRolComponent,
    GestionLugarComponent,
    AgregarLugarComponent,
    EditarLugarComponent,
    OrdenesPendientesComponent,
    DetalleOrdenComponent,
    GestionAcompanamientoComponent,
    GestionComboComponent,
    AgregarAcompanamientoComponent,
    AgregarComboComponent,
    EditarAcompanamientoComponent,
    EditarComboComponent,
    GestionTipoAcompanamientoComponent,
    AgregarTipoAcompanamientoComponent,
    EditarTipoAcompanamientoComponent,
    AsignarAcompanamientoComponent,
    AsignarComboComponent,
    ListaProductosAcompComponent,
    ListaProductosComboComponent,
    GestionOrdenesComponent,
    OrdenesEnProcesoComponent,
    OrdenesPreparadasComponent,
    OrdenesCocinaComponent,
    OrdenesCompletadasComponent,
    OrdenesEnCaminoComponent,
    Search2Pipe,
    OrdenesCanceladasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
    }),
    FormsModule,
    NgbModule,
    BsDatepickerModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
