import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ConsultasState, getUsarRecomendacion, updateUsarRecomendacion } from '../..';

@Component({
  selector: 'consultas-tratamientos-recomendados',
  templateUrl: './tratamientos-recomendados.component.html',
  styleUrls: ['./tratamientos-recomendados.component.scss']
})
export class TratamientosRecomendadosComponent implements OnInit {
  usarRecomendacion! : boolean;

  constructor(private store: Store<ConsultasState>) {
    store.pipe(select(getUsarRecomendacion)).subscribe((value) => {
      this.usarRecomendacion = value;
    })
    
  }

  ngOnInit(): void {
  }

  onUsarRecomendacionChanged(checked: boolean){
    this.store.dispatch(updateUsarRecomendacion({usarRecomendacion: checked}))
  }

}
