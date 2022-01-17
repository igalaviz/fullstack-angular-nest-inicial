import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Area, ConsultaService, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { addAplicacionProducto, addSelectedFaceArea, ConsultasState, deleteSelectedFaceArea, getComentarios, getDiagnosticoMedico, getFotos, getProductoSiendoAplicado, getProductosSeleccionados, getSignosSintomas, getTratamientosSeleccionados, getUsarRecomendacion, removeAplicacionProducto, setProductoAsAplicado, setProductoSiendoAplicado, setSelectedFaceAreas } from '../..';
import { ListaFaceAreasComponent } from './lista-face-areas/lista-face-areas.component';

@Component({
  selector: 'consultas-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss']
})
export class TrabajoComponent implements OnInit {
  productoEnUso?: ProductoConsulta;
  allowFaceAreasSelection = false;
  diagramType: 'musculos' | 'zonas' = 'zonas';

  @ViewChild('listaFaceAreas') listaFaceAreas!: ListaFaceAreasComponent;

  // when a button is disabled, show a tooltip with the "latest known error"
  // which means I should be setting the "latest known error" whenever I set "allowNextStep" to false

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    this.store.pipe(select(getProductoSiendoAplicado)).subscribe((value) => {
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
    })
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
