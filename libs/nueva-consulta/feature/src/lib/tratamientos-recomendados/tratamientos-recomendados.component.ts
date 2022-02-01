import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConsultasState, getTratamientosSeleccionados, getUsarRecomendacion, removeAllProductosSeleccionados, setAllowNextStep, setError, setTratamientos, updateUsarRecomendacion } from '../..';

@Component({
  selector: 'consultas-tratamientos-recomendados',
  templateUrl: './tratamientos-recomendados.component.html',
  styleUrls: ['./tratamientos-recomendados.component.scss']
})
export class TratamientosRecomendadosComponent implements OnDestroy{
  usarRecomendacion! : boolean;
  enableNext = false;

  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>) {
    this.subscriptions.push(combineLatest([store.pipe(select(getUsarRecomendacion)), store.pipe(select(getTratamientosSeleccionados))]).pipe(tap(([usarRecomendacion, tratamientosSeleccionados]) => {
      this.usarRecomendacion = usarRecomendacion;

      if(tratamientosSeleccionados.length === 0 && this.usarRecomendacion){
        this.store.dispatch(setAllowNextStep({allow: false}))
        // let the user know why they can't advance to the next step
        this.store.dispatch(setError({error: "Por favor seleccione al menos un tratamiento"}));
        this.enableNext = false;
      }else if(tratamientosSeleccionados.length === 0 && !this.usarRecomendacion) {
        this.store.dispatch(setAllowNextStep({allow: true}))
        this.enableNext = true;

        // there are no errors that stop the user from advancing to the next step
        this.store.dispatch(setError({error: undefined}))
        
      }else{
        this.store.dispatch(setAllowNextStep({allow: true}))
        this.enableNext = true;

        // there are no errors that stop the user from advancing to the next step
        this.store.dispatch(setError({error: undefined}))

      }
    })).subscribe());
    
  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

  onUsarRecomendacionChanged(checked: boolean){
    this.store.dispatch(updateUsarRecomendacion({usarRecomendacion: checked}))
    if(!checked){
      this.store.dispatch(setTratamientos({tratamientos: []}));
      this.store.dispatch(removeAllProductosSeleccionados());
    }
  }

}
