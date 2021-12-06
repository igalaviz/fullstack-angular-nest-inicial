import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ConsultasActions from './consultas.actions';
import { ConsultasEntity } from './consultas.models';

import { DiagnosticoMedico, SignoSintoma } from '@fullstack-angular-nest/nueva-consulta/data-access'

export const CONSULTAS_FEATURE_KEY = 'consultas';

export interface State extends EntityState<ConsultasEntity> {
  error?: string | null; // last known error (if any)
  comentarios: string;
  selectedId: string;
  loaded: boolean;
  diagnosticoPacienteSeleccionados: SignoSintoma[];
  diagnosticoMedicoSeleccionados: DiagnosticoMedico[];
}

export interface ConsultasPartialState {
  readonly [CONSULTAS_FEATURE_KEY]: State;
}

export const consultasAdapter: EntityAdapter<ConsultasEntity> =
  createEntityAdapter<ConsultasEntity>();

export const initialState: State = consultasAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  comentarios: '',
  selectedId: '',
  diagnosticoPacienteSeleccionados: [],
  diagnosticoMedicoSeleccionados: []
});

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
  on(ConsultasActions.setSignosSintomas, (state, { signosSintomas }) => ({
    ...state,
    signosSintomas
  })),
  on(ConsultasActions.setDiagnosticoMedico, (state, { diagnosticoMedico }) => ({
    ...state,
    diagnosticoMedico
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return consultasReducer(state, action);
}
