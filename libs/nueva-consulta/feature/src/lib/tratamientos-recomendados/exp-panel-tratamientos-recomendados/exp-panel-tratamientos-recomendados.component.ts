import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OpcionesDiagnosticoMedico, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { EstigmaPerc } from '@fullstack-angular-nest/nueva-consulta/feature';

@Component({
  selector: 'consultas-exp-panel-tratamientos-recomendados',
  templateUrl: './exp-panel-tratamientos-recomendados.component.html',
  styleUrls: ['./exp-panel-tratamientos-recomendados.component.css']
})
export class ExpPanelTratamientosRecomendadosComponent {
  @Input() categorizacion: 'estigmas' | 'zonas' = 'estigmas'
  @Input() estigma!: EstigmaPerc;
  @Input() tratamientosPorZona!: OpcionesDiagnosticoMedico;
  @Output() tratamientoCheck = new EventEmitter<{tratamiento: Tratamiento, checked: boolean}>();

  onTratamientoChecked(tratamiento: Tratamiento, checked: boolean){
    this.tratamientoCheck.emit({tratamiento, checked});
  }

}
