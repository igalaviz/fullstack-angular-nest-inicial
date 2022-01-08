import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Area } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { addAplicacionProducto, addSelectedFaceArea, ConsultasState, deleteSelectedFaceArea, getSelectedFaceAreas } from '../..';

@Component({
  selector: 'consultas-face-interactive-diagram',
  templateUrl: './face-interactive-diagram.component.html',
  styleUrls: ['./face-interactive-diagram.component.css']
})
export class FaceInteractiveDiagramComponent implements OnInit, OnChanges {
  @Input() diagram: 'musculos' | 'zonas' = 'zonas';
  @Input() angle: 'front' | 'right' = 'front'; 
  @Input() allowSelection = false;

  allMusculos: Area[] = [
    {
      id: "",
      nombre: ""
    },
    {
      id: "",
      nombre: ""
    }
  ];
  allZones: Area[] = [
    {
      id: "f1-d",
      nombre: "F1 Derecho"
    },
    {
      id: "f1-i",
      nombre: "F1 Izquierdo"
    }
  ]

  // The names of the face areas to be highlighted
  @Input() highlights!: BehaviorSubject<string[]>;
  selections: Area[] = [];

  //TODO: an event must be emitted every time an area is selected or unselected, so that the saving-in-the-store logic gets abstracted away from this component

  constructor(private store: Store<ConsultasState>) { }

  ngOnInit(): void {
    if(this.allowSelection){
      this.makeAllItemsSelectable();
      this.store.pipe(select(getSelectedFaceAreas)).subscribe((areas) =>{
        this.selections = areas;
        this.highlightAllSelections();
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.allowSelection.currentValue){
      this.makeAllItemsSelectable();
      this.store.pipe(select(getSelectedFaceAreas)).subscribe((areas) =>{
        this.selections = areas;
        this.highlightAllSelections();
      })
    }
  }

  makeAllItemsSelectable(){
    if(this.diagram === "zonas"){
      for(const area of this.allZones){
        const el = document.getElementById(area.id);
        if(el){
          el.addEventListener('click', () => {
            this.onSelectableItemClicked(area);
          });
        }
      }
    }
    
  }

  onSelectableItemClicked(area: Area){
    // if the element was already selected, unselect it
    const foundIndex = this.selections.findIndex(a => a.id === area.id);
    const el = document.getElementById(area.id);

    if(foundIndex !== -1 && el){
      el.classList.remove('selected')
      this.store.dispatch(deleteSelectedFaceArea({area}))
    }
    // if it wasn't already selected, select it
    else if(foundIndex === -1 && el){
      el.classList.add('selected')
      this.store.dispatch(addSelectedFaceArea({area}))

    }
  }

  highlightAllSelections(){
    if(this.diagram === "zonas"){
      for(const area of this.allZones){
        const wasSelected = this.selections.find(a => a.id === area.id);
        const el = document.getElementById(area.id);
        if(wasSelected){
          if(el){
            el.classList.add('selected')
          }
        }else{
          if(el){
            el.classList.remove('selected')
          }
        }
      }
    }
  }

}
