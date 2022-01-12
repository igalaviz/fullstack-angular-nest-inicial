import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Area, ConsultaService } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { addSelectedFaceArea, ConsultasState, deleteSelectedFaceArea, getSelectedFaceAreas } from '../..';

@Component({
  selector: 'consultas-face-interactive-diagram',
  templateUrl: './face-interactive-diagram.component.html',
  styleUrls: ['./face-interactive-diagram.component.css']
})
export class FaceInteractiveDiagramComponent implements OnInit, OnChanges {
  @Input() diagram: 'musculos' | 'zonas' = 'zonas';
  @Input() angle: 'front' | 'right' | 'left' = 'front'; 
  _allowSelection = false;

  get allowSelection(): boolean {
    return this._allowSelection;
  }
  @Input() set allowSelection (newValue: boolean) {
    this._allowSelection = newValue;
    this.doInitialSetup();
  };

  allMusculos: Area[] = [
    {
      id: "depresor_superciliar_d",
      nombre: "Depresor Superciliar Derecho"
    },
    {
      id: "depresor_superciliar_i",
      nombre: "Depresor Superciliar Izquierdo"
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

  constructor(private store: Store<ConsultasState>, private consultasService: ConsultaService) { }

  ngOnInit(): void {
    if(this.diagram === 'zonas'){
      this.consultasService.getAllZonas().subscribe((value) => {
        this.allZones = value;
        this.doInitialSetup();
      })
    }else if(this.diagram === 'musculos'){
      this.consultasService.getAllMusculos().subscribe((value) => {
        this.allMusculos = value;
        this.doInitialSetup();
      })
    }

    //this.doInitialSetup();
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.diagram ? changes.diagram.currentValue === 'zonas' : this.diagram === 'zonas'){
      this.consultasService.getAllZonas().subscribe((value) => {
        this.allZones = value;
        this.doInitialSetup();
      })
    }else if(changes.diagram ? changes.diagram.currentValue === 'musculos' : this.diagram === 'musculos'){
      this.consultasService.getAllMusculos().subscribe((value) => {
        this.allMusculos = value;
        this.doInitialSetup();
      })
    }
  }


  doInitialSetup(){
    if(this.allowSelection){
      this.makeAllItemsSelectable();
      this.store.pipe(select(getSelectedFaceAreas)).subscribe((areas) =>{
        this.selections = areas;
        this.highlightAllSelections();
      })
    }

    if(!this.allowSelection){
      this.makeAllItemsNOTSelectable();
    this.highlights.subscribe((highlights) => {
      //Primero, deseleccionar cualquier zona actualmente seleccionada
      //Después, si el array contiene elementos, seleccionar esos elementos
      //Si el array no tenía elementos, no seleccionar nada
      const elements = document.getElementsByClassName('selected');
      for(let i = 0; i < elements.length; i++){
        elements[i].classList.remove('selected')
      }
      if(highlights.length > 0){
        const toSelect = [];
        for(let b = 0; b < highlights.length; b++){
          const e = document.getElementById(highlights[b]);
          
          if(e) toSelect.push(e);
        }
        for(const el of toSelect){
          el.classList.add('selected');
        }
      }
    })
    }
  }

  makeAllItemsSelectable(){
    console.log("make em selectable")
    if(this.diagram === "zonas"){
      setTimeout(() => {
        for(const area of this.allZones){
          const el = document.getElementById(area.id);
          if(el){
            el.onclick =  () => {
              this.onSelectableItemClicked(area);
            }
          }
        }
      }, 0)
      
    }else if (this.diagram === "musculos"){
      setTimeout(() => {
        for(const area of this.allMusculos){
          const el = document.getElementById(area.id);
          if(el){
            el.onclick = () => {
              this.onSelectableItemClicked(area);
            }
          }
        }
      }, 0)
    }
    
  }

  makeAllItemsNOTSelectable(){
    console.log("make em NOT selectable")
    if(this.diagram === "zonas"){
      setTimeout(() => {
        for(const area of this.allZones){
          const el = document.getElementById(area.id);
          if(el){
            el.onclick = () => {
              //
            }
          }
        }
      }, 0)
      
    }else if (this.diagram === "musculos"){
      setTimeout(() => {
        for(const area of this.allMusculos){
          const el = document.getElementById(area.id);
          if(el){
            el.onclick = () => {
              //
            }
          }
        }
      }, 0)
    }
    
  }

  onSelectableItemClicked(area: Area){
    // if the element was already selected, unselect it
    const foundIndex = this.selections.findIndex(a => a.id === area.id);
    const el = document.getElementById(area.id);

    if(foundIndex !== -1 && el){
      el.classList.remove('selected')
      console.log("Gotta delete it")
      this.store.dispatch(deleteSelectedFaceArea({area}))
    }
    // if it wasn't already selected, select it
    else if(foundIndex === -1 && el){
      el.classList.add('selected')
      console.log("Gotta select it")
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
      }else if(this.diagram === 'musculos'){
        for(const area of this.allMusculos){
          const wasSelected = this.selections.find(a => a.id === area.id);
          const el = document.getElementById(area.id);
          if(wasSelected){
            if(el){
              el.classList.add('selected');
            }
          }else{
            if(el){
              el.classList.remove('selected');
            }
          }
        }
      }
  }

  onAngleChange(angle: 'front' | 'right' | 'left'){
    this.angle = angle;
  }

  /*loadAreas(){
    if(this.diagram === 'zonas'){
      this.consultasService.getAllZonas().subscribe((value) => {
        this.allZones = value;
        this.doInitialSetup();
      })
    }else if(this.diagram === 'musculos'){
      this.consultasService.getAllMusculos().subscribe((value) => {
        this.allMusculos = value;
        this.doInitialSetup();
      })
    }
  }*/

}
