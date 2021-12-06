import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagnosticoInicialComponent } from './diagnostico-inicial/diagnostico-inicial.component';
import { TratamientosRecomendadosComponent } from './tratamientos-recomendados/tratamientos-recomendados.component';

const routes: Routes = [
  {
    path: 'new/diagnostico',
    component: DiagnosticoInicialComponent 
  },
  {
    path: 'new/tratamientos',
    component: TratamientosRecomendadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureConsultasRoutingModule {}