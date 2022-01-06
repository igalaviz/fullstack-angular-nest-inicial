import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { ConsultasState, getProductoSiendoAplicado, setProductoAsAplicado, setProductoSiendoAplicado, setSelectedFaceAreas } from '../..';

@Component({
  selector: 'consultas-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss']
})
export class TrabajoComponent implements OnInit {
  productoEnUso?: ProductoConsulta;

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.store.pipe(select(getProductoSiendoAplicado)).subscribe((value) => {
      this.productoEnUso = value;
    })
  }

  onTerminarAplicandoProductoClicked(){
    if(this.productoEnUso){
      this.store.dispatch(setProductoAsAplicado({producto: this.productoEnUso}));
    }
    this.store.dispatch(setProductoSiendoAplicado({producto: undefined}))
    // the currently selected areas also have to be resetted
    this.store.dispatch(setSelectedFaceAreas({areas: []}))
  }

}
