import { Component } from '@angular/core';
import { OpcionesDiagnosticoMedico, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { addTratamiento, ConsultasState, deleteTratamiento, EstigmaPerc, getEstigmas, getTratamientosPorZona } from '@fullstack-angular-nest/nueva-consulta/feature';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'consultas-columna-tratamientos',
  templateUrl: './columna-tratamientos.component.html',
  styleUrls: ['./columna-tratamientos.component.css']
})
export class ColumnaTratamientosComponent {
  categorizacion: 'estigmas' | 'zonas' = 'estigmas'; 
  estigmas!: Observable<EstigmaPerc[]>;
  tratamientosPorZona!: OpcionesDiagnosticoMedico[];

  constructor(private store: Store<ConsultasState>) {
    this.estigmas =  store.pipe(select(getEstigmas));

    store.pipe(select(getTratamientosPorZona)).subscribe((value) => {
      this.tratamientosPorZona = value;
    })
  }

  onTratamientoChecked(tratamiento: Tratamiento, checked: boolean){
    if(checked){
      this.store.dispatch(addTratamiento({tratamiento}))
    }else {
      this.store.dispatch(deleteTratamiento({tratamiento}))
    }
    
  }

}
