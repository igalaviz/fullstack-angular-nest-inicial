import { Component } from '@angular/core';
import { Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { ConsultasState, deleteTratamiento, getTratamientosSeleccionados } from '@fullstack-angular-nest/nueva-consulta/feature';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'consultas-tratamientos-seleccionados',
  templateUrl: './tratamientos-seleccionados.component.html',
  styleUrls: ['./tratamientos-seleccionados.component.css']
})
export class TratamientosSeleccionadosComponent{
  tratamientosSeleccionados!: Tratamiento[];

  constructor(private store: Store<ConsultasState>) {
    store.pipe(select(getTratamientosSeleccionados)).subscribe((value) => {
      this.tratamientosSeleccionados = value;
    })
  }

  onTratamientoRemoved(tratamiento: Tratamiento){
    this.store.dispatch(deleteTratamiento({tratamiento: tratamiento}));
  }

}
