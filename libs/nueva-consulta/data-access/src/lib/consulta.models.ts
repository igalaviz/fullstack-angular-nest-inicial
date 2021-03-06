// area de la cara (músculo/zona)
export interface Area {
  pathId: string;  // id del SVG path
  nombre: string;
}

export interface SelectableFaceArea {
  area: Area;
  selected: boolean;
}

export interface Estigma {
  clave: string;
  nombre: string;
  puntosTotales: number;
}

export interface EstigmaPerc {
  estigma: Estigma;
  percentage: number;
  diagnosticos: DiagnosticoMedico[];
}

export interface Tratamiento {
  clave: string;
  nombre: string;
  primario: boolean;
  faceAreas: Area[];
  selected?: boolean;
}

export interface SignoSintoma {
  clave: string;
  zona: string;
  nombre: string;
  nivel: number;
  estigma?: Estigma;
  tratamientos?: Tratamiento[];
}

export interface DiagnosticoMedico {
  clave: string;
  zona: string;
  nombre: string;
  nivel: number;
  estigma?: Estigma;
  tratamientos?: Tratamiento[];
}

export interface OpcionesSignosSintomas {
  zona: string;
  opciones: SignoSintoma[];
}

export interface OpcionesDiagnosticoMedico {
  zona: string;
  opciones: DiagnosticoMedico[];
}

export interface Consulta {
  id: string;
  idPaciente: string;
  fecha: string;
  comentarios: string;
  diagnosticoPacienteSeleccionados: SignoSintoma[];
  diagnosticoMedicoSeleccionados: DiagnosticoMedico[];
  fotos: File[];
  productosSeleccionados: ProductoConsulta[];
  tratamientosSeleccionados: Tratamiento[];
  usarRecomendacion: boolean;
}

export interface Laboratorio {
  id: string;
  nombre: string;
  funcionesDisponibles: string[]; // los ids de las funciones disponibles
}

export interface Funcion {
  id: string;
  nombre: string;
  laboratoriosDisponibles: string[]; // los ids de los laboratorios disponibles
}

export interface Producto {
  id: string;
  nombre: string;
  laboratorio: Laboratorio;
  funcion: Funcion;
}

export interface FiltrosProductosConsulta {
  idLaboratorio: string;
  idFuncion: string;
}

export interface AplicacionProducto {
  idProducto: string;
  area: Area;
  cantidad: number;
}

export enum Agujas {
  AGUJA_27G = '27G',
  AGUJA_30G = '30G',
  AGUJA_32G = '32G',
}

export enum Canulas {
  CANULA_18G = '18G',
  CANULA_22G = '22G',
  CANULA_25G = '25G',
  CANULA_27G = '27G',
  CANULA_30G = '30G',
}

export interface Aplicador {
  categoria: 'A' | 'C';
  nombre: Agujas | Canulas;
  color: string;
}

// no sé exactamente que campos deben ir aquí
export interface Lote {
  idProducto: string;
  numeroDeLote: string;
}

export interface ProductoConsulta {
  producto: Producto;
  disponibleEnInventario: boolean;
  selected: boolean;
  tratamientos?: Tratamiento[];
  aplicaciones: AplicacionProducto[];
  proximaAplicacion: string;
  aplicador?: Aplicador;
  lote?: Lote;
  aplicado: boolean;
}
