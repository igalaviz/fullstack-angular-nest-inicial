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
  ],
  exports: [
    DiagnosticoInicialComponent
  ]
})
export class NuevaConsultaFeatureModule {}
