import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ConsultasActions from './consultas.actions';
import { ConsultasEntity, EstigmaPerc } from './consultas.models';

import { Area, DiagnosticoMedico, FiltrosProductosConsulta, OpcionesDiagnosticoMedico, ProductoConsulta, SignoSintoma, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access'
import { AplicacionProducto } from '@fullstack-angular-nest/nueva-consulta/data-access';

export const CONSULTAS_FEATURE_KEY = 'consultas';

export interface ConsultasState extends EntityState<ConsultasEntity> {
  allowNextStep: boolean;
  error?: string | null; // last known error (if any)
  fileSelectorError?: string | null;
  selectedId: string;
  loaded: boolean;

  comentarios: string;
  diagnosticoPacienteSeleccionados: SignoSintoma[];
  diagnosticoMedicoSeleccionados: DiagnosticoMedico[];
  fotos: File[];

  tratamientosSeleccionados: Tratamiento[];
  estigmas: EstigmaPerc[];
  tratamientosPorZona: OpcionesDiagnosticoMedico[];
  usarRecomendacion: boolean;
  loadedEstigmas: boolean;
  loadedTratsByZona: boolean;

  productosSeleccionados: ProductoConsulta[];
  tratamientoDeInteres?: Tratamiento;  // el tratamiento para el cuál el usuario quiere ver los productos recomendados
  filtros: FiltrosProductosConsulta;

  productoSiendoAplicado?: ProductoConsulta;
  areasSeleccionadas: Area[];

}

export interface ConsultasPartialState {
  readonly [CONSULTAS_FEATURE_KEY]: ConsultasState;
}

export const consultasAdapter: EntityAdapter<ConsultasEntity> =
  createEntityAdapter<ConsultasEntity>();

export const initialState: ConsultasState = consultasAdapter.getInitialState({
  // set initial required properties
  allowNextStep: false,
  loaded: false,
  error: '',
  comentarios: '',
  selectedId: '',
  diagnosticoPacienteSeleccionados: [],
  diagnosticoMedicoSeleccionados: [],
  fotos: [],
  tratamientosSeleccionados: [],
  estigmas: [],
  tratamientosPorZona: [],
  usarRecomendacion: true,
  loadedEstigmas: false,
  loadedTratsByZona: false,

  productosSeleccionados: [],
  tratamientoDeInteres: undefined,
  filtros: {
    idFuncion: '',
    idLaboratorio: ''
  },

  productoSiendoAplicado: undefined,
  areasSeleccionadas: [],
});

// HELPER FUNCTIONS
const addSignoSintoma = (signosSintomas: SignoSintoma[], signoSintoma: SignoSintoma) => [...signosSintomas, signoSintoma];
const addDiagnosticoMedico = (diagnosticos: DiagnosticoMedico[], diagnosticoMedico: DiagnosticoMedico) => [...diagnosticos, diagnosticoMedico];  
const updateSignoSintoma = (signosSintomas: SignoSintoma[], signoSintoma: SignoSintoma) => signosSintomas.map(s => {
  return s.clave === signoSintoma.clave ? Object.assign({}, signoSintoma) : s;  
});
const updateDiagnosticoMedico = (diagnosticos: DiagnosticoMedico[], diagnosticoMedico: DiagnosticoMedico) => diagnosticos.map(d => {
  return d.clave === diagnosticoMedico.clave ? Object.assign({}, diagnosticoMedico) : d; 
});
const deleteSignoSintoma = (signosSintomas: SignoSintoma[], signoSintoma: SignoSintoma) => signosSintomas.filter(w => signoSintoma.clave !== w.clave); 
const deleteDiagnosticoMedico = (diagnosticos: DiagnosticoMedico[], diagnostico: DiagnosticoMedico) => diagnosticos.filter(w => diagnostico.clave !== w.clave);  

const addItem = (items: any[], item: any) => [...items, item];

const deleteTratamiento = (tratamientos: Tratamiento[], tratamiento: Tratamiento) => tratamientos.filter(t => t.clave !== tratamiento.clave);

const deleteFaceArea = (faceAreas: Area[], area: Area) => faceAreas.filter(a => a.pathId !== area.pathId);

const updateTratamientoEstigmas = (estigmas: EstigmaPerc[], tratamiento: Tratamiento, check: boolean): EstigmaPerc[] => {
  let newArray = [...estigmas];

  // buscar en los estigmas, los que tengan ese tratamiento
  for(let i = 0; i < newArray.length; i++){
    for(let f = 0; f < newArray[i].diagnosticos.length; f++){
      // I'm looping through the diagnosticos
      if(newArray[i].diagnosticos[f].tratamientos?.findIndex(o => o.clave === tratamiento.clave) !== -1){
        // encontré el tratamiento
        newArray = newArray.map(e => e.estigma.clave == newArray[i].estigma.clave ? Object.assign({}, {...e,
              diagnosticos: e.diagnosticos.map(d => d.clave === newArray[i].diagnosticos[f].clave ? Object.assign({}, {...d,
                tratamientos: d.tratamientos?.map(t => t.clave === tratamiento.clave ? Object.assign({}, {...t, selected: check}) : t)}) : d)}) : e)
      }
    }
  }

  return newArray;
}

const addProducto = (productos: ProductoConsulta[], producto: ProductoConsulta, tratamiento?: Tratamiento): ProductoConsulta[] => {
  
  const found = productos.find(p => p.producto.id === producto.producto.id);
  if(found && tratamiento) {
    // Si el producto ya estaba en la lista y simplemente se le quería agregar un tratamiento
    return productos.map(p => p.producto.id === producto.producto.id ? Object.assign({}, {...p, tratamientos: p.tratamientos ? [...p.tratamientos, tratamiento] : [tratamiento]}) : p)

  }else if(!found && tratamiento){
    // Si no se encontró el producto en la lista y se especificó un tratamiento (se están usando recomendaciones)
    const productToAdd: ProductoConsulta = Object.assign({}, {...producto, selected: true});
    productToAdd.tratamientos = productToAdd.tratamientos ? [...productToAdd.tratamientos, tratamiento] : [tratamiento];
    return [...productos, productToAdd]
  }else if(found && !tratamiento){
    // Si el producto se encontró en la lista y no se especificó ningún tratamiento (no se están usando recomendaciones)
    return productos;
  }else if(!found && !tratamiento){
    // Si el producto no se encontró en la lista y no se especificó ningún tratamiento (no se están usando recomendaciones)
    return [...productos, producto]
  } else {
    return productos;
  }
}

const removeProducto = (productos: ProductoConsulta[], producto: ProductoConsulta, tratamiento?: Tratamiento): ProductoConsulta[] => {
  // Buscar el producto que se quiere deseleccionar
  const found = productos.find(p => p.producto.id === producto.producto.id);
  if(found) {
    if(found.tratamientos && found.tratamientos.length > 0){
      // Si solo tiene un tratamiento, quitar el producto de la lista por completo
      if(found.tratamientos?.length === 1){
        return productos.filter(p => p.producto.id !== producto.producto.id);
      }else{
        // Si tiene más de un tratamiento, simplemente quitar el tratamiento de la lista del producto
        return productos.map(p => p.producto.id === producto.producto.id ? Object.assign({}, {...p, tratamientos: p.tratamientos?.filter(t => t.clave !== tratamiento?.clave) }) : p)
      }
    }else{
      // el producto se encontró en la lista, pero no hay tratamientos especificados, así que simplemente hay que quitarlo por completo
      return productos.filter(p => p.producto.id !== producto.producto.id);
    }
    
  }else{
    // Si no se encontró el producto en la lista, simplemente regresar la lista como estaba
    return productos;
  }

}

const updateProducto = (productos: ProductoConsulta[], producto: ProductoConsulta) => {
  return productos.map(p => p.producto.id === producto.producto.id ? producto : p);
}

const setProximaAplicacionProducto = (productos: ProductoConsulta[], producto: ProductoConsulta, proximaAplicacion: string) => {
  return productos.map(p => p.producto.id === producto.producto.id ? Object.assign({}, {...p, proximaAplicacion: proximaAplicacion}) : p)
}

const addAplicacionProducto = (aplicacion: AplicacionProducto, producto: ProductoConsulta, productos: ProductoConsulta[]) => {
  return productos.map(p => p.producto.id === producto.producto.id ? Object.assign({}, {...p, aplicaciones: [...p.aplicaciones, aplicacion]}) : p);
}


const removeAplicacionProducto = (area: Area, producto: ProductoConsulta, productos: ProductoConsulta[]) => {
  return productos.map(p => p.producto.id === producto.producto.id ? Object.assign({}, {...p, aplicaciones: p.aplicaciones.filter(a => a.area.pathId !== area.pathId)}) : p);
}

const updateAplicacionProducto = (aplicacion: AplicacionProducto, producto: ProductoConsulta, productos: ProductoConsulta[]) => {
  return productos.map(p => p.producto.id === producto.producto.id ? Object.assign({}, {...p, aplicaciones: p.aplicaciones.map(a => a.area.pathId === aplicacion.area.pathId ? aplicacion : a)}) : p);
}

const setProductoAsAplicado = (productos: ProductoConsulta[], producto: ProductoConsulta) => {
  return productos.map(p => p.producto.id === producto.producto.id ? {...p, aplicado: true} : p);
}

const consultasReducer = createReducer(
  initialState,
  on(ConsultasActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ConsultasActions.loadConsultasSuccess, (state, { consultas }) =>
    consultasAdapter.setAll(consultas, { ...state, loaded: true })
  ),
  on(ConsultasActions.loadConsultasFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ConsultasActions.setComentarios, (state, { comentarios }) => ({
    ...state,
    comentarios
  })),
  on(ConsultasActions.addSignoSintoma, (state, { signoSintoma }) => ({
    ...state,
    diagnosticoPacienteSeleccionados: addSignoSintoma(state.diagnosticoPacienteSeleccionados, signoSintoma)
  })),
  on(ConsultasActions.addDiagnosticoMedico, (state, { diagnosticoMedico }) => ({
    ...state,
    diagnosticoMedicoSeleccionados: addDiagnosticoMedico(state.diagnosticoMedicoSeleccionados, diagnosticoMedico)
  })),
  on(ConsultasActions.updateSignoSintoma, (state, { signoSintoma }) => ({
    ...state,
    diagnosticoPacienteSeleccionados: updateSignoSintoma(state.diagnosticoPacienteSeleccionados, signoSintoma)
  })),
  on(ConsultasActions.updateDiagnosticoMedico, (state, { diagnosticoMedico }) => ({
    ...state,
    diagnosticoMedicoSeleccionados: updateDiagnosticoMedico(state.diagnosticoMedicoSeleccionados, diagnosticoMedico)
  })),
  on(ConsultasActions.deleteSignoSintoma, (state, { signoSintoma }) => ({
    ...state,
    diagnosticoPacienteSeleccionados: deleteSignoSintoma(state.diagnosticoPacienteSeleccionados, signoSintoma)
  })),
  on(ConsultasActions.deleteDiagnosticoMedico, (state, { diagnosticoMedico }) => ({
    ...state, 
    diagnosticoMedicoSeleccionados: deleteDiagnosticoMedico(state.diagnosticoMedicoSeleccionados, diagnosticoMedico)
  })),
  on(ConsultasActions.addTratamiento, (state, { tratamiento }) => ({
    ...state,
    tratamientosSeleccionados: addItem(state.tratamientosSeleccionados, tratamiento),
    //estigmas: updateTratamientoEstigmas(state.estigmas, tratamiento, true)
  })),
  on(ConsultasActions.deleteTratamiento, (state, { tratamiento }) => ({
    ...state,
    tratamientosSeleccionados: deleteTratamiento(state.tratamientosSeleccionados, tratamiento),
    //estigmas: updateTratamientoEstigmas(state.estigmas, tratamiento, false)
  })),
  on(ConsultasActions.updateUsarRecomendacion, (state, { usarRecomendacion }) => ({
    ...state,
    usarRecomendacion
  })),
  on(ConsultasActions.loadEstigmas, (state) => ({
    ...state,
    loadedEstigmas: false
  })),
  on(ConsultasActions.loadEstigmasFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(ConsultasActions.loadEstigmasSuccess, (state, { estigmas }) => ({
    ...state,
    loadedEstigmas: true,
    estigmas
  })),
  on(ConsultasActions.loadTratsByZona, (state) => ({
    ...state,
    loadedTratsByZona: false
  })),
  on(ConsultasActions.loadTratsByZonaFailure, (state, { error  }) => ({
    ...state,
    error
  })),
  on(ConsultasActions.loadTratsByZonaSuccess, (state, { tratsByZona }) => ({
    ...state,
    tratamientosPorZona: tratsByZona,
    loadedTratsByZona: true
  })),
  on(ConsultasActions.setTratamientoInteres, (state, { tratamientoInteres }) => ({
    ...state,
    tratamientoDeInteres: tratamientoInteres.clave === state.tratamientoDeInteres?.clave ? undefined : tratamientoInteres
  })),
  on(ConsultasActions.setFiltrosProductos, (state, { filtros }) => ({
    ...state,
    filtros
  })),
  on(ConsultasActions.addProductoSeleccionado, (state, { producto, tratamiento }) => ({
    ...state,
    productosSeleccionados: addProducto(state.productosSeleccionados, producto, tratamiento)
  })),
  on(ConsultasActions.deleteProductoSeleccionado, (state, { producto, tratamiento }) => ({
    ...state,
    productosSeleccionados: removeProducto(state.productosSeleccionados, producto, tratamiento)
  })),
  on(ConsultasActions.updateProductoSeleccionado, (state, { producto }) => ({
    ...state,
    productosSeleccionados: updateProducto(state.productosSeleccionados, producto)
  })),
  on(ConsultasActions.setProductoSiendoAplicado, (state, { producto }) => ({
    ...state,
    productoSiendoAplicado: producto
  })),
  on(ConsultasActions.addAplicacionProducto, (state, { aplicacion, producto }) => ({
    ...state,
    productosSeleccionados: addAplicacionProducto(aplicacion, producto, state.productosSeleccionados)
  })),
  on(ConsultasActions.removeAplicacionProducto, (state, { area, producto }) => ({
    ...state,
    productosSeleccionados: removeAplicacionProducto(area, producto, state.productosSeleccionados)
  })),
  on(ConsultasActions.updateAplicacionProducto, (state, { aplicacion, producto }) => ({
    ...state,
    productosSeleccionados: updateAplicacionProducto(aplicacion, producto, state.productosSeleccionados)
  })),
  on(ConsultasActions.addSelectedFaceArea, (state, { area }) => ({
    ...state,
    areasSeleccionadas: addItem(state.areasSeleccionadas, area)
  })),
  on(ConsultasActions.deleteSelectedFaceArea, (state, { area }) => ({
    ...state,
    areasSeleccionadas: deleteFaceArea(state.areasSeleccionadas, area)
  })),
  on(ConsultasActions.setSelectedFaceAreas, (state, { areas }) => ({
    ...state,
    areasSeleccionadas: areas
  })),
  on(ConsultasActions.setAllowNextStep, (state, { allow }) => ({
    ...state,
    allowNextStep: allow
  })),
  on(ConsultasActions.setFotos, (state, { fotos }) => ({
    ...state,
    fotos
  })),
  on(ConsultasActions.setTratamientos, (state, { tratamientos }) => ({
    ...state,
    tratamientosSeleccionados: tratamientos
  })),
  on(ConsultasActions.setProductoAsAplicado, (state, { producto }) => ({
    ...state,
    productosSeleccionados: setProductoAsAplicado(state.productosSeleccionados, producto)
  })),
  on(ConsultasActions.setProximaAplicacionProducto, (state, {proximaAplicacion, producto}) => ({
    ...state,
    productosSeleccionados: setProximaAplicacionProducto(state.productosSeleccionados, producto, proximaAplicacion)
  })),
  on(ConsultasActions.removeAllProductosSeleccionados, (state) => ({
    ...state,
    productosSeleccionados: []
  })),
  on(ConsultasActions.setError, (state, {error}) => ({
    ...state,
    error
  })),
  on(ConsultasActions.setFileSelectorError, (state, {error}) => ({
    ...state,
    fileSelectorError: error
  }))
);

export function reducer(state: ConsultasState | undefined, action: Action) {
  return consultasReducer(state, action);
}
