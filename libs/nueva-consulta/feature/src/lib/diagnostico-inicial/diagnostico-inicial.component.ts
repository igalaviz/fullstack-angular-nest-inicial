import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConsultasState, getDiagnosticoMedico, getSignosSintomas, loadEstigmas } from '../..';

@Component({
  selector: 'consultas-diagnostico-inicial',
  templateUrl: './diagnostico-inicial.component.html',
  styleUrls: ['./diagnostico-inicial.component.scss']
})
export class DiagnosticoInicialComponent implements OnInit{
  enableNext = false;
  constructor(private router: Router, private store: Store<ConsultasState>){}

  ngOnInit(): void {
    combineLatest([this.store.pipe(select(getSignosSintomas)), this.store.pipe(select(getDiagnosticoMedico))]).pipe(tap(([signosSintomas, diagnosticoMedico]) => {
      if(signosSintomas.length > 0 && diagnosticoMedico.length > 0){
        this.enableNext = true;
      }else{
        this.enableNext = false;
      }
    })).subscribe();
  }

  onNextClicked(){
    this.store.dispatch(loadEstigmas());
    this.router.navigateByUrl('/new/tratamientos');
  }



}
