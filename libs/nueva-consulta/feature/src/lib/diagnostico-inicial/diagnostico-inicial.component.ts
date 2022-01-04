import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConsultasState, getAllowNextStep, getDiagnosticoMedico, getFotos, getSignosSintomas, loadEstigmas, loadTratsByZona, setAllowNextStep, setFotos } from '../..';
import { FotosComponent } from './fotos/fotos.component';

@Component({
  selector: 'consultas-diagnostico-inicial',
  templateUrl: './diagnostico-inicial.component.html',
  styleUrls: ['./diagnostico-inicial.component.scss']
})
export class DiagnosticoInicialComponent implements OnInit{
  enableNext = false;

  @ViewChild('columnaFotos') columnaFotos!: FotosComponent;

  constructor(private router: Router, private store: Store<ConsultasState>){}

  ngOnInit(): void {
    combineLatest([this.store.pipe(select(getSignosSintomas)), this.store.pipe(select(getDiagnosticoMedico))]).pipe(tap(([signosSintomas, diagnosticoMedico]) => {
      if(signosSintomas.length > 0 && diagnosticoMedico.length > 0){
        this.store.dispatch(setAllowNextStep({allow: true}))
      }else{
        this.store.dispatch(setAllowNextStep({allow: false}))
      }
    })).subscribe();

    this.store.pipe(select(getAllowNextStep)).subscribe((value) => {
      this.enableNext = value;
    })
  }

  onNextClicked(){
    this.store.dispatch(setFotos({fotos: this.columnaFotos.fileUpload.selectedFiles.map(k => k.file)}))
    this.store.dispatch(loadEstigmas());
    this.store.dispatch(loadTratsByZona());
    this.router.navigateByUrl('/new/tratamientos');
  }



}
