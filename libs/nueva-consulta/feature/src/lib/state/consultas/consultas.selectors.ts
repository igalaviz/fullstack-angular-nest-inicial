import { ProductoConsulta, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TratamientoConProductos } from './consultas.models';
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

export const getAllowNextStep = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.allowNextStep
)

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

export const getTratamientosSeleccionados = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.tratamientosSeleccionados
)

export const getUsarRecomendacion = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.usarRecomendacion
)

export const getEstigmas = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.estigmas
)

export const getTratamientosPorZona = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.tratamientosPorZona
)

export const getTratamientoDeInteres = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.tratamientoDeInteres
)

export const getFiltrosProductos = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.filtros
)

export const getProductosSeleccionados = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.productosSeleccionados
)

export const getProductosPorAplicar = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.productosSeleccionados.filter(producto => !producto.aplicado)
)

export const getProductosAplicados = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.productosSeleccionados.filter(producto => producto.aplicado)
)

export const getTratamientosConProductosSeleccionados = createSelector(
  getProductosSeleccionados,
  getTratamientosSeleccionados,
  getTratamientoDeInteres,
  (productos: ProductoConsulta[], tratamientos: Tratamiento[], tratamientoInteres?: Tratamiento) => {
    const tratamientosConProductos: TratamientoConProductos[] = [];

    // I'm gonna loop through all the treatments, and add the appropriate products to each one.
    //And if the treatment I'm currently on matches the one that is of interest, then imma mark it as chosen

    for(let i = 0; i < tratamientos.length; i++){
      const tratConProd: TratamientoConProductos = {
        tratamiento: tratamientos[i],
        productos: [],
        chosen: tratamientos[i].clave === tratamientoInteres?.clave
      }
      for(let b = 0; b < productos.length; b++){
        const foundTrat = productos[b].tratamientos?.find(t => t.clave === tratamientos[i].clave);
        if(foundTrat){
          tratConProd.productos.push(productos[b]);
        }
      }
      tratamientosConProductos.push(tratConProd);
    }

    return tratamientosConProductos;
  }
)

export const getProductoSiendoAplicado = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.productoSiendoAplicado
)

export const getSelectedFaceAreas = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.areasSeleccionadas
)

export const getFotos = createSelector(
  getConsultasState,
  (state: ConsultasState) => state.fotos
)