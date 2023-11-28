import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LugarService } from 'src/app/servicios/lugar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-lugar',
  templateUrl: './gestion-lugar.component.html',
  styleUrls: ['./gestion-lugar.component.css']
})
export class GestionLugarComponent implements OnInit {

  searchedString: string = '';
  lugares: any[] = [];

  id_lugar?: number;
  lugar?: string;
  comision?: string;

  isLoading?: boolean;

  constructor(
    private lugarService: LugarService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getLugares();
  }

  getLugares() {
    this.isLoading = true;
    this.lugarService.getLugares().subscribe((data) => {
      this.lugares = data;
      this.isLoading = false;
    });
  }

  getLugares2daVez($event:any){
    this.lugarService.getLugares().subscribe((data) => {
      this.lugares = data;
    });
  }

  edit(
    id_lugar?: number,
    lugar?: string,
    comision?: string
  ) {
    this.id_lugar = id_lugar;
    this.lugar = lugar;
    this.comision = comision;
  }

  
  deleteLugar(id_lugar: number) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este lugar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toast.success('Lugar eliminado correctamente');
        this.lugarService.deleteLugar(id_lugar).subscribe((data) =>{
          this.getLugares();
        });
        
      }
    })

    
  }

}
