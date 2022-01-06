import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { ConsultasState, getProductoSiendoAplicado, setProductoAsAplicado, setProductoSiendoAplicado, setSelectedFaceAreas } from '../..';
import { ListaFaceAreasComponent } from './lista-face-areas/lista-face-areas.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'consultas-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss']
})
export class TrabajoComponent implements OnInit {
  productoEnUso?: ProductoConsulta;

  isListaFaceAreasValid = false;

  @ViewChild('listaFaceAreas') listaFaceAreas!: ListaFaceAreasComponent;

  constructor(private store: Store<ConsultasState>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.store.pipe(select(getProductoSiendoAplicado)).subscribe((value) => {
      this.productoEnUso = value;
    })
  }

  onTerminarAplicandoProductoClicked(){
    if(this.listaFaceAreas.formArray.valid){
      if(this.productoEnUso){
        this.store.dispatch(setProductoAsAplicado({producto: this.productoEnUso}));
      }
      this.store.dispatch(setProductoSiendoAplicado({producto: undefined}))
      // the currently selected areas also have to be resetted
      this.store.dispatch(setSelectedFaceAreas({areas: []}))
    }else {
      this._snackBar.open('Algunos campos contienen valores inválidos.', undefined, {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 2000
      })
    }
    
  }

}
