import { Component, Input } from '@angular/core';
import { SignoSintoma, DiagnosticoMedico } from '@fullstack-angular-nest/nueva-consulta/data-access'
import { Store } from '@ngrx/store';
import { ConsultasState } from '../../..';

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

  constructor(private store: Store<ConsultasState>){
    
  }

  onCheckChanged(index: number, checked: boolean){
    this.zonaOpciones.opciones[index].selected = checked;
    console.log(this.zonaOpciones.opciones[index].selected);
  }

  onLevelChanged(index: number, level: number){
    this.zonaOpciones.opciones[index].diagnostico.nivel = level;
    console.log(level, this.zonaOpciones.opciones[index].diagnostico.nivel);
  }
}
