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
    FeatureConsultasRoutingModule
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
  ],
  exports: [
    DiagnosticoInicialComponent
  ]
})
export class NuevaConsultaFeatureModule {}
