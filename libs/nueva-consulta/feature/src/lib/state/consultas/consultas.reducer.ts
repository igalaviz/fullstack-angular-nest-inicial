import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ConsultasActions from './consultas.actions';
import { ConsultasEntity, EstigmaPerc } from './consultas.models';

import { DiagnosticoMedico, FiltrosProductosConsulta, OpcionesDiagnosticoMedico, ProductoConsulta, SignoSintoma, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access'

export const CONSULTAS_FEATURE_KEY = 'consultas';

export interface ConsultasState extends EntityState<ConsultasEntity> {
  error?: string | null; // last known error (if any)
  selectedId: string;
  loaded: boolean;

  comentarios: string;
  diagnosticoPacienteSeleccionados: SignoSintoma[];
  diagnosticoMedicoSeleccionados: DiagnosticoMedico[];

  tratamientosSeleccionados: Tratamiento[];
  estigmas: EstigmaPerc[];
  tratamientosPorZona: OpcionesDiagnosticoMedico[];
  usarRecomendacion: boolean;
  loadedEstigmas: boolean;
  loadedTratsByZona: boolean;

  productosSeleccionados: ProductoConsulta[];
  tratamientoDeInteres?: Tratamiento;
  filtros: FiltrosProductosConsulta;

}

export interface ConsultasPartialState {
  readonly [CONSULTAS_FEATURE_KEY]: ConsultasState;
}

export const consultasAdapter: EntityAdapter<ConsultasEntity> =
  createEntityAdapter<ConsultasEntity>();

export const initialState: ConsultasState = consultasAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  comentarios: '',
  selectedId: '',
  diagnosticoPacienteSeleccionados: [],
  diagnosticoMedicoSeleccionados: [],
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
  }
});

// HELPER FUNCTIONS
const addSignoSintoma = (signosSintomas: SignoSintoma[], signoSintoma: SignoSintoma) => [...signosSintomas, signoSintoma];
const addDiagnosticoMedico = (diagnosticos: DiagnosticoMedico[], diagnosticoMedico: DiagnosticoMedico) => [...diagnosticos, diagnosticoMedico];  
const updateSignoSintoma = (signosSintomas: SignoSintoma[], signoSintoma: SignoSintoma) => signosSintomas.map(s => {
  return s.id === signoSintoma.id ? Object.assign({}, signoSintoma) : s;  
});
const updateDiagnosticoMedico = (diagnosticos: DiagnosticoMedico[], diagnosticoMedico: DiagnosticoMedico) => diagnosticos.map(d => {
  return d.id === diagnosticoMedico.id ? Object.assign({}, diagnosticoMedico) : d; 
});
const deleteSignoSintoma = (signosSintomas: SignoSintoma[], signoSintoma: SignoSintoma) => signosSintomas.filter(w => signoSintoma.id !== w.id); 
const deleteDiagnosticoMedico = (diagnosticos: DiagnosticoMedico[], diagnostico: DiagnosticoMedico) => diagnosticos.filter(w => diagnostico.id !== w.id);  

const addItem = (items: any[], item: any) => [...items, item];
const deleteItem = (items: any[], item: any) => items.filter(i => item.id !== i.id);

const updateTratamientoEstigmas = (estigmas: EstigmaPerc[], tratamiento: Tratamiento, check: boolean): EstigmaPerc[] => {
  let newArray = [...estigmas];

  // buscar en los estigmas, los que tengan ese tratamiento
  for(let i = 0; i < newArray.length; i++){
    for(let f = 0; f < newArray[i].diagnosticos.length; f++){
      // I'm looping through the diagnosticos
      if(newArray[i].diagnosticos[f].tratamientos?.findIndex(o => o.id === tratamiento.id) !== -1){
        // encontré el tratamiento
        newArray = newArray.map(e => e.estigma.id == newArray[i].estigma.id ? Object.assign({}, {...e,
              diagnosticos: e.diagnosticos.map(d => d.id === newArray[i].diagnosticos[f].id ? Object.assign({}, {...d,
                tratamientos: d.tratamientos?.map(t => t.id === tratamiento.id ? Object.assign({}, {...t, selected: check}) : t)}) : d)}) : e)
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
    const productToAdd: ProductoConsulta = Object.assign({}, {...producto});
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
    // Si solo tiene un tratamiento, quitar el producto de la lista por completo
    if(found.tratamientos?.length === 1){
      return productos.filter(p => p.producto.id !== producto.producto.id);
    }else {
      // Si tiene más de un tratamiento, simplemente quitar el tratamiento de la lista del producto
      return productos.map(p => p.producto.id === producto.producto.id ? Object.assign({}, {...p, tratamientos: p.tratamientos?.filter(t => t.id !== tratamiento?.id) }) : p)
    }
  }else{
    // Si no se encontró el producto en la lista, simplemente regresar la lista como estaba
    return productos;
  }

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
    estigmas: updateTratamientoEstigmas(state.estigmas, tratamiento, true)
  })),
  on(ConsultasActions.deleteTratamiento, (state, { tratamiento }) => ({
    ...state,
    tratamientosSeleccionados: deleteItem(state.tratamientosSeleccionados, tratamiento),
    estigmas: updateTratamientoEstigmas(state.estigmas, tratamiento, false)
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
    tratamientoDeInteres: tratamientoInteres.id === state.tratamientoDeInteres?.id ? undefined : tratamientoInteres
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
  }))
);

export function reducer(state: ConsultasState | undefined, action: Action) {
  return consultasReducer(state, action);
}
