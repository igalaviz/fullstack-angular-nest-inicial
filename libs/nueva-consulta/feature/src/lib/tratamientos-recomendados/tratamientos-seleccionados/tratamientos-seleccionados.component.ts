import { Component, OnDestroy } from '@angular/core';
import { Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { ConsultasState, deleteTratamiento, getTratamientosSeleccionados } from '@fullstack-angular-nest/nueva-consulta/feature';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'consultas-tratamientos-seleccionados',
  templateUrl: './tratamientos-seleccionados.component.html',
  styleUrls: ['./tratamientos-seleccionados.component.css']
})
export class TratamientosSeleccionadosComponent implements OnDestroy{
  tratamientosSeleccionados!: Tratamiento[];

  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>) {
    this.subscriptions.push(store.pipe(select(getTratamientosSeleccionados)).subscribe((value) => {
      this.tratamientosSeleccionados = value;
    }))
  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

  onTratamientoRemoved(tratamiento: Tratamiento){
    this.store.dispatch(deleteTratamiento({tratamiento: tratamiento}));
  }

}
