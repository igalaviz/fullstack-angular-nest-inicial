import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { addProductoSeleccionado, ConsultasState, deleteProductoSeleccionado, getFiltrosProductos, getTratamientosSeleccionados, getUsarRecomendacion } from '../../..';
import { ConsultaService, FiltrosProductosConsulta, Tratamiento, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { iif, Observable } from 'rxjs';

@Component({
  selector: 'consultas-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent implements OnInit {
  usarRecomendacion = false;
  filtros: FiltrosProductosConsulta = {idLaboratorio: '', idFuncion: ''};
  tratamientosSeleccionados!: Tratamiento[];

  productos$: Observable<ProductoConsulta[]> = new Observable<[]>();

  constructor(private store: Store<ConsultasState>, private consultasService: ConsultaService) { }

  ngOnInit(): void {
    this.store.pipe(select(getUsarRecomendacion)).subscribe((value) => {
      this.usarRecomendacion = value;
    })

    this.store.pipe(select(getFiltrosProductos)).subscribe((value) => {
      this.filtros = value;
      this.productos$ = this.consultasService.getProductosByLabAndFuncion(this.filtros.idLaboratorio, this.filtros.idFuncion);
    })

    this.store.pipe(select(getTratamientosSeleccionados)).subscribe((value) => {
      this.tratamientosSeleccionados = value;
    })
  }

  onProductoSelected(producto: ProductoConsulta, tratamiento?: Tratamiento) {
    if(tratamiento){
      this.store.dispatch(addProductoSeleccionado({producto, tratamiento}))
    }else {
      this.store.dispatch(addProductoSeleccionado({producto}))
    }
  }

  onProductoRemoved(producto: ProductoConsulta, tratamiento?: Tratamiento) {
    if(tratamiento) {
      this.store.dispatch(deleteProductoSeleccionado({producto, tratamiento}))
    }else {
      this.store.dispatch(deleteProductoSeleccionado({producto}))
    }
  }
}
