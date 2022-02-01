import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { addProductoSeleccionado, ConsultasState, deleteProductoSeleccionado, getFiltrosProductos, getProductosSeleccionados, getTratamientosSeleccionados, getUsarRecomendacion } from '../../..';
import { ConsultaService, FiltrosProductosConsulta, Tratamiento, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { map, mergeMap, startWith, switchMap, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'consultas-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent implements OnInit, AfterViewInit, OnDestroy {
  usarRecomendacion = false;
  filtros: FiltrosProductosConsulta = {idLaboratorio: '', idFuncion: ''};
  tratamientosSeleccionados: Tratamiento[] = [];

  // esta es la lista de TODOS los productos que coinciden con los filtros que el usuario eligió
  productos: ProductoConsulta[] = [];
  // esta es la lista de los productos que se muestran en pantalla actualmente,
  // dependiendo de las opciones del paginator que el usuario haya elegido
  productosToShow: ProductoConsulta[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>, private consultasService: ConsultaService) { }

  ngOnInit(): void {

    this.subscriptions.push(this.store.pipe(select(getUsarRecomendacion)).subscribe((value) => {
      this.usarRecomendacion = value;
    }))

    this.subscriptions.push(this.store.pipe(select(getFiltrosProductos), tap((filtros) => {
      // cada vez que el usuario escoga un filtro (laboratorio/funcion) diferente...
      this.filtros = filtros;
    }), switchMap((filtros) => {
      // ... debo obtener los productos que correspondan a esos filtros
      return this.consultasService.getProductosByLabAndFuncion(this.filtros.idLaboratorio, this.filtros.idFuncion);
    }))
    .subscribe((productos) => {
      // actualizar mi lista de productos con los productos que obtuve del servicio
      this.productos = productos;

      // this setTimeout of 0sec is necessary so the code inside runs only when the Paginator component is not undefined
      setTimeout(() => {
        // ahora que tengo una lista nueva, debo actualizar también los productos que se le muestran al usuario...
        this.updateProductosToShow();
        if(this.paginator){
          //...y llevarlo a la primera página para que pueda ver todos los productos
          this.paginator.firstPage();
        }
      }, 0)
      
    }));

    this.subscriptions.push(this.store.pipe(select(getProductosSeleccionados)).subscribe((productosSeleccionados) => {
      this.productos = this.productos.map(producto => {
          const matchIndex = productosSeleccionados.findIndex(p => p.producto.id === producto.producto.id)
          if(matchIndex !== -1){
            return productosSeleccionados[matchIndex];
          }else{
            return producto;
          }
      })
      this.updateProductosToShow();
    }))

    this.subscriptions.push(this.store.pipe(select(getTratamientosSeleccionados)).subscribe((value) => {
      this.tratamientosSeleccionados = value;
    }))

  }

  ngAfterViewInit(): void {
    this.updateProductosToShow();
    this.subscriptions.push(this.paginator.page.subscribe((value) => {
      if(value.pageSize >= this.productos.length){
        // si el número total de productos que coinciden con los filtros
        // es mayor o igual al número de productos que se deben mostrar por página, no es necesario recortar el array
        this.productosToShow = this.productos;
      }else{
        const from = value.pageIndex * value.pageSize;
        const to = from + value.pageSize;
        this.productosToShow = this.productos.slice(from, to);
      }  
    }))
  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

  updateProductosToShow(){
    if(this.paginator){
      if(this.paginator.pageSize >= this.productos.length){
        // si el número total de productos que coinciden con los filtros
        // es mayor o igual al número de productos que se deben mostrar por página, no es necesario recortar el array
        this.productosToShow = this.productos;
      }else{
        const from = this.paginator.pageIndex * this.paginator.pageSize;
        const to = from + this.paginator.pageSize;
        this.productosToShow = this.productos.slice(from, to);
      }
    }
    
  }

  updatePaginator(){
    this.paginator.length = this.productos.length;
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