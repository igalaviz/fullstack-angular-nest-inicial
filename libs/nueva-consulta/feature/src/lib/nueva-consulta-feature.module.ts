import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromConsultas from './state/consultas/consultas.reducer';
import { ConsultasEffects } from './state/consultas/consultas.effects';
import { DiagnosticoInicialComponent } from './diagnostico-inicial/diagnostico-inicial.component';
import { DiagnosticoExpPanelComponent } from './diagnostico-inicial/diagnostico-exp-panel/diagnostico-exp-panel.component';
import { MaterialModule } from '@fullstack-angular-nest/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColumnaPacienteComponent } from './diagnostico-inicial/columna-paciente/columna-paciente.component';
import { NuevaConsultaDataAccessModule} from '@fullstack-angular-nest/nueva-consulta/data-access';
import { ColumnaMedicoComponent } from './diagnostico-inicial/columna-medico/columna-medico.component';
import { ComentariosComponent } from './diagnostico-inicial/comentarios/comentarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FotosComponent } from './diagnostico-inicial/fotos/fotos.component';
import { TratamientosRecomendadosComponent } from './tratamientos-recomendados/tratamientos-recomendados.component';
import { FeatureConsultasRoutingModule } from './nueva-consulta-routing.module';
import { TratamientosSeleccionadosComponent } from './tratamientos-recomendados/tratamientos-seleccionados/tratamientos-seleccionados.component';
import { ExpPanelTratamientosRecomendadosComponent } from './tratamientos-recomendados/exp-panel-tratamientos-recomendados/exp-panel-tratamientos-recomendados.component';
import { ColumnaTratamientosComponent } from './tratamientos-recomendados/columna-tratamientos/columna-tratamientos.component';
import { ColumnaCaraComponent } from './tratamientos-recomendados/columna-cara/columna-cara.component';
import { FaceInteractiveDiagramComponent } from './face-interactive-diagram/face-interactive-diagram.component';
import { ZonesDiagramComponent } from './face-interactive-diagram/zones-diagram/zones-diagram.component';
import { SeleccionProductosComponent } from './seleccion-productos/seleccion-productos.component';
import { ItemProductoComponent } from './seleccion-productos/item-producto/item-producto.component';
import { ItemTratamientoComponent } from './seleccion-productos/item-tratamiento/item-tratamiento.component';
import { ColumnaTratamientosSeleccionadosComponent } from './seleccion-productos/columna-tratamientos-seleccionados/columna-tratamientos-seleccionados.component';
import { ProductosRecomendadosComponent } from './seleccion-productos/productos-recomendados/productos-recomendados.component';
import { FiltrosProductosComponent } from './seleccion-productos/filtros-productos/filtros-productos.component';
import { ListadoProductosComponent } from './seleccion-productos/listado-productos/listado-productos.component';
import { TodosProductosComponent } from './seleccion-productos/todos-productos/todos-productos.component';
import { TrabajoComponent } from './trabajo/trabajo.component';
import { ItemProductoPorAplicarComponent } from './trabajo/item-producto-por-aplicar/item-producto-por-aplicar.component';
import { ListaProductosPorAplicarComponent } from './trabajo/lista-productos-por-aplicar/lista-productos-por-aplicar.component';
import { AddProductoBtnComponent } from './trabajo/add-producto-btn/add-producto-btn.component';
import { DialogoProductoAplicarComponent } from './trabajo/dialogo-producto-aplicar/dialogo-producto-aplicar.component';
import { ItemFaceAreaComponent } from './trabajo/item-face-area/item-face-area.component';
import { ListaFaceAreasComponent } from './trabajo/lista-face-areas/lista-face-areas.component';
import { UiControlsModule } from '@fullstack-angular-nest/ui-controls';
import { UpdatedTratamientosListComponent } from './updated-tratamientos-list/updated-tratamientos-list.component';
import { ChiplistTratamientosProductoComponent } from './seleccion-productos/chiplist-tratamientos-producto/chiplist-tratamientos-producto.component';
import { MatoptionsTratamientosProductoComponent } from './seleccion-productos/matoptions-tratamientos-producto/matoptions-tratamientos-producto.component';
import { ItemProductoAplicadoComponent } from './item-producto-aplicado/item-producto-aplicado.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromConsultas.CONSULTAS_FEATURE_KEY,
      fromConsultas.reducer
    ),
    EffectsModule.forFeature([ConsultasEffects]),
    MaterialModule,
    FlexLayoutModule,
    NuevaConsultaDataAccessModule,
    ReactiveFormsModule,
    FormsModule,
    FeatureConsultasRoutingModule,
    UiControlsModule
  ],
  declarations: [
    DiagnosticoInicialComponent,
    DiagnosticoExpPanelComponent,
    ColumnaPacienteComponent,
    ColumnaMedicoComponent,
    ComentariosComponent,
    FotosComponent,
    TratamientosRecomendadosComponent,
    TratamientosSeleccionadosComponent,
    ExpPanelTratamientosRecomendadosComponent,
    ColumnaTratamientosComponent,
    ColumnaCaraComponent,
    FaceInteractiveDiagramComponent,
    ZonesDiagramComponent,
    SeleccionProductosComponent,
    ItemProductoComponent,
    ItemTratamientoComponent,
    ColumnaTratamientosSeleccionadosComponent,
    ProductosRecomendadosComponent,
    FiltrosProductosComponent,
    ListadoProductosComponent,
    TodosProductosComponent,
    TrabajoComponent,
    ItemProductoPorAplicarComponent,
    ListaProductosPorAplicarComponent,
    AddProductoBtnComponent,
    DialogoProductoAplicarComponent,
    ItemFaceAreaComponent,
    ListaFaceAreasComponent,
    UpdatedTratamientosListComponent,
    ChiplistTratamientosProductoComponent,
    MatoptionsTratamientosProductoComponent,
    ItemProductoAplicadoComponent,
  ],
  exports: [
    DiagnosticoInicialComponent
  ]
})
export class NuevaConsultaFeatureModule {}
