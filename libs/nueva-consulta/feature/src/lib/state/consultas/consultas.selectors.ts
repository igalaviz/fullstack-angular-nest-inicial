import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONSULTAS_FEATURE_KEY,
  ConsultasState,
  consultasAdapter,
} from './consultas.reducer';

// Lookup the 'Consultas' feature state managed by NgRx
export const getConsultasState = createFeatureSelector<ConsultasState>(
  CONSULTAS_FEATURE_KEY
);

const { selectAll, selectEntities } = consultasAdapter.getSelectors();

export const getConsultasLoaded = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.loaded
);

export const getConsultasError = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.error
);

export const getAllConsultas = createSelector(
  getConsultasState,
  (state: ConsultasState) => selectAll(state)
);

export const getConsultasEntities = createSelector(
  getConsultasState,
  (state: ConsultasState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.selectedId
);

export const getSelected = createSelector(
  getConsultasEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getComentarios = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.comentarios
)

export const getSignosSintomas = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.diagnosticoPacienteSeleccionados
)

export const getDiagnosticoMedico = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.diagnosticoMedicoSeleccionados
)