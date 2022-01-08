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
    console.log()
  }

}
