// area de la cara (músculo/zona)
export interface Area {
    id: string,
    nombre: string
}

export interface Estigma {
    id: string,
    nombre: string,
    puntosTotales: number,
}

export interface EstigmaPerc {
    estigma: Estigma,
    percentage: number,
    diagnosticos: DiagnosticoMedico[]
}

export interface Tratamiento {
    id: string,
    nombre: string,
    primario: boolean,
    faceAreas: Area[],
    selected?: boolean
}

export interface SignoSintoma {
    id: string,
    zona: string,
    nombre: string,
    nivel: number,
    estigma?: Estigma,
    tratamientos?: Tratamiento[]
  }
  
  export interface DiagnosticoMedico {
    id: string,
    zona: string,
    nombre: string,
    nivel: number,
    estigma?: Estigma,
    tratamientos?: Tratamiento[]
  }
  
export interface OpcionesSignosSintomas {
    zona: string,
    opciones: SignoSintoma[]
}
  
export interface OpcionesDiagnosticoMedico {
    zona: string,
    opciones: DiagnosticoMedico[]
}

export interface Consulta {
    id: string,
    idPaciente: string;
}

export interface Laboratorio {
    id: string,
    nombre: string,
    funcionesDisponibles: string[]   // los ids de las funciones disponibles
}

export interface Funcion {
    id: string,
    nombre: string,
    laboratoriosDisponibles: string[]  // los ids de los laboratorios disponibles
}

export interface Producto {
    id: string,
    nombre: string,
    laboratorio: Laboratorio;
    funcion: Funcion;
}

export interface FiltrosProductosConsulta {
    idLaboratorio: string,
    idFuncion: string
}

export interface ProductoConsulta {
    producto: Producto,
    disponibleEnInventario: boolean,
    selected: boolean,
    tratamientos?: Tratamiento[]
}