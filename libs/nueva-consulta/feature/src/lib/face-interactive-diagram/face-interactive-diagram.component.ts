import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'consultas-face-interactive-diagram',
  templateUrl: './face-interactive-diagram.component.html',
  styleUrls: ['./face-interactive-diagram.component.css']
})
export class FaceInteractiveDiagramComponent implements OnInit {
  @Input() diagram: 'musculos' | 'zonas' = 'zonas';
  @Input() angle: 'front' | 'right' = 'front'; 

  // The names of the face areas to be highlighted
  @Input() highlights!: BehaviorSubject<string[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
