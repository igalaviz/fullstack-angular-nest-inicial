import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'consultas-zones-diagram',
  templateUrl: './zones-diagram.component.html',
  styleUrls: ['./zones-diagram.component.scss']
})
export class ZonesDiagramComponent implements OnInit {
  @Input() angle: 'front' | 'right' | 'left' = 'front';

  ngOnInit(): void {
    console.log()
  }

}
