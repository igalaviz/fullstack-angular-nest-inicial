import { DiagnosticoMedico, SignoSintoma } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { createAction, props } from '@ngrx/store';
import { ConsultasEntity } from './consultas.models';

export enum ConsultasActionTypes {
  SetComentarios = '[Consultas] Set comments data',
  SetSignosSintomas = '[Consultas] Set signos-sintomas data',
  SetDiagnosticoMedico = '[Consultas] Set diagnosico medico data'
}

export const init = createAction('[Consultas Page] Init');

export const loadConsultasSuccess = createAction(
  '[Consultas/API] Load Consultas Success',
  props<{ consultas: ConsultasEntity[] }>()
);

export const loadConsultasFailure = createAction(
  '[Consultas/API] Load Consultas Failure',
  props<{ error: any }>()
);

export const setComentarios = createAction(
  ConsultasActionTypes.SetComentarios,
  props<{ comentarios: string }>()
)

export const setSignosSintomas = createAction(
  ConsultasActionTypes.SetSignosSintomas,
  props<{ signosSintomas: SignoSintoma[] }>()
)

export const setDiagnosticoMedico = createAction(
  ConsultasActionTypes.SetDiagnosticoMedico,
  props<{ diagnosticoMedico: DiagnosticoMedico[] }>()
)
