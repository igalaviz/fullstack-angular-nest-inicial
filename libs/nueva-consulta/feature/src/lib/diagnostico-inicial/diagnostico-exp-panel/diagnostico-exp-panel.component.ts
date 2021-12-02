import { Component, Input } from '@angular/core';

interface OpcionDiagnostico {
  nombre: string,
  nivel: 1 | 2 | 3,
  selected: boolean
}

interface ZonaOpciones {
  zona: string,
  opciones: OpcionDiagnostico[]
}

@Component({
  selector: 'consultas-diagnostico-exp-panel',
  templateUrl: './diagnostico-exp-panel.component.html',
  styleUrls: ['./diagnostico-exp-panel.component.css']
})
export class DiagnosticoExpPanelComponent {
  @Input() enableLevels = true;
  @Input() zonaOpciones: ZonaOpciones = {
    zona: "Cara",
    opciones: [
      {
        nombre: "Asimetría facial",
        nivel: 3,
        selected: false
      }
    ]
  };

  onCheckChanged(index: number, checked: boolean){
    this.zonaOpciones.opciones[index].selected = checked;
  }
}
