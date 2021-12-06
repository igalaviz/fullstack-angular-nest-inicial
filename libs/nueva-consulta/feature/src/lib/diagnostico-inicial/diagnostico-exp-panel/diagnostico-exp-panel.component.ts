import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SignoSintoma, DiagnosticoMedico } from '@fullstack-angular-nest/nueva-consulta/data-access'


export interface OpcionDiagnostico {
  diagnostico: SignoSintoma | DiagnosticoMedico
  selected: boolean
}

export interface ZonaOpciones {
  zona: string,
  opciones: OpcionDiagnostico[]
}

@Component({
  selector: 'consultas-diagnostico-exp-panel',
  templateUrl: './diagnostico-exp-panel.component.html',
  styleUrls: ['./diagnostico-exp-panel.component.css']
})
export class DiagnosticoExpPanelComponent {
  @Input() enableLevels = false;
  @Input() zonaOpciones: ZonaOpciones = {
    zona: "Cara",
    opciones: [
      {
        diagnostico: {
          id: "a",
          zona: "Cara",
          nombre: "Asimetría facial",
          nivel: 3,
        },
        selected: false
      }
    ]
  };
  @Output() checkChange = new EventEmitter<OpcionDiagnostico>();
  @Output() levelChange = new EventEmitter<OpcionDiagnostico>();

  count = 0;

  onCheckChanged(index: number, checked: boolean){
    this.zonaOpciones.opciones[index].selected = checked;
    this.checkChange.emit(this.zonaOpciones.opciones[index])
    if(checked){
      this.count++;
    }else{
      this.count--;
    }
  }

  onLevelChanged(index: number, level: number){
    this.zonaOpciones.opciones[index].diagnostico = Object.assign({}, {...this.zonaOpciones.opciones[index].diagnostico, nivel: level})
    this.levelChange.emit(this.zonaOpciones.opciones[index])
  }
}
