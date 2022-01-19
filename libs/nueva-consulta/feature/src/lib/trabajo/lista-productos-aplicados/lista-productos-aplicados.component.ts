import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { AplicacionProducto } from 'libs/nueva-consulta/data-access/src';
import { Subscription } from 'rxjs';
import { removeAplicacionProducto, setProductoSiendoAplicado, setProximaAplicacionProducto, setSelectedFaceAreas } from '../../..';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getProductosAplicados } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-lista-productos-aplicados',
  templateUrl: './lista-productos-aplicados.component.html',
  styleUrls: ['./lista-productos-aplicados.component.scss']
})
export class ListaProductosAplicadosComponent implements OnInit, OnDestroy {
  productos: ProductoConsulta[] = [];

  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.store.select(getProductosAplicados).subscribe((productosAplicados) => {
      this.productos = productosAplicados;
    }))
  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

  onDiscardAplicacionClicked(aplicacion: AplicacionProducto, producto: ProductoConsulta) {
    this.store.dispatch(removeAplicacionProducto({area: aplicacion.area, producto}))
  }

  onEditarAplicacionesClicked(producto: ProductoConsulta) {
    this.store.dispatch(setProductoSiendoAplicado({producto}))
    this.store.dispatch(setSelectedFaceAreas({areas: producto.aplicaciones.map(a => a.area)}))
  }

  onProximaAplicacionChanged(proximaAplicacion: string, producto: ProductoConsulta){
    this.store.dispatch(setProximaAplicacionProducto({proximaAplicacion, producto}));
  }

}
