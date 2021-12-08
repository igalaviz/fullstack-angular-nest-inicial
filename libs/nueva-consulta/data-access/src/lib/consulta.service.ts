import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DiagnosticoMedico, EstigmaPerc, SignoSintoma } from '..';
import {  OpcionesDiagnosticoMedico, OpcionesSignosSintomas } from './consulta.models';

const signosSintomas: OpcionesSignosSintomas[] = [
  {
    zona: "Cara",
    opciones: [
      {
        id: "a",
        zona: "Cara",
        nombre: "Cara alargada",
        nivel: 3
      },
      {
        id: "b",
        zona: "Cara",
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
        zona: "Cara",
        nombre: "Cara larga",
        nivel: 1
      },
      {
        id: "b",
        zona: "Cara",
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

const estigmas =  [
  {
    estigma: {
      id: "a",
      nombre: "Consunción",
      puntosTotales: 10
    },
    percentage: 33,
    diagnosticos: [
      {
        id: "a",
        nombre: "Hipotrofia temporal",
        zona: "Cara",
        nivel: 3, 
        tratamientos: [
          {
            id: "a",
            nombre: "Contorno en F's",
            primario: true,
            faceAreas: [
              {
                id: "a",
                nombre: ""
              }
            ]
          }
        ]
      }
    ]
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

  calcularEstigmas(signosSintomas: SignoSintoma[], diagnosticoMedico: DiagnosticoMedico[]): Observable<EstigmaPerc[]> {
    return of(estigmas);
  }
}
