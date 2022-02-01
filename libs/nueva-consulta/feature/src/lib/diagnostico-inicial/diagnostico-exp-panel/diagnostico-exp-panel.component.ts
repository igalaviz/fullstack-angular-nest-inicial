import { Component, Input } from '@angular/core';
import { OpcionDiagnostico } from '../list-diagnosticos/list-diagnosticos.component';

export interface ZonaOpciones {
  zona: string,
  opciones: OpcionDiagnostico[],
  count: number
}

@Component({
  selector: 'consultas-diagnostico-exp-panel',
  templateUrl: './diagnostico-exp-panel.component.html',
  styleUrls: ['./diagnostico-exp-panel.component.scss']
})
export class DiagnosticoExpPanelComponent{
  @Input() enableLevels = false;
  @Input() zonaOpciones: ZonaOpciones = {
    zona: "Cara",
    opciones: [
      {
        diagnostico: {
          clave: "a",
          zona: "Cara",
          nombre: "Asimetría facial",
          nivel: 3,
        },
        selected: false
      }
    ],
    count: 0
  };
}
