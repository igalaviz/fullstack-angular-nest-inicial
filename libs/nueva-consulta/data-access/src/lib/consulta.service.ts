import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface OpcionesSignosSintomas {
  zona: string,
  opciones: string[]
}

export interface OpcionesDiagnosticoMedico {
  zona: string,
  opciones: string[]
}

const signosSintomas: OpcionesSignosSintomas[] = [
  {
    zona: "Cara",
    opciones: []
  },
  {
    zona: "Tercio Superior",
    opciones: []
  },
  {
    zona: "Tercio Medio",
    opciones: []
  }
]

const diagnosticos: OpcionesDiagnosticoMedico[] = [
  {
    zona: "Cara",
    opciones: []
  },
  {
    zona: "Tercio Superior",
    opciones: []
  },
  {
    zona: "Tercio Medio",
    opciones: []
  }
]

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  getOpcionesSignosSintomas() {
    return of(signosSintomas);
  }

  getOpcionesDiagnosticoMedico() {
    return of(diagnosticos);
  }
}
