import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { OpcionesDiagnosticoMedico, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { EstigmaPerc } from '@fullstack-angular-nest/nueva-consulta/feature';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getUsarRecomendacion } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-exp-panel-tratamientos-recomendados',
  templateUrl: './exp-panel-tratamientos-recomendados.component.html',
  styleUrls: ['./exp-panel-tratamientos-recomendados.component.css']
})
export class ExpPanelTratamientosRecomendadosComponent implements OnInit, OnDestroy{
  
  @Input() categorizacion: 'estigmas' | 'zonas' = 'estigmas'
  @Input() estigma!: EstigmaPerc;
  @Input() tratamientosPorZona!: OpcionesDiagnosticoMedico;
  @Output() tratamientoCheck = new EventEmitter<{tratamiento: Tratamiento, checked: boolean}>();

  allowCheck = false;

  subscriptions: Subscription[] = []

  constructor(private store: Store<ConsultasState>){}

  ngOnInit(): void {
    this.store.pipe(select(getUsarRecomendacion)).subscribe((value) => {
      this.allowCheck = value;
    });
  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

  onTratamientoChecked(tratamiento: Tratamiento, checked: boolean){
    this.tratamientoCheck.emit({tratamiento, checked});
  }

}
