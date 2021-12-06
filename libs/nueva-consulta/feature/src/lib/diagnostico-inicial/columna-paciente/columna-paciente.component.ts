import { Component, OnInit } from '@angular/core';
import { ConsultaService, OpcionesSignosSintomas } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { SignoSintoma } from '@fullstack-angular-nest/nueva-consulta/data-access'
import { Observable } from 'rxjs';
import { addSignoSintoma, ConsultasState, deleteSignoSintoma, updateSignoSintoma } from '../../..';
import { OpcionDiagnostico, ZonaOpciones } from '../diagnostico-exp-panel/diagnostico-exp-panel.component';

@Component({
  selector: 'consultas-columna-paciente',
  templateUrl: './columna-paciente.component.html',
  styleUrls: ['./columna-paciente.component.css']
})
export class ColumnaPacienteComponent implements OnInit {
  signosSintomas$!: Observable<OpcionesSignosSintomas[]>;
  opciones: ZonaOpciones[] = [];

  constructor(private consultaService: ConsultaService, private store: Store<ConsultasState>) {

  }

  ngOnInit(): void {
    this.signosSintomas$ = this.consultaService.getOpcionesSignosSintomas();
    this.signosSintomas$.subscribe(value => {
      this.opciones = value.map(s => Object.assign({}, {
        zona: s.zona, 
        opciones: s.opciones.map(o => Object.assign({}, {diagnostico: o, selected: false}))
      }))
    })
  }

  onCheckChanged(opcion: OpcionDiagnostico){
    if(opcion.selected){
      this.store.dispatch(addSignoSintoma({signoSintoma: opcion.diagnostico}))
    }else{
      this.store.dispatch(deleteSignoSintoma({signoSintoma: opcion.diagnostico}))
    }
  }

}
