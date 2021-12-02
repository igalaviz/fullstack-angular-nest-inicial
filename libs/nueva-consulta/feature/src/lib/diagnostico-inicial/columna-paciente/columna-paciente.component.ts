import { Component, OnInit } from '@angular/core';
import { ConsultaService, OpcionesSignosSintomas } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'consultas-columna-paciente',
  templateUrl: './columna-paciente.component.html',
  styleUrls: ['./columna-paciente.component.css']
})
export class ColumnaPacienteComponent implements OnInit {
  signosSintomas$!: Observable<OpcionesSignosSintomas[]>;

  constructor(private consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.signosSintomas$ = this.consultaService.getOpcionesSignosSintomas();
  }

}
