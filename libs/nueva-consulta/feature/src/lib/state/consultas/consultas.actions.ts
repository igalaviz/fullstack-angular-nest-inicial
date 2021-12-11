import { DiagnosticoMedico, FiltrosProductosConsulta, OpcionesDiagnosticoMedico, ProductoConsulta, SignoSintoma, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { EstigmaPerc } from '@fullstack-angular-nest/nueva-consulta/feature';
import { createAction, props } from '@ngrx/store';
import { ConsultasEntity } from './consultas.models';

export enum ConsultasActionTypes {
  // FIRST STEP (DIAGNOSTICO INICIAL)
  SetComentarios = '[Consultas] Set comments data',
  AddSignosSintomas = '[Consultas] Added a selected signo-sintoma',
  AddDiagnosticoMedico = '[Consultas] Added a selected diagnostico medico',
  UpdateSignosSintomas = "[Consultas] Updated a selected signo-sintoma",
  UpdateDiagnosticoMedico = "[Consultas] Updated a selected diagnostico medico",
  DeleteSignosSintomas = "[Consultas] Removed a selected signo-sintoma",
  DeleteDiagnosticoMedico = "[Consultas] Removed a selected diagnostico medico",

  // SECOND STEP (TRATAMIENTOS RECOMENDADOS Y ESTIGMAS)
  AddTratamiento = "[Consultas] Added a tratamiento",
  DeleteTratamiento = "[Consultas] Removed a tratamiento",
  UpdateUsarRecomendacion = "[Consultas] Updated the use recommendation preference",
  LoadEstigmas = "[Consultas] Fetching calculated estigmas...",
  LoadEstigmasSuccess = "[Consultas] Successfuly fethced calculated estigmas",
  LoadEstigmasFailure = "[Consultas] Failed in fetching calculated estigmas",
  LoadTratsByZona = "[Consultas] Fetching tratamientos by zona...",
  LoadTratsByZonaSuccess = "[Consultas] Successfuly fethced tratamientos by zona",
  LoadTratsByZonaFailure = "[Consultas] Failed in fetching tratamientos by zona",

  // THIRD STEP (SELECCIÓN DE PRODUCTOS)
  SetTratamientoDeInteres = "[Consultas] Set tratamiento de interes",
  AddProductoSeleccionado = "[Consultas] Added a selected product",
  DeleteProductoSeleccionado = "[Consultas] Removed a selected product",
  SetFiltrosProductos = "[Consultas] Set the product filters",
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

export const addTratamiento = createAction(
  ConsultasActionTypes.AddTratamiento,
  props<{ tratamiento: Tratamiento }>()
)

export const deleteTratamiento = createAction(
  ConsultasActionTypes.DeleteTratamiento,
  props<{ tratamiento: Tratamiento }>()
)

export const updateUsarRecomendacion = createAction(
  ConsultasActionTypes.UpdateUsarRecomendacion,
  props<{ usarRecomendacion: boolean }>()
)

export const loadEstigmas = createAction(ConsultasActionTypes.LoadEstigmas)

export const loadEstigmasSuccess = createAction(
  ConsultasActionTypes.LoadEstigmasSuccess,
  props<{ estigmas: EstigmaPerc[] }>()
)

export const loadEstigmasFailure = createAction(
  ConsultasActionTypes.LoadEstigmasFailure,
  props<{ error: any }>()
)

export const loadTratsByZona = createAction(ConsultasActionTypes.LoadTratsByZona)

export const loadTratsByZonaSuccess = createAction(
  ConsultasActionTypes.LoadTratsByZonaSuccess,
  props<{ tratsByZona: OpcionesDiagnosticoMedico[] }>()
)

export const loadTratsByZonaFailure = createAction(
  ConsultasActionTypes.LoadTratsByZonaFailure,
  props<{ error: any }>()
)

export const setTratamientoInteres = createAction(
  ConsultasActionTypes.SetTratamientoDeInteres,
  props<{ tratamientoInteres: Tratamiento }>()
)

export const addProductoSeleccionado = createAction(
  ConsultasActionTypes.AddProductoSeleccionado,
  props<{ producto: ProductoConsulta, tratamiento?: Tratamiento }>()
)

export const deleteProductoSeleccionado = createAction(
  ConsultasActionTypes.DeleteDiagnosticoMedico,
  props<{ producto: ProductoConsulta, tratamiento?: Tratamiento }>()
)

export const setFiltrosProductos = createAction(
  ConsultasActionTypes.SetFiltrosProductos,
  props<{ filtros: FiltrosProductosConsulta }>()
)