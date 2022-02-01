import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as ConsultasActions from './consultas.actions';
import { ConsultasEffects } from './consultas.effects';

describe('ConsultasEffects', () => {
  let actions: Observable<Action>;
  let effects: ConsultasEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ConsultasEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ConsultasEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ConsultasActions.init() });

      const expected = hot('-a-|', {
        a: ConsultasActions.loadConsultasSuccess({ consultas: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
