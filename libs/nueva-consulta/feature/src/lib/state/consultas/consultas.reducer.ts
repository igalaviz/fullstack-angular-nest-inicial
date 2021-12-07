import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ConsultasActions from './consultas.actions';
import { ConsultasEntity, EstigmaPerc } from './consultas.models';

import { DiagnosticoMedico, OpcionesDiagnosticoMedico, SignoSintoma, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access'
import { state } from '@angular/animations';

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
  usarRecomendacion: true
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
  }))
);

export function reducer(state: ConsultasState | undefined, action: Action) {
  return consultasReducer(state, action);
}
