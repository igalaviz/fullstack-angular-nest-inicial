import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'consultas-zones-diagram',
  templateUrl: './zones-diagram.component.html',
  styleUrls: ['./zones-diagram.component.scss']
})
export class ZonesDiagramComponent implements OnInit {
  @Input() highlights: Observable<string[]> = of([]);
  @Input() allowSelection = false;
  @Input() selectionsList: Observable<string[]> = of([]);

  ngOnInit(): void {
    if(!this.allowSelection)
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
