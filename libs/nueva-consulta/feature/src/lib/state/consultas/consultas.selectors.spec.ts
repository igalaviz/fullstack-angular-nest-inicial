import { ConsultasEntity } from './consultas.models';
import {
  consultasAdapter,
  ConsultasPartialState,
  initialState,
} from './consultas.reducer';
import * as ConsultasSelectors from './consultas.selectors';

describe('Consultas Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getConsultasId = (it: ConsultasEntity) => it.id;
  const createConsultasEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ConsultasEntity);

  let state: ConsultasPartialState;

  beforeEach(() => {
    state = {
      consultas: consultasAdapter.setAll(
        [
          createConsultasEntity('PRODUCT-AAA'),
          createConsultasEntity('PRODUCT-BBB'),
          createConsultasEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Consultas Selectors', () => {
    it('getAllConsultas() should return the list of Consultas', () => {
      const results = ConsultasSelectors.getAllConsultas(state);
      const selId = getConsultasId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ConsultasSelectors.getSelected(state) as ConsultasEntity;
      const selId = getConsultasId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getConsultasLoaded() should return the current "loaded" status', () => {
      const result = ConsultasSelectors.getConsultasLoaded(state);

      expect(result).toBe(true);
    });

    it('getConsultasError() should return the current "error" state', () => {
      const result = ConsultasSelectors.getConsultasError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
