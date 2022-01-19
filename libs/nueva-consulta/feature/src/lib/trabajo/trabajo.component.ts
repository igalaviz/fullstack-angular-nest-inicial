import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Area, ConsultaService, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { addAplicacionProducto, addSelectedFaceArea, ConsultasState, deleteSelectedFaceArea, getComentarios, getDiagnosticoMedico, getFotos, getProductoSiendoAplicado, getProductosPorAplicar, getProductosSeleccionados, getSignosSintomas, getTratamientosSeleccionados, getUsarRecomendacion, removeAplicacionProducto, setAllowNextStep, setError, setProductoAsAplicado, setProductoSiendoAplicado, setSelectedFaceAreas } from '../..';
import { ListaFaceAreasComponent } from './lista-face-areas/lista-face-areas.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'consultas-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss']
})
export class TrabajoComponent implements OnInit, OnDestroy {
  productoEnUso?: ProductoConsulta;
  allowFaceAreasSelection = false;
  diagramType: 'musculos' | 'zonas' = 'zonas';

  @ViewChild('listaFaceAreas') listaFaceAreas!: ListaFaceAreasComponent;

  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.subscriptions.push(this.store.pipe(select(getProductoSiendoAplicado)).subscribe((value) => {
      this.productoEnUso = value;
      if(this.productoEnUso !== undefined){
        this.allowFaceAreasSelection = true;
        if(this.productoEnUso .producto.funcion.id === 't'){
          this.diagramType = 'musculos';
        }else {
          this.diagramType = 'zonas';
        }
      }else {
        this.allowFaceAreasSelection = false;
      }
    }))

  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

  onAreaSelected(selectedArea: Area){
    this.store.dispatch(addSelectedFaceArea({area: selectedArea}));
    if(this.productoEnUso){
      this.store.dispatch(addAplicacionProducto({aplicacion: {idProducto: this.productoEnUso.producto.id, area: selectedArea, cantidad: 1}, producto: this.productoEnUso}))
    }
  }

  onAreaUnselected(unselectedArea: Area){
    this.store.dispatch(deleteSelectedFaceArea({area: unselectedArea}));
    if(this.productoEnUso){
      this.store.dispatch(removeAplicacionProducto({area: unselectedArea, producto: this.productoEnUso}))
    }
  }

}
