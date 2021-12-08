import { Component, OnInit } from '@angular/core';
import { ConsultasState } from '../../state/consultas/consultas.reducer'
import { getTratamientosSeleccionados } from '../../state/consultas/consultas.selectors';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';

@Component({
  selector: 'consultas-columna-cara',
  templateUrl: './columna-cara.component.html',
  styleUrls: ['./columna-cara.component.css']
})
export class ColumnaCaraComponent implements OnInit {
  highlightAreas: BehaviorSubject<string[]> = new BehaviorSubject(['']);

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.store.pipe(select(getTratamientosSeleccionados)).subscribe((tratamientos) => {
      let newAreas: string[] = [];
      for(const t of tratamientos){
        const areasNames = t.faceAreas.map(f => f.nombre);
        console.log(areasNames);
        newAreas = newAreas.concat(areasNames);
      }
      console.log(tratamientos)
      this.highlightAreas.next(newAreas);
      console.log("NEW AREAS ", newAreas);
    })
  }

}
