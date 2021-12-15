import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { ConsultasState } from '../..';

@Component({
  selector: 'consultas-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss']
})
export class TrabajoComponent implements OnInit {
  productoEnUso?: ProductoConsulta;

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
  }

}
