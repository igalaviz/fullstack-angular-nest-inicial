import { Action } from '@ngrx/store';

import * as ConsultasActions from './consultas.actions';
import { ConsultasEntity } from './consultas.models';
import { State, initialState, reducer } from './consultas.reducer';

describe('Consultas Reducer', () => {
  const createConsultasEntity = (id: string, name = ''): ConsultasEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Consultas actions', () => {
    it('loadConsultasSuccess should return the list of known Consultas', () => {
      const consultas = [
        createConsultasEntity('PRODUCT-AAA'),
        createConsultasEntity('PRODUCT-zzz'),
      ];
      const action = ConsultasActions.loadConsultasSuccess({ consultas });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
