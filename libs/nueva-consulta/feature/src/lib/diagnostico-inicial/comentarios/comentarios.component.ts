import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setComentarios } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';

@Component({
  selector: 'consultas-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit{
  formControl: FormControl = new FormControl('');

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
      this.formControl.valueChanges.subscribe((comentarios) => this.store.dispatch(setComentarios({comentarios})))
  }

}
