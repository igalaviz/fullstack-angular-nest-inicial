import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { deleteProductoSeleccionado, setProductoSiendoAplicado, updateProductoSeleccionado } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getProductosSeleccionados } from '../../state/consultas/consultas.selectors';
import { DialogoProductoAplicarComponent } from '../dialogo-producto-aplicar/dialogo-producto-aplicar.component';

@Component({
  selector: 'consultas-lista-productos-por-aplicar',
  templateUrl: './lista-productos-por-aplicar.component.html',
  styleUrls: ['./lista-productos-por-aplicar.component.scss']
})
export class ListaProductosPorAplicarComponent implements OnInit {
  productos$: Observable<ProductoConsulta[]> = new Observable();

  constructor(private store: Store<ConsultasState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.productos$ = this.store.pipe(select(getProductosSeleccionados), tap((productos) => {return productos.filter(p => p.aplicado === false)}))
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
