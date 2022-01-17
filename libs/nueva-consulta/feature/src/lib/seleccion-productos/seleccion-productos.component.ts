import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ConsultasState, getProductosSeleccionados, getTratamientosConProductosSeleccionados, getUsarRecomendacion, setAllowNextStep } from '../..';

@Component({
  selector: 'consultas-seleccion-productos',
  templateUrl: './seleccion-productos.component.html',
  styleUrls: ['./seleccion-productos.component.css']
})
export class SeleccionProductosComponent implements OnInit, OnDestroy {
  usarRecomendaciones = false;

  // here I'll keep track of the Observables I subscribe to, so I can unsubscribe when the component is destroyed
  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    const recSub = this.store.pipe(select(getUsarRecomendacion)).subscribe((value) => {
      this.usarRecomendaciones = value;
    })
    // keeping track of subscriptions so we unsubscribe when the component is destroyed
    this.subscriptions.push(recSub);

    // si el usuario está usando recomendaciones,
    // debe escoger al menos 1 producto para cada tratamiento que haya seleccionado previamente  
    const tratSub = this.store.select(getTratamientosConProductosSeleccionados).subscribe(value => {
      console.log("Hello from the SeleccionProductos component! ^^")
      if(this.usarRecomendaciones){
        // si encuentro un tratamiento que no tiene al menos un producto asignado...
        const foundWithoutProduct = value.find(v => v.productos.length === 0);
        if(foundWithoutProduct){
          //... no dejar al usuario continuar al siguiente paso
          this.store.dispatch(setAllowNextStep({allow: false}));
        }else{
          // no había ningún tratamiento sin al menos 1 producto asignado,
          // así que el usuario puede pasar al siguiente paso
          this.store.dispatch(setAllowNextStep({allow: true}));
        }
        
      }
    })
    // keeping track of subscriptions so we unsubscribe when the component is destroyed
    this.subscriptions.push(tratSub);

    // si el usuario NO está usando recomendaciones,
    // debe escoger al menos 1 producto
    const prodSub = this.store.select(getProductosSeleccionados).subscribe(productosSeleccionados => {
      if(!this.usarRecomendaciones){
        if(productosSeleccionados.length === 0){
          // la lista de productos seleccionados está vacía,
          // así que el usuario no puede pasar al siguiente paso
          this.store.dispatch(setAllowNextStep({allow: false}));
        }else{
          // la lista de productos seleccionados incluye al menos un elemento,
          // así que el usuario sí puede pasar al siguiente paso 
          this.store.dispatch(setAllowNextStep({allow: true}));
        }
      }
    })
    // keeping track of subscriptions so we unsubscribe when the component is destroyed
    this.subscriptions.push(prodSub);
  }

  ngOnDestroy(): void {
    for(const sub of this.subscriptions){
      sub.unsubscribe();
    }
  }

}
