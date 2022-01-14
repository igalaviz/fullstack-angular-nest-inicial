import { Component, OnInit } from '@angular/core';
import { ConsultaService, OpcionesDiagnosticoMedico } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addDiagnosticoMedico, ConsultasState, deleteDiagnosticoMedico, getDiagnosticoMedico, updateDiagnosticoMedico } from '../../..';
import { ZonaOpciones } from '../diagnostico-exp-panel/diagnostico-exp-panel.component';
import { OpcionDiagnostico } from '../list-diagnosticos/list-diagnosticos.component';

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
        opciones: s.opciones.map(o => Object.assign({}, {diagnostico: o, selected: false})),
        count: 0
      }))
    })

    this.store.select(getDiagnosticoMedico).subscribe((diagnosticoMedico) => {
      // get the ones that belong to each zone

      for(const [i, zona] of this.opciones.entries()){
        const found = diagnosticoMedico.filter(s => s.zona === zona.zona);

        this.opciones[i].count = found.length;
      }
    })
  }

}
