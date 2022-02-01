import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaService, ProductoConsulta, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { addProductoSeleccionado, deleteProductoSeleccionado } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getTratamientoDeInteres, getTratamientosSeleccionados } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-productos-recomendados',
  templateUrl: './productos-recomendados.component.html',
  styleUrls: ['./productos-recomendados.component.css']
})
export class ProductosRecomendadosComponent implements OnInit, OnDestroy {
  tratamientoInteres?: Tratamiento;
  tratamientosSeleccionados!: Tratamiento[];
  productos$: Observable<ProductoConsulta[]> = new Observable<[]>();

  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>, private consultasService: ConsultaService) {

  }

  ngOnInit(): void {
    const tratSub = this.store.pipe(select(getTratamientoDeInteres)).subscribe((value) => {
      this.tratamientoInteres = value;
      if(this.tratamientoInteres){
        this.productos$ = this.consultasService.getProductosRecomendadosParaTratamiento(this.tratamientoInteres.clave)
      }else {
        this.productos$ = new Observable<[]>();
      }
    })
    this.subscriptions.push(tratSub);

    const tratamientosSub = this.store.pipe(select(getTratamientosSeleccionados)).subscribe((value) => {
      this.tratamientosSeleccionados = value;
    })
    this.subscriptions.push(tratamientosSub);

  }
  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

  onProductoSelected(producto: ProductoConsulta, tratamiento: Tratamiento) {
    console.log(producto, tratamiento);
    this.store.dispatch(addProductoSeleccionado({producto, tratamiento}))
  }

  onProductoRemoved(producto: ProductoConsulta, tratamiento: Tratamiento) {
    console.log(producto, tratamiento);
    this.store.dispatch(deleteProductoSeleccionado({producto, tratamiento}))
  }
}
