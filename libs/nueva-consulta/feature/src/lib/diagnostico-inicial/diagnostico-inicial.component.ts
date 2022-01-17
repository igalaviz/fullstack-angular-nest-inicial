import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConsultasState, getDiagnosticoMedico, getFileSelectorError, getSignosSintomas, loadEstigmas, loadTratsByZona, setAllowNextStep, setError, setFotos } from '../..';
import { FotosComponent } from './fotos/fotos.component';

@Component({
  selector: 'consultas-diagnostico-inicial',
  templateUrl: './diagnostico-inicial.component.html',
  styleUrls: ['./diagnostico-inicial.component.scss']
})
export class DiagnosticoInicialComponent implements OnInit{

  @ViewChild('columnaFotos') columnaFotos!: FotosComponent;

  constructor(private store: Store<ConsultasState>){}

  ngOnInit(): void {
    combineLatest([this.store.pipe(select(getSignosSintomas)), this.store.pipe(select(getDiagnosticoMedico)), this.store.pipe(select(getFileSelectorError))]).pipe(tap(([signosSintomas, diagnosticoMedico, fileSelectorError]) => {
      if(signosSintomas.length > 0 && diagnosticoMedico.length > 0 && !fileSelectorError){
        this.store.dispatch(setAllowNextStep({allow: true}))
        // there are no errors that stop the user from advancing to the next step
        this.store.dispatch(setError({error: undefined}))
      }else{
        this.store.dispatch(setAllowNextStep({allow: false}))
        if(fileSelectorError){
          this.store.dispatch(setError({error: fileSelectorError}));
        }else {
          // let the user know why they can't advance to the next step
          this.store.dispatch(setError({error: "Debe seleccionar al menos un..."}))
        }
        
      }
    })).subscribe();
  }

  onNextClicked(){
    // save the files in the store for later usage
    this.store.dispatch(setFotos({fotos: this.columnaFotos.fileUpload.selectedFiles.map(k => k.file)}))
    
    // calcular los tratamientos recomendados por estigmas y por zonas
    this.store.dispatch(loadEstigmas());
    this.store.dispatch(loadTratsByZona());
  }



}
