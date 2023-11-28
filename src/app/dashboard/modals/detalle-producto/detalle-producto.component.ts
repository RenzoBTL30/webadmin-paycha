import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  @Input() nom?: string;
  @Input() desc?: string;
  @Input() prec?: string;
  @Input() imag?: string;
  @Input() nom_categoria?: string;

  @ViewChild('image') imageElement!: ElementRef;

  file: File | undefined;
  
  constructor() {
    
  }

  ngOnInit(): void {
  }

}
