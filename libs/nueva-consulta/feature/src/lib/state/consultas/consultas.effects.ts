import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ConsultasActions from './consultas.actions';
import * as ConsultasFeature from './consultas.reducer';

@Injectable()
export class ConsultasEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsultasActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ConsultasActions.loadConsultasSuccess({ consultas: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ConsultasActions.loadConsultasFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
