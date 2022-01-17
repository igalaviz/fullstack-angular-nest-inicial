import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Aplicador, Consulta, DiagnosticoMedico, EstigmaPerc, Funcion, Laboratorio, Lote, ProductoConsulta, SignoSintoma } from '..';
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
        clave: "a",
        zona: "Cara",
        nombre: "Cara alargada",
        nivel: 3
      },
      {
        clave: "b",
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
        clave: "a",
        zona: "Cara",
        nombre: "Cara larga",
        nivel: 1
      },
      {
        clave: "b",
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
      clave: "a",
      nombre: "Consunción",
      puntosTotales: 10
    },
    percentage: 33,
    diagnosticos: [
      {
        clave: "a",
        nombre: "Hipotrofia temporal",
        zona: "Cara",
        nivel: 3, 
        tratamientos: [
          {
            clave: "a",
            nombre: "Contorno en F's",
            primario: true,
            selected: false,
            faceAreas: [
              {
                pathId: "a",
                nombre: "f1-d"
              }
            ]
          },
          {
            clave: "b",
            nombre: "Hidratación",
            primario: false,
            selected: false,
            faceAreas: [
              {
                pathId: "b",
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
        clave: "a",
        zona: "Cara",
        nombre: "Cara larga",
        nivel: 1,
        tratamientos: [
          {
            clave: "a",
            nombre: "Contorno en F's",
            primario: true,
            selected: false,
            faceAreas: [
              {
                pathId: "a",
                nombre: "f1-d"
              }
            ]
          },
          {
            clave: "b",
            nombre: "Hidratación",
            primario: false,
            selected: false,
            faceAreas: [
              {
                pathId: "b",
                nombre: "g2"
              }
            ]
          }
        ]
      },
      {
        clave: "b",
        zona: "Cara",
        nombre: "Cara en luna llena",
        nivel: 1,
        tratamientos: [
          {
            clave: "a",
            nombre: "Contorno en F's",
            primario: true,
            selected: false,
            faceAreas: [
              {
                pathId: "a",
                nombre: "f1-d"
              }
            ]
          },
          {
            clave: "b",
            nombre: "Hidratación",
            primario: false,
            selected: false,
            faceAreas: [
              {
                pathId: "b",
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
    pathId: "f1-d",
    nombre: "F1 Derecho"
  },
  {
    pathId: "f1-i",
    nombre: "F1 Izquierdo"
  },
  {
    pathId: "f2-d",
    nombre: "F2 Derecho"
  },
  {
    pathId: "f2-i",
    nombre: "F2 Izquierdo"
  },
  {
    pathId: "f3",
    nombre: "F3"
  },
  {
    pathId: "cm2-d",
    nombre: "Cm2 Derecho"
  },
  {
    pathId: "cm2-i",
    nombre: "Cm2 Izquierdo"
  },
  {
    pathId: "g2",
    nombre: "G2"
  },
  {
    pathId: "l10-d",
    nombre: "L10 Derecho"
  },
  {
    pathId: "l10-i",
    nombre: "L10 Izquierdo"
  },
  {
    pathId: "l4",
    nombre: "L4"
  },
  {
    pathId: "l5",
    nombre: "L5"
  },
  {
    pathId: "m1-d",
    nombre: "M1 Derecho"
  },
  {
    pathId: "m1-i",
    nombre: "M1 Izquierdo"
  },
  {
    pathId: "m2",
    nombre: "M2"
  },
  {
    pathId: "m3",
    nombre: "M3"
  },
  {
    pathId: "mr1-d",
    nombre: "Mr1 Derecho"
  },
  {
    pathId: "mr1-i",
    nombre: "Mr1 Izquierdo"
  },
  {
    pathId: "mr2-d",
    nombre: "Mr2 Derecho"
  },
  {
    pathId: "mr2-i",
    nombre: "Mr2 Izquierdo"
  },
  {
    pathId: "mr3-d",
    nombre: "Mr3 Derecho"
  },
  {
    pathId: "mr3-i",
    nombre: "Mr3 Izquierdo"
  },
  {
    pathId: "mx1-i",
    nombre: "Mx1 Izquierdo"
  },
  {
    pathId: "mx1-d",
    nombre: "Mx1 Derecho"
  },
  {
    pathId: "mx2-d",
    nombre: "Mx2 Derecho"
  },
  {
    pathId: "mx2-i",
    nombre: "Mx2 Izquierdo"
  },
  {
    pathId: "mx3-d",
    nombre: "Mx3 Derecho"
  },
  {
    pathId: "mx3-i",
    nombre: "Mx3 Izquierdo"
  },
  {
    pathId: "n3",
    nombre: "N3"
  },
  {
    pathId: "n4-d",
    nombre: "N4 Derecho"
  },
  {
    pathId: "n4-i",
    nombre: "N4 Izquierdo"
  },
  {
    pathId: "n6-d",
    nombre: "N6 Derecho"
  },
  {
    pathId: "n6-i",
    nombre: "N6 Izquierdo"
  },
  {
    pathId: "ng1-d",
    nombre: "Ng1 Derecho"
  },
  {
    pathId: "ng1-i",
    nombre: "Ng1 Izquierdo"
  },
]

const musculos: Area[] = [
  {
    pathId: "depresor_superciliar_d",
    nombre: "Depresor Superciliar Derecho"
  },
  {
    pathId: "depresor_superciliar_i",
    nombre: "Depresor Superciliar Izquierdo"
  },
  {
    pathId: "proserus",
    nombre: "Proserus"
  },
  {
    pathId: "corrugador_d",
    nombre: "Corrugador (Derecho)"
  },
  {
    pathId: "corrugador_i",
    nombre: "Corrugador (Izquierdo)"
  },
  {
    pathId: "depresor_boca_d",
    nombre: "Depresor Ángulo de la Boca (Derecho)"
  },
  {
    pathId: "depresor_boca_i",
    nombre: "Depresor Ángulo de la Boca (Izquierdo)"
  },
  {
    pathId: "depresor_septum",
    nombre: "Depresor Septum Nasal"
  },
  {
    pathId: "frontal",
    nombre: "Frontal"
  },
  {
    pathId: "masetero_d",
    nombre: "Masetero (Derecho)"
  },
  {
    pathId: "masetero_i",
    nombre: "Masetero (Izquierdo)"
  },
  {
    pathId: "mentoneano_d",
    nombre: "Mentoneano (Derecho)"
  },
  {
    pathId: "mentoneano_i",
    nombre: "Mentoneano (Izquierdo)"
  },
  {
    pathId: "orbicular_labios_i",
    nombre: "Orbicular de los Labios (Inferior)"
  },
  {
    pathId: "orbicular_labios_s",
    nombre: "Orbicular de los Labios (Superior)"
  },
  {
    pathId: "orbicular_ojos_d",
    nombre: "Orbicular de los Ojos (Derecho)"
  },
  {
    pathId: "orbicular_ojos_i",
    nombre: "Orbicular de los Ojos (Izquierdo)"
  },
  {
    pathId: "piramidal",
    nombre: "Piramidal"
  },
  {
    pathId: "platisma_d",
    nombre: "Platisma (Derecho)"
  },
  {
    pathId: "platisma_i",
    nombre: "Platisma (Izquierdo)"
  },
  {
    pathId: "proserus",
    nombre: "Proserus"
  },
  {
    pathId: "risorio_d",
    nombre: "Risorio (Derecho)"
  },
  {
    pathId: "risorio_i",
    nombre: "Risorio (Izquierdo)"
  },
  {
    pathId: "t1-d",
    nombre: "T1 Derecho"
  },
  {
    pathId: "t1-i",
    nombre: "T1 Izquierdo"
  },
  {
    pathId: "temporal_d",
    nombre: "Temporal (Derecho)"
  },
  {
    pathId: "temporal_i",
    nombre: "Temporal (Izquierdo)"
  },
  {
    pathId: "transverso_nasal_d",
    nombre: "Transverso Nasal (Derecho)"
  },
  {
    pathId: "transverso_nasal_i",
    nombre: "Transverso Nasal (Izquierdo)"
  },
  {
    pathId: "zigomatico_mayor_d",
    nombre: "Zigomatico Mayor (Derecho)"
  },
  {
    pathId: "zigomatico_mayor_i",
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
    return of(productos.slice(0, 2))
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

  guardarDatosConsulta(consulta: Consulta){
    console.log(consulta);
  }
}
