import { Component, Input } from '@angular/core';

@Component({
  selector: 'consultas-muscles-diagram',
  templateUrl: './muscles-diagram.component.html',
  styleUrls: ['./muscles-diagram.component.scss']
})
export class MusclesDiagramComponent {
  @Input() angle: 'front' | 'right' | 'left' = 'front';
}
