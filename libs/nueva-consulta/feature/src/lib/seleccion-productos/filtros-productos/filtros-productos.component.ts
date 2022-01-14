import { Component, OnInit } from '@angular/core';
import { ConsultaService, Funcion, Laboratorio } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { setFiltrosProductos } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getFiltrosProductos } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-filtros-productos',
  templateUrl: './filtros-productos.component.html',
  styleUrls: ['./filtros-productos.component.scss']
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

    this.store.select(getFiltrosProductos).subscribe(filtros => {
      const idLab = filtros.idLaboratorio;
      const idFuncion = filtros.idFuncion;

      if(idLab !== ''){
        this.laboratorioSeleccionado = this.laboratorios.find(l => l.id === idLab);
      }else{
        this.laboratorioSeleccionado = undefined; 
      }

      if(idFuncion !== ''){
        this.funcionSeleccionada = this.funciones.find(f => f.id === idFuncion);
      }else{
        this.funcionSeleccionada = undefined;
      }
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

  isLabAvailable(labId: string){
    if(this.funcionSeleccionada && this.funcionSeleccionada.laboratoriosDisponibles.findIndex(l => l === labId) !== -1){
      return true;
    }else{
      return false;
    }
  }

  isFuncionAvailable(funcionId: string){
    if(this.laboratorioSeleccionado && this.laboratorioSeleccionado.funcionesDisponibles.findIndex(f => f === funcionId) !== -1){
      return true;
    }else{
      return false;
    }
  }
}
