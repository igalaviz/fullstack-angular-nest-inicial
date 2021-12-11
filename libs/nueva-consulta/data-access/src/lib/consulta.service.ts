import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DiagnosticoMedico, EstigmaPerc, Funcion, Laboratorio, ProductoConsulta, SignoSintoma } from '..';
import {  OpcionesDiagnosticoMedico, OpcionesSignosSintomas } from './consulta.models';

const laboratorios: Laboratorio[] = [
  {
    id: "a",
    nombre: "Allergan",
    funcionesDisponibles: ["t", "r"]
  },
  {
    id: "m",
    nombre: "Merz",
    funcionesDisponibles: ["t", "r"]
  },
  {
    id: "g",
    nombre: "Galderma",
    funcionesDisponibles: ["t", "r"]
  }
]

const funciones: Funcion[] = [
  {
    id: "t",
    nombre: "Toxina",
    laboratoriosDisponibles: ["a", "m", "g"]
  },
  {
    id: "r",
    nombre: "Relleno",
    laboratoriosDisponibles: ["a", "m", "g"]
  }
]

const productos: ProductoConsulta[] = [
  {
    producto: {
      id: "b",
      nombre: "Botox",
      laboratorio: {
        id: "a",
        nombre: "Allergan",
        funcionesDisponibles: []
      },
      funcion: {
        id: "t",
        nombre: "Toxina",
        laboratoriosDisponibles: []
      },
    },
    selected: false,
    disponibleEnInventario: true,
    tratamientos: []  // it has to be empty so later on it gets filled with whatever the user chooses
  }
] 

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
            selected: false,
            faceAreas: [
              {
                id: "a",
                nombre: "f1-d"
              }
            ]
          },
          {
            id: "b",
            nombre: "Hidratación",
            primario: false,
            selected: false,
            faceAreas: [
              {
                id: "b",
                nombre: "g2"
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

  getProductosRecomendadosParaTratamiento(idTratamiento: string): Observable<ProductoConsulta[]>{
    return of(productos);
  }

  getLaboratorios(): Observable<Laboratorio[]>{
    return of(laboratorios);
  }

  getFunciones(): Observable<Funcion[]> {
    return of(funciones);
  }

  getProductosByLabAndFuncion(idLaboratorio: string, idFuncion: string) {
    return of(productos);
  }
}
