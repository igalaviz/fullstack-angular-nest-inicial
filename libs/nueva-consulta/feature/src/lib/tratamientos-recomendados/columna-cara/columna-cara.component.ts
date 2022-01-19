import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultasState } from '../../state/consultas/consultas.reducer'
import { getTratamientosSeleccionados } from '../../state/consultas/consultas.selectors';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'consultas-columna-cara',
  templateUrl: './columna-cara.component.html',
  styleUrls: ['./columna-cara.component.css']
})
export class ColumnaCaraComponent implements OnInit, OnDestroy{
  highlightAreas: BehaviorSubject<string[]> = new BehaviorSubject(['']);

  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.subscriptions.push(this.store.pipe(select(getTratamientosSeleccionados)).subscribe((tratamientos) => {
      let newAreas: string[] = [];
      for(const t of tratamientos){
        const areasNames = t.faceAreas.map(f => f.nombre);
        newAreas = newAreas.concat(areasNames);
      }
      this.highlightAreas.next(newAreas);
    }))
  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

}
