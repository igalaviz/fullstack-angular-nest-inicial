import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { Area, ConsultaService } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ConsultasState, getSelectedFaceAreas } from '../..';

@Component({
  selector: 'consultas-face-interactive-diagram',
  templateUrl: './face-interactive-diagram.component.html',
  styleUrls: ['./face-interactive-diagram.component.css']
})
export class FaceInteractiveDiagramComponent implements OnInit, OnChanges, OnDestroy {
  @Input() diagram: 'musculos' | 'zonas' = 'zonas';
  @Input() angle: 'front' | 'right' | 'left' = 'front'; 
  _allowSelection = false;

  subscriptions: Subscription[] = [];

  get allowSelection(): boolean {
    return this._allowSelection;
  }
  @Input() set allowSelection (newValue: boolean) {
    this._allowSelection = newValue;
    this.doInitialSetup();
  };

  @Output() selected = new EventEmitter<{selectedArea: Area}>();
  @Output() unselected = new EventEmitter<{unselectedArea: Area}>();

  allMusculos: Area[] = [
    {
      pathId: "depresor_superciliar_d",
      nombre: "Depresor Superciliar Derecho"
    },
    {
      pathId: "depresor_superciliar_i",
      nombre: "Depresor Superciliar Izquierdo"
    }
  ];
  allZones: Area[] = [
    {
      pathId: "f1-d",
      nombre: "F1 Derecho"
    },
    {
      pathId: "f1-i",
      nombre: "F1 Izquierdo"
    }
  ]

  // The names of the face areas to be highlighted
  @Input() highlights!: BehaviorSubject<string[]>;
  selections: Area[] = [];

  constructor(private store: Store<ConsultasState>, private consultasService: ConsultaService) { }

  ngOnInit(): void {
    if(this.diagram === 'zonas'){
      const zonasSub = this.consultasService.getAllZonas().subscribe((value) => {
        this.allZones = value;
        this.doInitialSetup();
      })
      this.subscriptions.push(zonasSub);
    }else if(this.diagram === 'musculos'){
      const musculosSub = this.consultasService.getAllMusculos().subscribe((value) => {
        this.allMusculos = value;
        this.doInitialSetup();
      })
      this.subscriptions.push(musculosSub);
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.diagram ? changes.diagram.currentValue === 'zonas' : this.diagram === 'zonas'){
      const zonasSub = this.consultasService.getAllZonas().subscribe((value) => {
        this.allZones = value;
        this.doInitialSetup();
      })
      this.subscriptions.push(zonasSub);
    }else if(changes.diagram ? changes.diagram.currentValue === 'musculos' : this.diagram === 'musculos'){
      const musculosSub = this.consultasService.getAllMusculos().subscribe((value) => {
        this.allMusculos = value;
        this.doInitialSetup();
      })
      this.subscriptions.push(musculosSub);
    }
  }

  ngOnDestroy(): void {
    for(const sub of this.subscriptions){
      sub.unsubscribe();
    }
  }

  doInitialSetup(){
    if(this.allowSelection){
      this.makeAllItemsSelectable();
      const selectedSub = this.store.pipe(select(getSelectedFaceAreas)).subscribe((areas) =>{
        this.selections = areas;
        this.highlightAllSelections();
      })
      this.subscriptions.push(selectedSub);
    }

    if(!this.allowSelection){
      this.makeAllItemsNOTSelectable();
      const highSub = this.highlights.subscribe((highlights) => {
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
    this.subscriptions.push(highSub);
    }
  }

  makeAllItemsSelectable(){
    console.log("make em selectable")
    if(this.diagram === "zonas"){
      setTimeout(() => {
        for(const area of this.allZones){
          const el = document.getElementById(area.pathId);
          if(el){
            el.classList.add('selectable-area');
            el.onclick =  () => {
              this.onSelectableItemClicked(area);
            }
          }
        }
      }, 0)
      
    }else if (this.diagram === "musculos"){
      setTimeout(() => {
        for(const area of this.allMusculos){
          const el = document.getElementById(area.pathId);
          if(el){
            el.classList.add('selectable-area');
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
          const el = document.getElementById(area.pathId);
          if(el){
            el.classList.remove('selectable-area');
            el.onclick = () => {
              //
            }
          }
        }
      }, 0)
      
    }else if (this.diagram === "musculos"){
      setTimeout(() => {
        for(const area of this.allMusculos){
          const el = document.getElementById(area.pathId);
          if(el){
            el.classList.remove('selectable-area');
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
    const foundIndex = this.selections.findIndex(a => a.pathId === area.pathId);
    const el = document.getElementById(area.pathId);

    if(foundIndex !== -1 && el){
      el.classList.remove('selected')
      this.unselected.emit({unselectedArea: area});
    }
    // if it wasn't already selected, select it
    else if(foundIndex === -1 && el){
      el.classList.add('selected')
      this.selected.emit({selectedArea: area});
    }
  }

  highlightAllSelections(){
      if(this.diagram === "zonas"){
        for(const area of this.allZones){
          const wasSelected = this.selections.find(a => a.pathId === area.pathId);
          const el = document.getElementById(area.pathId);
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
          const wasSelected = this.selections.find(a => a.pathId === area.pathId);
          const el = document.getElementById(area.pathId);
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

}
