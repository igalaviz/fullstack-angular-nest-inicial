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

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromConsultas.CONSULTAS_FEATURE_KEY,
      fromConsultas.reducer
    ),
    EffectsModule.forFeature([ConsultasEffects]),
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    DiagnosticoInicialComponent,
    DiagnosticoExpPanelComponent,
  ],
  exports: [
    DiagnosticoInicialComponent
  ]
})
export class NuevaConsultaFeatureModule {}