import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectableFaceArea, ConsultaService, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { addAplicacionProducto, addSelectedFaceArea, deleteSelectedFaceArea, removeAplicacionProducto, setProductoAsAplicado, setProductoSiendoAplicado, setSelectedFaceAreas, updateAplicacionProducto } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getProductoSiendoAplicado, getProductosSeleccionados, getSelectedFaceAreas } from '../../state/consultas/consultas.selectors';
import { ItemFaceAreaComponent } from '../item-face-area/item-face-area.component';

@Component({
  selector: 'consultas-lista-face-areas',
  templateUrl: './lista-face-areas.component.html',
  styleUrls: ['./lista-face-areas.component.scss']
})
export class ListaFaceAreasComponent implements OnInit, AfterViewInit {
  @Input() areasType: "musculos" | "zonas" =  "zonas";

  productoEnUso!: ProductoConsulta;
  showAll = true;
  areas: SelectableFaceArea[] = [];

  deleteAllAplicaciones = false;

  @ViewChildren(ItemFaceAreaComponent) items!: QueryList<ItemFaceAreaComponent>;
  @ViewChild('submitBtn') submitBtn!: HTMLButtonElement;
  @ViewChild('cancelBtn') cancelBtn!: HTMLButtonElement;
  formArray = new FormArray([]);

  constructor(private consultasService: ConsultaService, private store: Store<ConsultasState>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.areasType === "zonas"){
      this.consultasService.getAllZonas().subscribe((zonas) => {
        this.areas = zonas.map(z => Object.assign({}, {area: z, selected: false}));
      })
    }else {
      this.consultasService.getAllMusculos().subscribe((musculos) => {
        this.areas = musculos.map(m => Object.assign({}, {area: m, selected: false}));
      })
    }

    this.store.pipe(select(getProductoSiendoAplicado)).subscribe((producto) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.productoEnUso = producto!;
      if(producto && producto.aplicaciones.length > 0){
        this.deleteAllAplicaciones = false;
      }else {
        this.deleteAllAplicaciones = true;
      }
    })

    this.store.pipe(select(getProductosSeleccionados)).subscribe((productos) => {
      console.log(productos);
    })
  }

  ngAfterViewInit(): void {
    for(const el of this.items){
      this.formArray.push(el.cantidadControl)
    }

    combineLatest(this.store.select(getSelectedFaceAreas), this.store.select(getProductosSeleccionados), (selectedAreas, productos) => {
      console.log("fireeeeEEEEE")
      const producto = productos.filter(p => p.producto.id === this.productoEnUso.producto.id)[0];

      if(selectedAreas.length > 0){
        this.submitBtn.disabled = false;
        for(let i = 0; i < this.areas.length; i++){
          const foundIndex = selectedAreas.findIndex(a => a.id === this.areas[i].area.id)
          if(foundIndex !== -1){
            this.areas[i].selected = true;
            const elToModify = this.items.filter(item => item.area.area.id === this.areas[i].area.id)[0];
            const aplicacion = producto.aplicaciones.find(apl => apl.area.id === this.areas[i].area.id);

            if(aplicacion !== undefined){
              elToModify.cantidadControl.setValue(aplicacion.cantidad);
            }
            
          }else{
            this.areas[i].selected = false;
          }
        }
      }else{
        this.submitBtn.disabled = true;
        this.areas = this.areas.map(a => Object.assign({}, {...a, selected: false}))
      }
    }).subscribe();

    /*this.store.pipe(select(getSelectedFaceAreas)).subscribe((selectedAreas) => {
      if(selectedAreas.length > 0){
        this.submitBtn.disabled = false;
        for(let i = 0; i < this.areas.length; i++){
          const foundIndex = selectedAreas.findIndex(a => a.id === this.areas[i].area.id)
          if(foundIndex !== -1){
            this.areas[i].selected = true;
          }else{
            this.areas[i].selected = false;
          }
        }
      }else{
        this.submitBtn.disabled = true;
        this.areas = this.areas.map(a => Object.assign({}, {...a, selected: false}))
      }
    })*/
  
  }

  onAreaSelected(area: SelectableFaceArea, cantidad: number){
    this.store.dispatch(addSelectedFaceArea({area: area.area}));
    this.store.dispatch(addAplicacionProducto({aplicacion: {idProducto: this.productoEnUso.producto.id, area: area.area, cantidad }, producto: this.productoEnUso}))
  }

  onAreaUnselected(area: SelectableFaceArea){
    this.store.dispatch(deleteSelectedFaceArea({area: area.area}));
    this.store.dispatch(removeAplicacionProducto({area: area.area, producto: this.productoEnUso}))
  }

  onAreaQtyChanged(area: SelectableFaceArea, newQty: number){
    this.store.dispatch(updateAplicacionProducto({aplicacion: {idProducto: this.productoEnUso.producto.id, area: area.area, cantidad: newQty}, producto: this.productoEnUso}));
  }

  onShowAllChanged(checked: boolean){
    this.showAll = checked;
  }

  onTerminarAplicandoProductoClicked(){
    if(this.formArray.valid){
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

  onCancelarClicked(){
    
    for(const area of this.areas.filter(a => a.selected)){
      //this.store.dispatch(deleteSelectedFaceArea({area: area.area}));
      if(this.deleteAllAplicaciones){
        this.store.dispatch(removeAplicacionProducto({area: area.area, producto: this.productoEnUso}))
      }
    }
    this.store.dispatch(setProductoSiendoAplicado({producto: undefined}))
    // the currently selected areas also have to be resetted
    this.store.dispatch(setSelectedFaceAreas({areas: []}))
  }

}
