import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { ConsultasState, getProductoSiendoAplicado } from '../..';

@Component({
  selector: 'consultas-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss']
})
export class TrabajoComponent implements OnInit {
  productoEnUso?: ProductoConsulta;

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.store.pipe(select(getProductoSiendoAplicado)).subscribe((value) => {
      this.productoEnUso = value;
    })
  }

}
