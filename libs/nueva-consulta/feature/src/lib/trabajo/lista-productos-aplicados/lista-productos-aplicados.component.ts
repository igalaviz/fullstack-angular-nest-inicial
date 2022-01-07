import { Component, OnInit } from '@angular/core';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getProductosAplicados } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-lista-productos-aplicados',
  templateUrl: './lista-productos-aplicados.component.html',
  styleUrls: ['./lista-productos-aplicados.component.scss']
})
export class ListaProductosAplicadosComponent implements OnInit {
  productos: ProductoConsulta[] = [];

  constructor(private store: Store<ConsultasState>) {

  }

  ngOnInit(): void {
    this.store.select(getProductosAplicados).subscribe((productosAplicados) => {
      this.productos = productosAplicados;
    })
  }

}
