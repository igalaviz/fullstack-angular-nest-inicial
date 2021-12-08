import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { ConsultasState, getTratamientosSeleccionados, getUsarRecomendacion, updateUsarRecomendacion } from '../..';

@Component({
  selector: 'consultas-tratamientos-recomendados',
  templateUrl: './tratamientos-recomendados.component.html',
  styleUrls: ['./tratamientos-recomendados.component.scss']
})
export class TratamientosRecomendadosComponent implements OnInit {
  usarRecomendacion! : boolean;
  enableNext = false;

  constructor(private store: Store<ConsultasState>) {
    combineLatest([store.pipe(select(getUsarRecomendacion)), store.pipe(select(getTratamientosSeleccionados))]).pipe(tap(([usarRecomendacion, tratamientosSeleccionados]) => {
      this.usarRecomendacion = usarRecomendacion;

      if(tratamientosSeleccionados.length === 0 && this.usarRecomendacion){
        this.enableNext = false;
        console.log("first")
      }else if(tratamientosSeleccionados.length === 0 && !this.usarRecomendacion) {
        this.enableNext = true;
        console.log("second")
      }else{
        this.enableNext = true;
        console.log("third")
      }
    })).subscribe();
    
  }

  ngOnInit(): void {
    
  }

  onUsarRecomendacionChanged(checked: boolean){
    this.store.dispatch(updateUsarRecomendacion({usarRecomendacion: checked}))
  }

}
