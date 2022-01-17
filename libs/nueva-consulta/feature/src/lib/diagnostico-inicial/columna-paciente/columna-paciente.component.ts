import { Component, OnInit } from '@angular/core';
import { ConsultaService, OpcionesSignosSintomas } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConsultasState, getSignosSintomas } from '../../..';
import { ZonaOpciones } from '../diagnostico-exp-panel/diagnostico-exp-panel.component';

@Component({
  selector: 'consultas-columna-paciente',
  templateUrl: './columna-paciente.component.html',
  styleUrls: ['./columna-paciente.component.scss']
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
        opciones: s.opciones.map(o => Object.assign({}, {diagnostico: o, selected: false})),
        count: 0
      }))
    })

    this.store.select(getSignosSintomas).subscribe((signosSintomas) => {
      // get the ones that belong to each zone

      for(const [i, zona] of this.opciones.entries()){
        const found = signosSintomas.filter(s => s.zona === zona.zona);

        this.opciones[i].count = found.length;
      }
    })
  }

}
