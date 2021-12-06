import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'consultas',
    loadChildren: () =>
      import('@fullstack-angular-nest/nueva-consulta/feature').then(
        (m) => m.NuevaConsultaFeatureModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}