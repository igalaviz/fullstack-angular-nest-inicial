import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray } from '@angular/forms';
import { SelectableFaceArea, ConsultaService, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { select, Store } from '@ngrx/store';
import { addAplicacionProducto, addSelectedFaceArea, deleteSelectedFaceArea, removeAplicacionProducto, updateAplicacionProducto } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getProductoSiendoAplicado, getProductosSeleccionados, getSelectedFaceAreas } from '../../state/consultas/consultas.selectors';
import { ItemFaceAreaComponent } from '../item-face-area/item-face-area.component';

@Component({
  selector: 'consultas-lista-face-areas',
  templateUrl: './lista-face-areas.component.html',
  styleUrls: ['./lista-face-areas.component.scss']
})
export class ListaFaceAreasComponent implements OnInit, AfterViewInit {
  @Input() areasType: "MUSCULOS" | "ZONAS" =  "ZONAS";

  productoEnUso!: ProductoConsulta;
  showAll = true;
  areas: SelectableFaceArea[] = [];

  @ViewChildren(ItemFaceAreaComponent) items!: QueryList<ItemFaceAreaComponent>;
  formArray = new FormArray([]);

  constructor(private consultasService: ConsultaService, private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    if(this.areasType === "ZONAS"){
      this.consultasService.getAllZonas().subscribe((zonas) => {
        this.areas = zonas.map(z => Object.assign({}, {area: z, selected: false}));
      })
    }else {
      this.consultasService.getAllMusculos().subscribe((musculos) => {
        this.areas = musculos.map(m => Object.assign({}, {area: m, selected: false}));
      })
    }

    this.store.pipe(select(getSelectedFaceAreas)).subscribe((selectedAreas) => {
      if(selectedAreas.length > 0){
        for(let i = 0; i < this.areas.length; i++){
          const foundIndex = selectedAreas.findIndex(a => a.id === this.areas[i].area.id)
          if(foundIndex !== -1){
            this.areas[i].selected = true;
          }else{
            this.areas[i].selected = false;
          }
        }
      }else{
        this.areas = this.areas.map(a => Object.assign({}, {...a, selected: false}))
      }
    })

    this.store.pipe(select(getProductoSiendoAplicado)).subscribe((producto) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.productoEnUso = producto!;
    })

    this.store.pipe(select(getProductosSeleccionados)).subscribe((productos) => {
      console.log(productos);
    })
  }

  ngAfterViewInit(): void {
      for(const el of this.items){
        this.formArray.push(el.cantidadControl)
      }
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

}
