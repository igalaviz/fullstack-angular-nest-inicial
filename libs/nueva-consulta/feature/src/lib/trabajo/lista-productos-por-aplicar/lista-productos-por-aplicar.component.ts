import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { deleteProductoSeleccionado, setProductoSiendoAplicado, updateProductoSeleccionado } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getProductosPorAplicar } from '../../state/consultas/consultas.selectors';
import { DialogoProductoAplicarComponent } from '../dialogo-producto-aplicar/dialogo-producto-aplicar.component';

@Component({
  selector: 'consultas-lista-productos-por-aplicar',
  templateUrl: './lista-productos-por-aplicar.component.html',
  styleUrls: ['./lista-productos-por-aplicar.component.scss']
})
export class ListaProductosPorAplicarComponent implements OnInit, OnDestroy {
  productos: ProductoConsulta[] = []

  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscriptions.push(this.store.pipe(select(getProductosPorAplicar)).subscribe((productosPorAplicar) => {
      this.productos = productosPorAplicar;
    }))
  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

  onProductoDiscard(producto: ProductoConsulta){
    this.store.dispatch(deleteProductoSeleccionado({ producto }));
  }

  onProductoAplicar(producto: ProductoConsulta) {
    const dialogRef = this.dialog.open(DialogoProductoAplicarComponent, {
      width: '480px',
      data: {product: producto},
    });

    dialogRef.afterClosed().subscribe(result => {
      producto = Object.assign({}, {...producto, aplicador: result.aplicador, lote: result.lote})

      this.store.dispatch(updateProductoSeleccionado({producto}));
      this.store.dispatch(setProductoSiendoAplicado({producto}));
    });
  }

}
