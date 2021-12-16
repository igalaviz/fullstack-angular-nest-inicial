import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ConsultaService, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { addProductoSeleccionado } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';

@Component({
  selector: 'consultas-add-producto-btn',
  templateUrl: './add-producto-btn.component.html',
  styleUrls: ['./add-producto-btn.component.scss']
})
export class AddProductoBtnComponent implements OnInit {
  productoControl = new FormControl('')

  opcionesProductos: ProductoConsulta[] = [];
  filteredOpcionesProductos!: Observable<ProductoConsulta[]>;
  productoSeleccionado?: ProductoConsulta;

  constructor(private consultasService: ConsultaService, private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.consultasService.getAllProducts().subscribe((value) => {
      this.opcionesProductos = value;
    })

    this.filteredOpcionesProductos = this.productoControl
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterProducto(value))
      );
  }

  private _filterProducto(value: string): ProductoConsulta[] {
    const filterValue = value.toLowerCase();

    return this.opcionesProductos.filter((option) =>
      option.producto.nombre.toLowerCase().includes(filterValue)
    );
  }

  displayFn(producto: ProductoConsulta): string {
    return producto && producto.producto.nombre ? producto.producto.nombre : '';
  }

  onProductoChanged(event: MatAutocompleteSelectedEvent){
    this.productoSeleccionado = event.option.value;
  }

  onAddClicked(){
    if(this.productoSeleccionado){
      this.store.dispatch(addProductoSeleccionado({producto: this.productoSeleccionado}))
      this.productoSeleccionado = undefined;
      this.productoControl.setValue('');
    }
    //otherwise an alert should be shown to the user, telling them to select a product
    
  }

}
