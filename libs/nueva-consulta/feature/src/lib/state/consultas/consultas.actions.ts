import { Area, DiagnosticoMedico, FiltrosProductosConsulta, OpcionesDiagnosticoMedico, ProductoConsulta, SignoSintoma, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { EstigmaPerc } from '@fullstack-angular-nest/nueva-consulta/feature';
import { createAction, props } from '@ngrx/store';
import { AplicacionProducto } from 'libs/nueva-consulta/data-access/src';
import { ConsultasEntity } from './consultas.models';

export enum ConsultasActionTypes {
  // GENERAL
  SetError = '[Consultas] Set the last known error',
  SetAllowNextStep = '[Consultas] Set if the user can pass to the next step',

  // FIRST STEP (DIAGNOSTICO INICIAL)
  SetComentarios = '[Consultas] Set comments data',
  AddSignosSintomas = '[Consultas] Added a selected signo-sintoma',
  AddDiagnosticoMedico = '[Consultas] Added a selected diagnostico medico',
  UpdateSignosSintomas = "[Consultas] Updated a selected signo-sintoma",
  UpdateDiagnosticoMedico = "[Consultas] Updated a selected diagnostico medico",
  DeleteSignosSintomas = "[Consultas] Removed a selected signo-sintoma",
  DeleteDiagnosticoMedico = "[Consultas] Removed a selected diagnostico medico",
  SetFotos = "[Consultas] Set the pictures list",

  // SECOND STEP (TRATAMIENTOS RECOMENDADOS Y ESTIGMAS)
  AddTratamiento = "[Consultas] Added a tratamiento",
  DeleteTratamiento = "[Consultas] Removed a tratamiento",
  SetTratamientos = "[Consultas] Set the selected tratamientos list",
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
  UpdateProductoSeleccionado ="[Consultas] Updated a selected product's data",
  SetFiltrosProductos = "[Consultas] Set the product filters",

  //FOURTH STEP (PANTALLA DE TRABAJO)
  SetProductoSiendoAplicado = "[Consultas] Set the product being currently applied",
  SetProductoAsAplicado = "[Consultas] Set a product as already applied",
  AddAplicacionProducto = "[Consultas] Added a specific application of a selected product",
  RemoveAplicacionProducto = "[Consultas] Removed a specific applicaction of a selected product",
  UpdateAplicacionProducto = "[Consultas] Updated the data of a specific product application",
  SetAreasSeleccionadas = "[Consultas] Set the selected face areas list",
  AddAreaSeleccionada = "[Consultas] Added a selected face area",
  DeleteAreaSeleccionada = "[Consultas] Removed a selected face area",
  SetProximaAplicacionProducto = "[Consultas] Set the next application date of a product"
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
  ConsultasActionTypes.DeleteProductoSeleccionado,
  props<{ producto: ProductoConsulta, tratamiento?: Tratamiento }>()
)

export const updateProductoSeleccionado = createAction(
  ConsultasActionTypes.UpdateProductoSeleccionado,
  props<{ producto: ProductoConsulta }>()
)

export const setFiltrosProductos = createAction(
  ConsultasActionTypes.SetFiltrosProductos,
  props<{ filtros: FiltrosProductosConsulta }>()
)

export const setProductoSiendoAplicado = createAction(
  ConsultasActionTypes.SetProductoSiendoAplicado,
  props<{ producto?: ProductoConsulta }>()
)

export const addAplicacionProducto = createAction(
  ConsultasActionTypes.AddAplicacionProducto,
  props<{ aplicacion: AplicacionProducto, producto: ProductoConsulta }>()
)

export const removeAplicacionProducto = createAction(
  ConsultasActionTypes.RemoveAplicacionProducto,
  props<{ area: Area, producto: ProductoConsulta }>()
)

export const updateAplicacionProducto = createAction(
  ConsultasActionTypes.UpdateAplicacionProducto,
  props<{ aplicacion: AplicacionProducto, producto: ProductoConsulta }>()
)

export const setSelectedFaceAreas = createAction(
  ConsultasActionTypes.SetAreasSeleccionadas,
  props<{ areas: Area[] }>()
)

export const addSelectedFaceArea = createAction(
  ConsultasActionTypes.AddAreaSeleccionada,
  props<{ area: Area }>()
)

export const deleteSelectedFaceArea = createAction(
  ConsultasActionTypes.DeleteAreaSeleccionada,
  props<{ area: Area }>()
)

export const setError = createAction(
  ConsultasActionTypes.SetError,
  props<{ error: string | null }>()
)

export const setAllowNextStep = createAction(
  ConsultasActionTypes.SetAllowNextStep,
  props<{ allow: boolean }>()
)

export const setFotos = createAction(
  ConsultasActionTypes.SetFotos,
  props<{ fotos: File[] }>()
)

export const setTratamientos = createAction(
  ConsultasActionTypes.SetTratamientos,
  props<{ tratamientos: Tratamiento[] }>()
)

export const setProductoAsAplicado = createAction(
  ConsultasActionTypes.SetProductoAsAplicado,
  props<{ producto: ProductoConsulta }>()
)

export const setProximaAplicacionProducto = createAction(
  ConsultasActionTypes.SetProximaAplicacionProducto,
  props<{ proximaAplicacion: string, producto: ProductoConsulta }>()
)