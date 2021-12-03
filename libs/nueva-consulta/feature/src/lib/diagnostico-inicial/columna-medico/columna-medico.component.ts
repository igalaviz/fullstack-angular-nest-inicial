import { Component, OnInit } from '@angular/core';
import { ConsultaService, OpcionesDiagnosticoMedico } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Observable } from 'rxjs';
import { ZonaOpciones } from '../diagnostico-exp-panel/diagnostico-exp-panel.component';

@Component({
  selector: 'consultas-columna-medico',
  templateUrl: './columna-medico.component.html',
  styleUrls: ['./columna-medico.component.css']
})
export class ColumnaMedicoComponent implements OnInit {
  diagnosticos$!: Observable<OpcionesDiagnosticoMedico[]>;
  opciones: ZonaOpciones[] = [];

  constructor(private consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.diagnosticos$ = this.consultaService.getOpcionesDiagnosticoMedico();
    this.diagnosticos$.subscribe(value => {
      this.opciones = value.map(s => Object.assign({}, {
        zona: s.zona, 
        opciones: s.opciones.map(o => Object.assign({}, {nombre: o.nombre, nivel: o.nivel, selected: false}))
      }))
    })
  }

}
