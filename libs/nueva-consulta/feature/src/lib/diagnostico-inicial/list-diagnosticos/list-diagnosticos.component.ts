import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DiagnosticoMedico, SignoSintoma } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { addDiagnosticoMedico, addSignoSintoma, deleteDiagnosticoMedico, deleteSignoSintoma, updateDiagnosticoMedico } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getDiagnosticoMedico, getSignosSintomas } from '../../state/consultas/consultas.selectors';

export interface OpcionDiagnostico {
  diagnostico: SignoSintoma | DiagnosticoMedico
  selected: boolean
}

@Component({
  selector: 'consultas-list-diagnosticos',
  templateUrl: './list-diagnosticos.component.html',
  styleUrls: ['./list-diagnosticos.component.scss']
})
export class ListDiagnosticosComponent implements OnInit, OnDestroy{
  @Input() opciones: OpcionDiagnostico[] = []; 
  @Input() type: 'MEDICO' | 'PACIENTE' = 'MEDICO';
  @Input() enableLevels = false;

  count = 0;

  subscriptions: Subscription[] = [];

  @Output() countChange = new EventEmitter<number>();

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    if(this.type === 'MEDICO'){
      const diagnosticoSub = this.store.select(getDiagnosticoMedico).subscribe(diagnosticoMedico => {
        // check if any of the options we have is in the selecteds list
        for(const diagnostico of this.opciones){
          const foundIndex = diagnosticoMedico.findIndex(d => d.clave === diagnostico.diagnostico.clave);

          if(foundIndex !== -1){
            // this option IS selected
            this.opciones = this.opciones.map(d => d.diagnostico.clave === diagnostico.diagnostico.clave ? {...d, selected: true} : d)
          } else{
            // this option is NOT selected
            this.opciones = this.opciones.map(d => d.diagnostico.clave === diagnostico.diagnostico.clave ? {...d, selected: false} : d)
          }
        }
      })
      this.subscriptions.push(diagnosticoSub);
    }else if (this.type === 'PACIENTE'){
      const signosSub = this.store.select(getSignosSintomas).subscribe(signosSintomas => {
          // check if any of the options we have is in the selecteds list
        for(const signoSintoma of this.opciones){
          const foundIndex = signosSintomas.findIndex(d => d.clave === signoSintoma.diagnostico.clave);

          if(foundIndex !== -1){
            // this option IS selected
            this.opciones = this.opciones.map(d => d.diagnostico.clave === signoSintoma.diagnostico.clave ? {...d, selected: true} : d)
          } else{
            // this option is NOT selected
            this.opciones = this.opciones.map(d => d.diagnostico.clave === signoSintoma.diagnostico.clave ? {...d, selected: false} : d)
          }
        }
      })

      this.subscriptions.push(signosSub);
    }
  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

  onCheckChanged(index: number, checked: boolean){
    this.opciones[index].selected = checked;
    if(checked){
      if(this.type === 'MEDICO'){
        this.store.dispatch(addDiagnosticoMedico({diagnosticoMedico: this.opciones[index].diagnostico}))
      }else if (this.type === 'PACIENTE'){
        this.store.dispatch(addSignoSintoma({signoSintoma: this.opciones[index].diagnostico}))
      }
    }else{
      if(this.type === 'MEDICO'){
        this.store.dispatch(deleteDiagnosticoMedico({diagnosticoMedico: this.opciones[index].diagnostico}))
      }else if (this.type === 'PACIENTE'){
        this.store.dispatch(deleteSignoSintoma({signoSintoma: this.opciones[index].diagnostico}))
      }
    }

    if(checked){
      this.count++;
    }else{
      this.count--;
    }
    this.countChange.emit(this.count);
  }

  onLevelChanged(index: number, level: number){
    this.opciones[index].diagnostico = Object.assign({}, {...this.opciones[index].diagnostico, nivel: level})
    this.store.dispatch(updateDiagnosticoMedico({diagnosticoMedico: this.opciones[index].diagnostico}))
  }

}
