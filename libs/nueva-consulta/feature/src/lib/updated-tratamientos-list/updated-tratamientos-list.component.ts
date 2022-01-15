import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { select, Store } from '@ngrx/store';
import { ConsultasState, getTratamientosSeleccionados } from '../..';

@Component({
  selector: 'consultas-updated-tratamientos-list',
  templateUrl: './updated-tratamientos-list.component.html',
  styleUrls: ['./updated-tratamientos-list.component.css']
})
export class UpdatedTratamientosListComponent implements OnInit {
  @Input() tratamientos: Tratamiento[] = [];
  @Input() allowCheck = false;

  @Output() tratamientoCheck = new EventEmitter<{tratamiento: Tratamiento, checked: boolean}>();

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.store.pipe(select(getTratamientosSeleccionados)).subscribe((tratamientosSeleccionados) => {
      // check if any of the treatments we have is in the selecteds list
      for(const [t, tratamiento] of this.tratamientos.entries()){
        const foundIndex = tratamientosSeleccionados.findIndex(tr => tr.clave === tratamiento.clave);

        if(foundIndex !== -1){
          // this tratamiento IS selected
          this.tratamientos = this.tratamientos.map(tr => tr.clave === tratamiento.clave ? {...tr, selected: true} : tr)
        } else{
          // this tratamiento is NOT selected
          this.tratamientos = this.tratamientos.map(tr => tr.clave === tratamiento.clave ? {...tr, selected: false} : tr)
        }
      }
    })
  }

  onTratamientoChecked(tratamiento: Tratamiento, checked: boolean){
    this.tratamientoCheck.emit({tratamiento, checked});
  }
}
