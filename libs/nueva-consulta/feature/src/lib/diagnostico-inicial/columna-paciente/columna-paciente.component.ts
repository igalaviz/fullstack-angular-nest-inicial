import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaService, OpcionesSignosSintomas } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ConsultasState, getSignosSintomas } from '../../..';
import { ZonaOpciones } from '../diagnostico-exp-panel/diagnostico-exp-panel.component';

@Component({
  selector: 'consultas-columna-paciente',
  templateUrl: './columna-paciente.component.html',
  styleUrls: ['./columna-paciente.component.scss']
})
export class ColumnaPacienteComponent implements OnInit, OnDestroy {
  signosSintomas$!: Observable<OpcionesSignosSintomas[]>;
  opciones: ZonaOpciones[] = [];

  subscriptions: Subscription[] = [];

  constructor(private consultaService: ConsultaService, private store: Store<ConsultasState>) {

  }

  ngOnInit(): void {
    this.signosSintomas$ = this.consultaService.getOpcionesSignosSintomas();
    const servSignosSub = this.signosSintomas$.subscribe(value => {
      this.opciones = value.map(s => Object.assign({}, {
        zona: s.zona, 
        opciones: s.opciones.map(o => Object.assign({}, {diagnostico: o, selected: false})),
        count: 0
      }))
    })
    this.subscriptions.push(servSignosSub);

    const storeSignosSub = this.store.select(getSignosSintomas).subscribe((signosSintomas) => {
      // get the ones that belong to each zone

      for(const [i, zona] of this.opciones.entries()){
        const found = signosSintomas.filter(s => s.zona === zona.zona);

        this.opciones[i].count = found.length;
      }
    })
    this.subscriptions.push(storeSignosSub);

  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

}
