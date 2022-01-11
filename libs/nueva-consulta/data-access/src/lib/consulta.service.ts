import { Injectable } from '@angular/core';
import { OpcionDiagnostico } from 'libs/nueva-consulta/feature/src/lib/diagnostico-inicial/diagnostico-exp-panel/diagnostico-exp-panel.component';
import { Observable, of } from 'rxjs';
import { Aplicador, DiagnosticoMedico, EstigmaPerc, Funcion, Laboratorio, Lote, ProductoConsulta, SignoSintoma } from '..';
import { OpcionesDiagnosticoMedico, OpcionesSignosSintomas, Agujas, Canulas, Area } from './consulta.models';

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
    tratamientos: [],  // it has to be empty so later on it gets filled with whatever the user chooses,
    aplicaciones: [],
    proximaAplicacion: "",
    aplicador: undefined,
    lote: undefined,
    aplicado: false
  },
  {
    producto: {
      id: "x",
      nombre: "XEOMEEN",
      laboratorio: {
        id: "m",
        nombre: "Merz",
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
    tratamientos: [],  // it has to be empty so later on it gets filled with whatever the user chooses,
    aplicaciones: [],
    proximaAplicacion: "",
    aplicador: undefined,
    lote: undefined,
    aplicado: false
  },
  {
    producto: {
      id: "bi",
      nombre: "BELOTERO Intense",
      laboratorio: {
        id: "m",
        nombre: "Merz",
        funcionesDisponibles: []
      },
      funcion: {
        id: "r",
        nombre: "Relleno",
        laboratoriosDisponibles: []
      },
    },
    selected: false,
    disponibleEnInventario: true,
    tratamientos: [],  // it has to be empty so later on it gets filled with whatever the user chooses,
    aplicaciones: [],
    proximaAplicacion: "",
    aplicador: undefined,
    lote: undefined,
    aplicado: false
  },
  {
    producto: {
      id: "x",
      nombre: "XEOMEEN",
      laboratorio: {
        id: "m",
        nombre: "Merz",
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
    tratamientos: [],  // it has to be empty so later on it gets filled with whatever the user chooses,
    aplicaciones: [],
    proximaAplicacion: "",
    aplicador: undefined,
    lote: undefined,
    aplicado: false
  },
  {
    producto: {
      id: "x",
      nombre: "XEOMEEN",
      laboratorio: {
        id: "m",
        nombre: "Merz",
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
    tratamientos: [],  // it has to be empty so later on it gets filled with whatever the user chooses,
    aplicaciones: [],
    proximaAplicacion: "",
    aplicador: undefined,
    lote: undefined,
    aplicado: false
  },
  {
    producto: {
      id: "x",
      nombre: "XEOMEEN",
      laboratorio: {
        id: "m",
        nombre: "Merz",
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
    tratamientos: [],  // it has to be empty so later on it gets filled with whatever the user chooses,
    aplicaciones: [],
    proximaAplicacion: "",
    aplicador: undefined,
    lote: undefined,
    aplicado: false
  },
  {
    producto: {
      id: "x",
      nombre: "XEOMEEN",
      laboratorio: {
        id: "m",
        nombre: "Merz",
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
    tratamientos: [],  // it has to be empty so later on it gets filled with whatever the user chooses,
    aplicaciones: [],
    proximaAplicacion: "",
    aplicador: undefined,
    lote: undefined,
    aplicado: false
  },
  {
    producto: {
      id: "x",
      nombre: "XEOMEEN",
      laboratorio: {
        id: "m",
        nombre: "Merz",
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
    tratamientos: [],  // it has to be empty so later on it gets filled with whatever the user chooses,
    aplicaciones: [],
    proximaAplicacion: "",
    aplicador: undefined,
    lote: undefined,
    aplicado: false
  },
  {
    producto: {
      id: "x",
      nombre: "XEOMEEN",
      laboratorio: {
        id: "m",
        nombre: "Merz",
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
    tratamientos: [],  // it has to be empty so later on it gets filled with whatever the user chooses,
    aplicaciones: [],
    proximaAplicacion: "",
    aplicador: undefined,
    lote: undefined,
    aplicado: false
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

const tratamientosPorZona: OpcionesDiagnosticoMedico[] = [
  {
    zona: "Cara",
    opciones: [
      {
        id: "a",
        zona: "Cara",
        nombre: "Cara larga",
        nivel: 1,
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
      },
      {
        id: "b",
        zona: "Cara",
        nombre: "Cara en luna llena",
        nivel: 1,
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

const aplicadores: Aplicador[] = [
  {
    categoria: "A",
    nombre: Agujas.AGUJA_27G,
    color: "#828282"
  },
  {
    categoria: "A",
    nombre: Agujas.AGUJA_30G,
    color: "#f2f066"
  },
  {
    categoria: "A",
    nombre: Agujas.AGUJA_32G,
    color: "#64f37e"
  },
  {
    categoria: "C",
    nombre: Canulas.CANULA_18G,
    color: "#ef4fa6"
  },
  {
    categoria: "C",
    nombre: Canulas.CANULA_22G,
    color: "#4d4d4d"
  },
  {
    categoria: "C",
    nombre: Canulas.CANULA_25G,
    color: "#ffaf49"
  },
  {
    categoria: "C",
    nombre: Canulas.CANULA_27G,
    color: "#c9c9c9"
  },
  {
    categoria: "C",
    nombre: Canulas.CANULA_30G,
    color: "#f2f066"
  }
]

const lotes: Lote[] = [
  {
    idProducto: "a",
    numeroDeLote: "abc123"
  }
]

const zonas: Area[] = [
  {
    id: "f1-d",
    nombre: "F1 Derecho"
  },
  {
    id: "f1-i",
    nombre: "F1 Izquierdo"
  },
  {
    id: "f2-d",
    nombre: "F2 Derecho"
  },
  {
    id: "f2-i",
    nombre: "F2 Izquierdo"
  },
  {
    id: "f3",
    nombre: "F3"
  },
  {
    id: "cm2-d",
    nombre: "Cm2 Derecho"
  },
  {
    id: "cm2-d",
    nombre: "Cm2 Derecho"
  },
  {
    id: "g2",
    nombre: "G2"
  },
  {
    id: "l10-d",
    nombre: "L10 Derecho"
  },
  {
    id: "l10-i",
    nombre: "L10 Izquierdo"
  },
  {
    id: "l4",
    nombre: "L4"
  },
  {
    id: "l5",
    nombre: "L5"
  },
  {
    id: "m1-d",
    nombre: "M1 Derecho"
  },
  {
    id: "m1-i",
    nombre: "M1 Izquierdo"
  },
  {
    id: "m2",
    nombre: "M2"
  },
  {
    id: "m3",
    nombre: "M3"
  },
  {
    id: "mr1-d",
    nombre: "Mr1 Derecho"
  },
  {
    id: "mr1-i",
    nombre: "Mr1 Izquierdo"
  },
  {
    id: "mr2-d",
    nombre: "Mr2 Derecho"
  },
  {
    id: "mr2-i",
    nombre: "Mr2 Izquierdo"
  },
  {
    id: "mr3-d",
    nombre: "Mr3 Derecho"
  },
  {
    id: "mr3-i",
    nombre: "Mr3 Izquierdo"
  },
  {
    id: "mx1-i",
    nombre: "Mx1 Izquierdo"
  },
  {
    id: "mx1-d",
    nombre: "Mx1 Derecho"
  },
  {
    id: "mx2-d",
    nombre: "Mx2 Derecho"
  },
  {
    id: "mx2-i",
    nombre: "Mx2 Izquierdo"
  },
  {
    id: "mx3-d",
    nombre: "Mx3 Derecho"
  },
  {
    id: "mx3-i",
    nombre: "Mx3 Izquierdo"
  },
  {
    id: "n3",
    nombre: "N3"
  },
  {
    id: "n4-d",
    nombre: "N4 Derecho"
  },
  {
    id: "n4-i",
    nombre: "N4 Izquierdo"
  },
  {
    id: "n6-d",
    nombre: "N6 Derecho"
  },
  {
    id: "n6-i",
    nombre: "N6 Izquierdo"
  },
  {
    id: "ng1-d",
    nombre: "Ng1 Derecho"
  },
  {
    id: "ng1-i",
    nombre: "Ng1 Izquierdo"
  },
]

const musculos: Area[] = [
  {
    id: "depresor_superciliar_d",
    nombre: "Depresor Superciliar Derecho"
  },
  {
    id: "depresor_superciliar_i",
    nombre: "Depresor Superciliar Izquierdo"
  },
  {
    id: "proserus",
    nombre: "Proserus"
  },
  {
    id: "corrugador_d",
    nombre: "Corrugador (Derecho)"
  },
  {
    id: "corrugador_i",
    nombre: "Corrugador (Izquierdo)"
  },
  {
    id: "depresor_boca_d",
    nombre: "Depresor Ángulo de la Boca (Derecho)"
  },
  {
    id: "depresor_boca_i",
    nombre: "Depresor Ángulo de la Boca (Izquierdo)"
  },
  {
    id: "depresor_septum",
    nombre: "Depresor Septum Nasal"
  },
  {
    id: "frontal",
    nombre: "Frontal"
  },
  {
    id: "masetero_d",
    nombre: "Masetero (Derecho)"
  },
  {
    id: "masetero_i",
    nombre: "Masetero (Izquierdo)"
  },
  {
    id: "mentoneano_d",
    nombre: "Mentoneano (Derecho)"
  },
  {
    id: "mentoneano_i",
    nombre: "Mentoneano (Izquierdo)"
  },
  {
    id: "orbicular_labios_i",
    nombre: "Orbicular de los Labios (Inferior)"
  },
  {
    id: "orbicular_labios_s",
    nombre: "Orbicular de los Labios (Superior)"
  },
  {
    id: "orbicular_ojos_d",
    nombre: "Orbicular de los Ojos (Derecho)"
  },
  {
    id: "orbicular_ojos_i",
    nombre: "Orbicular de los Ojos (Izquierdo)"
  },
  {
    id: "piramidal",
    nombre: "Piramidal"
  },
  {
    id: "platisma_d",
    nombre: "Platisma (Derecho)"
  },
  {
    id: "platisma_i",
    nombre: "Platisma (Izquierdo)"
  },
  {
    id: "proserus",
    nombre: "Proserus"
  },
  {
    id: "risorio_d",
    nombre: "Risorio (Derecho)"
  },
  {
    id: "risorio_i",
    nombre: "Risorio (Izquierdo)"
  },
  {
    id: "t1-d",
    nombre: "T1 Derecho"
  },
  {
    id: "t1-i",
    nombre: "T1 Izquierdo"
  },
  {
    id: "temporal_d",
    nombre: "Temporal (Derecho)"
  },
  {
    id: "temporal_i",
    nombre: "Temporal (Izquierdo)"
  },
  {
    id: "transverso_nasal_d",
    nombre: "Transverso Nasal (Derecho)"
  },
  {
    id: "transverso_nasal_i",
    nombre: "Transverso Nasal (Izquierdo)"
  },
  {
    id: "zigomatico_mayor_d",
    nombre: "Zigomatico Mayor (Derecho)"
  },
  {
    id: "zigomatico_mayor_i",
    nombre: "Zigomatico Mayor (Izquierdo)"
  },
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

  calcularTratamientosPorZona(signosSintomas: SignoSintoma[], diagnosticoMedico: DiagnosticoMedico[]): Observable<OpcionesDiagnosticoMedico[]> {
    return of(tratamientosPorZona);
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
    if(idLaboratorio === '' && idFuncion === ''){
      // return ALL the products
      return of(productos);
    }else if(idLaboratorio === '' && idFuncion !== ''){
      // return the products with the specified function
      return of(productos.filter(producto => producto.producto.funcion.id === idFuncion))
    }else if(idLaboratorio !== '' && idFuncion === ''){
      return of(productos.filter(producto => producto.producto.laboratorio.id === idLaboratorio))
    }else{
      return of(productos.filter(producto => producto.producto.funcion.id === idFuncion && producto.producto.laboratorio.id === idLaboratorio))
    }
    
    
  }

  getAllProducts(): Observable<ProductoConsulta[]>{
    return of(productos);
  }

  getLotesDisponiblesParaProducto(idProducto: string){
    return of(lotes);
  }

  getOpcionesAplicadores(tipo: "A" | "C"): Observable<Aplicador[]>{
    if(tipo === "A"){
      return of(aplicadores.filter(a => a.categoria === "A"))
    }else if (tipo === "C"){
      return of(aplicadores.filter(a => a.categoria === "C"))
    }else {
      return of([])
    }
  }

  getAllZonas(): Observable<Area[]> {
    return of(zonas)
  }

  getAllMusculos(): Observable<Area[]> {
    return of(musculos)
  }
}
