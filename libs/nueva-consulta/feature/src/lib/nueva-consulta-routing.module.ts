import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagnosticoInicialComponent } from './diagnostico-inicial/diagnostico-inicial.component';
import { SeleccionProductosComponent } from './seleccion-productos/seleccion-productos.component';
import { TrabajoComponent } from './trabajo/trabajo.component';
import { TratamientosRecomendadosComponent } from './tratamientos-recomendados/tratamientos-recomendados.component';

const routes: Routes = [
  {
    path: 'new/diagnostico',
    component: DiagnosticoInicialComponent 
  },
  {
    path: 'new/tratamientos',
    component: TratamientosRecomendadosComponent
  },
  {
    path: 'new/productos',
    component: SeleccionProductosComponent
  },
  {
    path: 'new/trabajo',
    component: TrabajoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureConsultasRoutingModule {}