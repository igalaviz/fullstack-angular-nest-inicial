import { Component, OnInit } from '@angular/core';
import { ConsultaService, Funcion, Laboratorio } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { setFiltrosProductos } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';

@Component({
  selector: 'consultas-filtros-productos',
  templateUrl: './filtros-productos.component.html',
  styleUrls: ['./filtros-productos.component.css']
})
export class FiltrosProductosComponent implements OnInit {
  laboratorios: Laboratorio[] = [];
  funciones: Funcion[] = [];

  laboratorioSeleccionado?: Laboratorio;
  funcionSeleccionada?: Funcion;

  constructor(private consultasService: ConsultaService, private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.consultasService.getLaboratorios().subscribe((labs) => {
      this.laboratorios = labs;
    })

    this.consultasService.getFunciones().subscribe((funciones) => {
      this.funciones = funciones;
    })
  }

  onLaboratorioChanged(laboratorio: Laboratorio) {
    if(laboratorio.id === this.laboratorioSeleccionado?.id){
      this.laboratorioSeleccionado = undefined;
    }else {
      this.laboratorioSeleccionado = laboratorio;
    }
    this.store.dispatch(setFiltrosProductos({filtros: {idLaboratorio: this.laboratorioSeleccionado ? this.laboratorioSeleccionado.id : '', idFuncion: this.funcionSeleccionada ? this.funcionSeleccionada.id : ''}}))
  }

  onFuncionChanged(funcion: Funcion) {
    if(funcion.id === this.funcionSeleccionada?.id){
      this.funcionSeleccionada = undefined;
    }else {
      this.funcionSeleccionada = funcion;
    }
    this.store.dispatch(setFiltrosProductos({filtros: {idLaboratorio: this.laboratorioSeleccionado ? this.laboratorioSeleccionado.id : '', idFuncion: this.funcionSeleccionada ? this.funcionSeleccionada.id : ''}}))
  }

}
