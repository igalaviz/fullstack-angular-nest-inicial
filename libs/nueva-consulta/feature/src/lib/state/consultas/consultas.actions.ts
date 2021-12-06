import { DiagnosticoMedico, SignoSintoma } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { createAction, props } from '@ngrx/store';
import { ConsultasEntity } from './consultas.models';

export enum ConsultasActionTypes {
  SetComentarios = '[Consultas] Set comments data',
  AddSignosSintomas = '[Consultas] Added a selected signo-sintoma',
  AddDiagnosticoMedico = '[Consultas] Added a selected diagnostico medico',
  UpdateSignosSintomas = "[Consultas] Updated a selected signo-sintoma",
  UpdateDiagnosticoMedico = "[Consultas] Updated a selected diagnostico medico",
  DeleteSignosSintomas = "[Consultas] Removed a selected signo-sintoma",
  DeleteDiagnosticoMedico = "[Consultas] Removed a selected diagnostico medico"
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

export const addSignoSintoma = createAction(
  ConsultasActionTypes.AddSignosSintomas,
  props<{ signoSintoma: SignoSintoma }>()
)

export const addDiagnosticoMedico = createAction(
  ConsultasActionTypes.AddDiagnosticoMedico,
  props<{ diagnosticoMedico: DiagnosticoMedico }>()
)

export const updateSignoSintoma = createAction(
  ConsultasActionTypes.UpdateSignosSintomas,
  props<{ signoSintoma: SignoSintoma }>()
)

export const updateDiagnosticoMedico = createAction(
  ConsultasActionTypes.UpdateDiagnosticoMedico,
  props<{ diagnosticoMedico: DiagnosticoMedico }>()
)

export const deleteSignoSintoma = createAction(
  ConsultasActionTypes.DeleteSignosSintomas,
  props<{ signoSintoma: SignoSintoma }>()
)

export const deleteDiagnosticoMedico = createAction(
  ConsultasActionTypes.DeleteDiagnosticoMedico,
  props<{ diagnosticoMedico: DiagnosticoMedico }>()
)