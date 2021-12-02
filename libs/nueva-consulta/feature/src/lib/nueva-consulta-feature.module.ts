import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromConsultas from './state/consultas/consultas.reducer';
import { ConsultasEffects } from './state/consultas/consultas.effects';
import { DiagnosticoInicialComponent } from './diagnostico-inicial/diagnostico-inicial.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromConsultas.CONSULTAS_FEATURE_KEY,
      fromConsultas.reducer
    ),
    EffectsModule.forFeature([ConsultasEffects]),
  ],
  declarations: [
    DiagnosticoInicialComponent,
  ],
})
export class NuevaConsultaFeatureModule {}
