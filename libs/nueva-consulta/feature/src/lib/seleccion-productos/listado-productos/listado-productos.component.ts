import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { addProductoSeleccionado, ConsultasState, deleteProductoSeleccionado, getFiltrosProductos, getProductosSeleccionados, getTratamientosSeleccionados, getUsarRecomendacion } from '../../..';
import { ConsultaService, FiltrosProductosConsulta, Tratamiento, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { merge, Observable } from 'rxjs';
import { map, mergeMap, startWith, switchMap, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'consultas-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent implements OnInit, AfterViewInit {
  usarRecomendacion = false;
  filtros: FiltrosProductosConsulta = {idLaboratorio: '', idFuncion: ''};
  tratamientosSeleccionados!: Tratamiento[];

  productos: ProductoConsulta[] = [];
  productosToShow: ProductoConsulta[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store<ConsultasState>, private consultasService: ConsultaService) { }

  ngAfterViewInit(): void {
    this.updateProductosToShow();
    this.paginator.page.subscribe((value) => {
      const from = value.pageIndex * value.pageSize;
      const to = from + value.pageSize;
      this.productosToShow = this.productos.slice(from, to);
    })
  }

  ngOnInit(): void {

    this.store.pipe(select(getUsarRecomendacion)).subscribe((value) => {
      this.usarRecomendacion = value;
    })

    this.store.pipe(select(getFiltrosProductos), tap((filtros) => {
      this.filtros = filtros;
    }), switchMap((filtros) => {
      return this.consultasService.getProductosByLabAndFuncion(this.filtros.idLaboratorio, this.filtros.idFuncion);
    }))
    .subscribe((productos) => {
      this.productos = productos;
      this.updateProductosToShow();
    });

    this.store.pipe(select(getProductosSeleccionados)).subscribe((productosSeleccionados) => {
      console.log("HEY! A CHANGE IN THE SELECTED PRODUCTS!")
      this.productos = this.productos.map(producto => {
          const matchIndex = productosSeleccionados.findIndex(p => p.producto.id === producto.producto.id)
          if(matchIndex !== -1){
            return productosSeleccionados[matchIndex];
          }else{
            return producto;
          }
      })
      this.updateProductosToShow();
      
    })

    this.store.pipe(select(getTratamientosSeleccionados)).subscribe((value) => {
      this.tratamientosSeleccionados = value;
    })

  }

  updateProductosToShow(){
    if(this.paginator){
      const from = this.paginator.pageIndex * this.paginator.pageSize;
    const to = from + this.paginator.pageSize;
    this.productosToShow = this.productos.slice(from, to);
    }
    
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