import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONSULTAS_FEATURE_KEY,
  State,
  consultasAdapter,
} from './consultas.reducer';

// Lookup the 'Consultas' feature state managed by NgRx
export const getConsultasState = createFeatureSelector<State>(
  CONSULTAS_FEATURE_KEY
);

const { selectAll, selectEntities } = consultasAdapter.getSelectors();

export const getConsultasLoaded = createSelector(
  getConsultasState,
  (state: State) => state.loaded
);

export const getConsultasError = createSelector(
  getConsultasState,
  (state: State) => state.error
);

export const getAllConsultas = createSelector(
  getConsultasState,
  (state: State) => selectAll(state)
);

export const getConsultasEntities = createSelector(
  getConsultasState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getConsultasState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getConsultasEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getComentarios = createSelector(
  getConsultasState,
  (state: State) => state.comentarios
)

export const getSignosSintomas = createSelector(
  getConsultasState,
  (state: State) => state.diagnosticoPacienteSeleccionados
)

export const getDiagnosticoMedico = createSelector(
  getConsultasState,
  (state: State) => state.diagnosticoMedicoSeleccionados
)