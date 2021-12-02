import { createAction, props } from '@ngrx/store';
import { ConsultasEntity } from './consultas.models';

export const init = createAction('[Consultas Page] Init');

export const loadConsultasSuccess = createAction(
  '[Consultas/API] Load Consultas Success',
  props<{ consultas: ConsultasEntity[] }>()
);

export const loadConsultasFailure = createAction(
  '[Consultas/API] Load Consultas Failure',
  props<{ error: any }>()
);
