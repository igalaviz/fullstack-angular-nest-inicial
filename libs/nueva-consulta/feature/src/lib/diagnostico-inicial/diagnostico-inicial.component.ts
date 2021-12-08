import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConsultasState, loadEstigmas } from '../..';

@Component({
  selector: 'consultas-diagnostico-inicial',
  templateUrl: './diagnostico-inicial.component.html',
  styleUrls: ['./diagnostico-inicial.component.scss']
})
export class DiagnosticoInicialComponent{
  constructor(private router: Router, private store: Store<ConsultasState>){}
  onNextClicked(){
    this.store.dispatch(loadEstigmas());
    this.router.navigateByUrl('/new/tratamientos');
  }

}
