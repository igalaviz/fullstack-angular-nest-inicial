import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setComentarios } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getComentarios } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit, OnDestroy{
  formControl: FormControl = new FormControl('');

  comentarios = '';

  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((comentarios) => {
      if(this.comentarios !== comentarios){
        this.store.dispatch(setComentarios({comentarios}))
      }
    })

    this.store.select(getComentarios).subscribe(comentarios => {
      this.formControl.setValue(comentarios);
    })

  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

}
