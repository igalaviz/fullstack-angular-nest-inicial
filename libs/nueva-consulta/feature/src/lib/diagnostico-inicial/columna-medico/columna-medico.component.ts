import { Component, OnInit } from '@angular/core';
import { ConsultaService, OpcionesDiagnosticoMedico } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addDiagnosticoMedico, ConsultasState, deleteDiagnosticoMedico, updateDiagnosticoMedico } from '../../..';
import { OpcionDiagnostico, ZonaOpciones } from '../diagnostico-exp-panel/diagnostico-exp-panel.component';

@Component({
  selector: 'consultas-columna-medico',
  templateUrl: './columna-medico.component.html',
  styleUrls: ['./columna-medico.component.css']
})
export class ColumnaMedicoComponent implements OnInit {
  diagnosticos$!: Observable<OpcionesDiagnosticoMedico[]>;
  opciones: ZonaOpciones[] = [];

  constructor(private consultaService: ConsultaService, private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.diagnosticos$ = this.consultaService.getOpcionesDiagnosticoMedico();
    this.diagnosticos$.subscribe(value => {
      this.opciones = value.map(s => Object.assign({}, {
        zona: s.zona, 
        opciones: s.opciones.map(o => Object.assign({}, {diagnostico: o, selected: false}))
      }))
    })
  }

  onCheckChanged(opcion: OpcionDiagnostico){
    if(opcion.selected){
      this.store.dispatch(addDiagnosticoMedico({diagnosticoMedico: opcion.diagnostico}));
    }else {
      this.store.dispatch(deleteDiagnosticoMedico({diagnosticoMedico: opcion.diagnostico}))
    }
  }

  onLevelChanged(opcion: OpcionDiagnostico){
    this.store.dispatch(updateDiagnosticoMedico({diagnosticoMedico: opcion.diagnostico}))
  }
}
