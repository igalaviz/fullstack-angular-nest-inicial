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
    FormsModule
  ],
  declarations: [
    DiagnosticoInicialComponent,
    DiagnosticoExpPanelComponent,
    ColumnaPacienteComponent,
    ColumnaMedicoComponent,
    ComentariosComponent,
  ],
  exports: [
    DiagnosticoInicialComponent
  ]
})
export class NuevaConsultaFeatureModule {}
