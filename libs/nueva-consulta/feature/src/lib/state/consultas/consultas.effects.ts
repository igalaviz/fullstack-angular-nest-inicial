import { Injectable } from '@angular/core';
import { ConsultaService } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators'

import * as ConsultasActions from './consultas.actions';
import { Store, select } from '@ngrx/store';
import { ConsultasState, getDiagnosticoMedico, getSignosSintomas } from '@fullstack-angular-nest/nueva-consulta/feature';

@Injectable()
export class ConsultasEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsultasActions.init),
      
    )
  );

  estigmas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsultasActions.loadEstigmas),
      withLatestFrom(this.store.pipe(select(getDiagnosticoMedico)), this.store.pipe(select(getSignosSintomas))),
      mergeMap(([action, diagnosticoMedico, signosSintomas]) => this.consultasService.calcularEstigmas(signosSintomas, diagnosticoMedico).pipe(map(res => ConsultasActions.loadEstigmasSuccess({ estigmas: res }))))
    )
  )

  zonas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsultasActions.loadTratsByZona),
      withLatestFrom(this.store.pipe(select(getDiagnosticoMedico)), this.store.pipe(select(getSignosSintomas))),
      mergeMap(([action, diagnosticoMedico, signosSintomas]) => this.consultasService.calcularTratamientosPorZona(signosSintomas, diagnosticoMedico).pipe(map(res => ConsultasActions.loadTratsByZonaSuccess({ tratsByZona: res }))))
    )
  )

  constructor(private readonly actions$: Actions, private consultasService: ConsultaService, private store: Store<ConsultasState>) {}
}
