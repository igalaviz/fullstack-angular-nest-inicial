import { Injectable } from '@angular/core';
import { of } from 'rxjs';

interface SignoSintoma {
  id: string,
  nombre: string,
  nivel: number
}

interface DiagnosticoMedico {
  id: string,
  nombre: string,
  nivel: number
}

export interface OpcionesSignosSintomas {
  zona: string,
  opciones: SignoSintoma[]
}

export interface OpcionesDiagnosticoMedico {
  zona: string,
  opciones: DiagnosticoMedico[]
}

const signosSintomas: OpcionesSignosSintomas[] = [
  {
    zona: "Cara",
    opciones: [
      {
        id: "a",
        nombre: "Cara alargada",
        nivel: 3
      },
      {
        id: "b",
        nombre: "Cara redonda",
        nivel: 3
      }
    ]
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
    opciones: [
      {
        id: "a",
        nombre: "Cara larga",
        nivel: 1
      },
      {
        id: "b",
        nombre: "Cara en luna llena",
        nivel: 1
      }
    ]
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
