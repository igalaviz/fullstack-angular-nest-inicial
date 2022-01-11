import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'consultas-muscles-diagram',
  templateUrl: './muscles-diagram.component.html',
  styleUrls: ['./muscles-diagram.component.scss']
})
export class MusclesDiagramComponent implements AfterViewInit {
  @Output() svgLoad = new EventEmitter<undefined>();

  @ViewChild('parent') parentSvg!: SVGElement;

  ngAfterViewInit(): void {
    
      this.parentSvg.onload = () => {
        this.svgLoad.emit();
      }
  }

}
