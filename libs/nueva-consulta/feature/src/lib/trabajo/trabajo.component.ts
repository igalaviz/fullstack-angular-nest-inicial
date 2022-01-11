import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { ConsultasState, getProductoSiendoAplicado, setProductoAsAplicado, setProductoSiendoAplicado, setSelectedFaceAreas } from '../..';
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

  isListaFaceAreasValid = false;

  @ViewChild('listaFaceAreas') listaFaceAreas!: ListaFaceAreasComponent;

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

}
