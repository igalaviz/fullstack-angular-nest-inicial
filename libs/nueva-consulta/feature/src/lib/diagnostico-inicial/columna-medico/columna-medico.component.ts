import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaService, OpcionesDiagnosticoMedico } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ConsultasState, getDiagnosticoMedico } from '../../..';
import { ZonaOpciones } from '../diagnostico-exp-panel/diagnostico-exp-panel.component';

@Component({
  selector: 'consultas-columna-medico',
  templateUrl: './columna-medico.component.html',
  styleUrls: ['./columna-medico.component.scss']
})
export class ColumnaMedicoComponent implements OnInit, OnDestroy {
  diagnosticos$!: Observable<OpcionesDiagnosticoMedico[]>;
  opciones: ZonaOpciones[] = [];

  subscriptions: Subscription[] = [];

  constructor(private consultaService: ConsultaService, private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.diagnosticos$ = this.consultaService.getOpcionesDiagnosticoMedico();
    const servDiagnosticosSub = this.diagnosticos$.subscribe(value => {
      this.opciones = value.map(s => Object.assign({}, {
        zona: s.zona, 
        opciones: s.opciones.map(o => Object.assign({}, {diagnostico: o, selected: false})),
        count: 0
      }))
    })
    this.subscriptions.push(servDiagnosticosSub);

    const storeDiagnosticosSub = this.store.select(getDiagnosticoMedico).subscribe((diagnosticoMedico) => {
      // get the ones that belong to each zone

      for(const [i, zona] of this.opciones.entries()){
        const found = diagnosticoMedico.filter(s => s.zona === zona.zona);

        this.opciones[i].count = found.length;
      }
    })
    this.subscriptions.push(storeDiagnosticosSub);

  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

}
