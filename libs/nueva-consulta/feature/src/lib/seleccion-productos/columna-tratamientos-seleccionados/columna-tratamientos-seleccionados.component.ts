import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductoConsulta, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { deleteProductoSeleccionado, setTratamientoInteres } from '../../state/consultas/consultas.actions';
import { TratamientoConProductos } from '../../state/consultas/consultas.models';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getTratamientosConProductosSeleccionados } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-columna-tratamientos-seleccionados',
  templateUrl: './columna-tratamientos-seleccionados.component.html',
  styleUrls: ['./columna-tratamientos-seleccionados.component.scss']
})
export class ColumnaTratamientosSeleccionadosComponent implements OnInit, OnDestroy {
  tratamientosConProductos: TratamientoConProductos[] = [];

  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.subscriptions.push(this.store.pipe(select(getTratamientosConProductosSeleccionados)).subscribe((value) => {
      this.tratamientosConProductos = value;
    }))
  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

  onProductoRemoved(producto: ProductoConsulta, tratamiento: Tratamiento){
    this.store.dispatch(deleteProductoSeleccionado({producto, tratamiento}))
  }

  onTratamientoToggle(tratamiento: Tratamiento) {
    this.store.dispatch(setTratamientoInteres({tratamientoInteres: tratamiento}))
  }

}
