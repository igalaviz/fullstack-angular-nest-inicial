import { Component, OnInit } from '@angular/core';
import { Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { deleteTratamiento } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getTratamientosSeleccionados } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-lista-tratamientos-seleccionados-trb',
  templateUrl: './lista-tratamientos-seleccionados-trb.component.html',
  styleUrls: ['./lista-tratamientos-seleccionados-trb.component.scss']
})
export class ListaTratamientosSeleccionadosTrbComponent implements OnInit {

  tratamientos: Tratamiento[] = []

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.store.select(getTratamientosSeleccionados).subscribe((value) => {
      this.tratamientos = value;
    })
  }

  onTratamientoDiscardClicked(tratamiento: Tratamiento){
    this.store.dispatch(deleteTratamiento({tratamiento}));
  }

}
