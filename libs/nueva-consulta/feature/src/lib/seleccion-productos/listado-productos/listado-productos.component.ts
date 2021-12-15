import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { addProductoSeleccionado, ConsultasState, deleteProductoSeleccionado, getFiltrosProductos, getProductosSeleccionados, getTratamientosSeleccionados, getUsarRecomendacion } from '../../..';
import { ConsultaService, FiltrosProductosConsulta, Tratamiento, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  productos: ProductoConsulta[] = [];

  constructor(private store: Store<ConsultasState>, private consultasService: ConsultaService) { }

  ngOnInit(): void {
    this.store.pipe(select(getUsarRecomendacion)).subscribe((value) => {
      this.usarRecomendacion = value;
    })

    this.store.pipe(select(getFiltrosProductos)).subscribe((filtros) => {
      this.filtros = filtros;
      this.productos$ = this.consultasService.getProductosByLabAndFuncion(this.filtros.idLaboratorio, this.filtros.idFuncion);
    })

    this.store.pipe(select(getProductosSeleccionados)).subscribe((productosSeleccionados) => {
      console.log("HEY! A CHANGE IN THE SELECTED PRODUCTS!")
      this.productos$ = this.productos$.pipe(map(productos => {
        for(let i = 0; i < this.productos.length; i++){
          const matchIndex = productosSeleccionados.findIndex(p => p.producto.id === productos[i].producto.id)
          if(matchIndex !== -1){
            productos[i] = productosSeleccionados[matchIndex];
          }
        }
        return productos;
      }))
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
