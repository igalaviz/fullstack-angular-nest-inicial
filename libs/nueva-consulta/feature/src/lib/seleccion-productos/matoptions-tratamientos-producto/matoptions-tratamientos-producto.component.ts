import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { ProductoConsulta, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { addProductoSeleccionado, deleteProductoSeleccionado } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getProductosSeleccionados, getTratamientosSeleccionados } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-matoptions-tratamientos-producto',
  templateUrl: './matoptions-tratamientos-producto.component.html',
  styleUrls: ['./matoptions-tratamientos-producto.component.scss']
})
export class MatoptionsTratamientosProductoComponent implements OnInit {
  @Input() producto!: ProductoConsulta;
  @Output() selectionChange = new EventEmitter<{tratamiento: Tratamiento, checked: boolean}>();

  opcionesTratamientos: Tratamiento[] = []

  tratamientosCheck?: Tratamiento[] = []
  tratamientosControl: FormControl = new FormControl([]);

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.store.select(getTratamientosSeleccionados).subscribe((tratamientosSeleccionados) => {
      this.opcionesTratamientos = tratamientosSeleccionados;
    })

    this.store.select(getProductosSeleccionados).subscribe((productosSeleccionados) => {
      const foundIndex = productosSeleccionados.findIndex(p => p.producto.id === this.producto.producto.id);
      if(foundIndex === -1){
        this.tratamientosCheck = [];
        this.tratamientosControl.setValue([]);
      }else{
        this.tratamientosCheck = productosSeleccionados[foundIndex].tratamientos;
        this.tratamientosControl.setValue(productosSeleccionados[foundIndex].tratamientos);
      }
    })
  }

  onTratamientoRemoved(tratamiento: Tratamiento){
    let tratamientos = this.tratamientosControl.value as Tratamiento[];
    tratamientos = tratamientos.filter(t => t.id !== tratamiento.id);
    
    this.tratamientosControl.setValue(tratamientos); // To trigger change detection
    this.store.dispatch(deleteProductoSeleccionado({producto: this.producto, tratamiento}))
  }

  onTratamientoSelectionChanged(tratamiento: Tratamiento, checked: boolean){
      if(checked){
        this.store.dispatch(addProductoSeleccionado({producto: this.producto, tratamiento}))
      }else{
        this.store.dispatch(deleteProductoSeleccionado({producto: this.producto, tratamiento}))
      }
    
  }

  areThereChanges(): boolean {
    if(this.tratamientosCheck){
      if(this.tratamientosControl.value.lenght !== this.tratamientosCheck?.length){
        return true;
      }else{
        let equal = true;
        for(const tratamiento of this.tratamientosCheck){
          if((<Tratamiento[]>this.tratamientosControl.value).findIndex(t => t.id === tratamiento.id) === -1){
            equal = false;
            return true
          }else{
            equal = true;
          }
        }
        return false;
      }
    }
    return true;
  }

}