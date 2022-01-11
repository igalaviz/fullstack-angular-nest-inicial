import { Component, OnInit } from '@angular/core';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { AplicacionProducto } from 'libs/nueva-consulta/data-access/src';
import { removeAplicacionProducto, setProductoSiendoAplicado, setSelectedFaceAreas } from '../../..';
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

  onDiscardAplicacionClicked(aplicacion: AplicacionProducto, producto: ProductoConsulta) {
    this.store.dispatch(removeAplicacionProducto({area: aplicacion.area, producto}))
  }

  onEditarAplicacionesClicked(producto: ProductoConsulta) {
    this.store.dispatch(setProductoSiendoAplicado({producto}))
    this.store.dispatch(setSelectedFaceAreas({areas: producto.aplicaciones.map(a => a.area)}))
  }

}
