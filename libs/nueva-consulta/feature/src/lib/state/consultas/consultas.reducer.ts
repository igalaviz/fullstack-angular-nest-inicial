import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ConsultasActions from './consultas.actions';
import { ConsultasEntity } from './consultas.models';

export const CONSULTAS_FEATURE_KEY = 'consultas';

export interface State extends EntityState<ConsultasEntity> {
  selectedId?: string | number; // which Consultas record has been selected
  loaded: boolean; // has the Consultas list been loaded
  error?: string | null; // last known error (if any)
}

export interface ConsultasPartialState {
  readonly [CONSULTAS_FEATURE_KEY]: State;
}

export const consultasAdapter: EntityAdapter<ConsultasEntity> =
  createEntityAdapter<ConsultasEntity>();

export const initialState: State = consultasAdapter.getInitialState({
  // set initial required properties
  loaded: false,
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
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return consultasReducer(state, action);
}
