import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';
import { ConsultaService, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { addProductoSeleccionado } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getProductosSeleccionados } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-add-producto-btn',
  templateUrl: './add-producto-btn.component.html',
  styleUrls: ['./add-producto-btn.component.scss']
})
export class AddProductoBtnComponent implements OnInit {
  productoControl = new FormControl(undefined)

  opcionesProductos: ProductoConsulta[] = [];
  productoSeleccionado?: ProductoConsulta;

  constructor(private consultasService: ConsultaService, private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    // cross the selected with all of them
    this.consultasService.getAllProducts().subscribe((value) => {
      this.opcionesProductos = value;
    })

    this.store.pipe(select(getProductosSeleccionados)).subscribe((productosSeleccionados) => {
      this.opcionesProductos = this.opcionesProductos.map(producto => {
          const matchIndex = productosSeleccionados.findIndex(p => p.producto.id === producto.producto.id)
          if(matchIndex !== -1){
            return {...producto, selected: true}
          }else{
            return {...producto, selected: false}
          }
      })
    })

  }

  displayFn(producto: ProductoConsulta): string {
    return producto && producto.producto.nombre ? producto.producto.nombre : '';
  }

  onProductoChanged(event: MatSelectChange){
    this.productoSeleccionado = event.value;
  }

  onAddClicked(){
    if(this.productoSeleccionado){
      this.store.dispatch(addProductoSeleccionado({producto: this.productoSeleccionado}))
      this.productoSeleccionado = undefined;
      this.productoControl.setValue(undefined);
    }
    //otherwise an alert should be shown to the user, telling them to select a product
    
  }

}
