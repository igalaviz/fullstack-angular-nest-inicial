import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { deleteTratamiento } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getTratamientosSeleccionados } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-lista-tratamientos-seleccionados-trb',
  templateUrl: './lista-tratamientos-seleccionados-trb.component.html',
  styleUrls: ['./lista-tratamientos-seleccionados-trb.component.scss']
})
export class ListaTratamientosSeleccionadosTrbComponent implements OnInit, OnDestroy {

  tratamientos: Tratamiento[] = []

  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.subscriptions.push(this.store.select(getTratamientosSeleccionados).subscribe((value) => {
      this.tratamientos = value;
    }))
  }

  ngOnDestroy(): void {
    for(const sub of this.subscriptions){
      sub.unsubscribe();
    }
  }

  onTratamientoDiscardClicked(tratamiento: Tratamiento){
    this.store.dispatch(deleteTratamiento({tratamiento}));
  }

}
