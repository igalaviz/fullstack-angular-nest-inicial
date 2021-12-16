import { Component, OnInit } from '@angular/core';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { deleteProductoSeleccionado, setProductoSiendoAplicado } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getProductosSeleccionados } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-lista-productos-por-aplicar',
  templateUrl: './lista-productos-por-aplicar.component.html',
  styleUrls: ['./lista-productos-por-aplicar.component.scss']
})
export class ListaProductosPorAplicarComponent implements OnInit {
  productos$: Observable<ProductoConsulta[]> = new Observable();

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.productos$ = this.store.pipe(select(getProductosSeleccionados), tap((productos) => {return productos.filter(p => p.aplicado === false)}))
  }

  onProductoDiscard(producto: ProductoConsulta){
    this.store.dispatch(deleteProductoSeleccionado({ producto }));
  }

  onProductoAplicar(producto: ProductoConsulta) {
    this.store.dispatch(setProductoSiendoAplicado({producto}));
  }

}
