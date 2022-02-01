import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConsultasState, getDiagnosticoMedico, getFileSelectorError, getSignosSintomas, loadEstigmas, loadTratsByZona, setAllowNextStep, setError, setFotos } from '../..';
import { FotosComponent } from './fotos/fotos.component';

@Component({
  selector: 'consultas-diagnostico-inicial',
  templateUrl: './diagnostico-inicial.component.html',
  styleUrls: ['./diagnostico-inicial.component.scss']
})
export class DiagnosticoInicialComponent implements OnInit, OnDestroy{

  @ViewChild('columnaFotos') columnaFotos!: FotosComponent;

  // keep track of subscriptions so I can unsusbscribe when the component gets destroyed
  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>){}

  ngOnInit(): void {
    const validationsSub = combineLatest([this.store.pipe(select(getSignosSintomas)), this.store.pipe(select(getDiagnosticoMedico)), this.store.pipe(select(getFileSelectorError))]).pipe(tap(([signosSintomas, diagnosticoMedico, fileSelectorError]) => {
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

    this.subscriptions.push(validationsSub);
  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

  onNextClicked(){
    // save the files in the store for later usage
    this.store.dispatch(setFotos({fotos: this.columnaFotos.fileUpload.selectedFiles.map(k => k.file)}))
    
    // calcular los tratamientos recomendados por estigmas y por zonas
    this.store.dispatch(loadEstigmas());
    this.store.dispatch(loadTratsByZona());
  }



}
