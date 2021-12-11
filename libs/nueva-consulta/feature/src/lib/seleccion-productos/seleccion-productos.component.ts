import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ConsultasState, getUsarRecomendacion } from '../..';

@Component({
  selector: 'consultas-seleccion-productos',
  templateUrl: './seleccion-productos.component.html',
  styleUrls: ['./seleccion-productos.component.css']
})
export class SeleccionProductosComponent implements OnInit {
  usarRecomendaciones = false;

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.store.pipe(select(getUsarRecomendacion)).subscribe((value) => {
      this.usarRecomendaciones = value;
    })
  }

}
