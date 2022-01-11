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
  }
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
