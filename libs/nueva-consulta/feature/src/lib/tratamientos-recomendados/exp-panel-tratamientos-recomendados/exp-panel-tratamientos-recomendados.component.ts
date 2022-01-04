import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OpcionesDiagnosticoMedico, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { EstigmaPerc } from '@fullstack-angular-nest/nueva-consulta/feature';
import { select, Store } from '@ngrx/store';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getUsarRecomendacion } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-exp-panel-tratamientos-recomendados',
  templateUrl: './exp-panel-tratamientos-recomendados.component.html',
  styleUrls: ['./exp-panel-tratamientos-recomendados.component.css']
})
export class ExpPanelTratamientosRecomendadosComponent implements OnInit{
  
  @Input() categorizacion: 'estigmas' | 'zonas' = 'estigmas'
  @Input() estigma!: EstigmaPerc;
  @Input() tratamientosPorZona!: OpcionesDiagnosticoMedico;
  @Output() tratamientoCheck = new EventEmitter<{tratamiento: Tratamiento, checked: boolean}>();

  allowCheck = false;

  constructor(private store: Store<ConsultasState>){}

  ngOnInit(): void {
    this.store.pipe(select(getUsarRecomendacion)).subscribe((value) => {
      this.allowCheck = value;
    });
  }

  onTratamientoChecked(tratamiento: Tratamiento, checked: boolean){
    this.tratamientoCheck.emit({tratamiento, checked});
  }

}
