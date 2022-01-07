import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'consultas-master-toolbar',
  templateUrl: './master-toolbar.component.html',
  styleUrls: ['./master-toolbar.component.scss']
})
export class MasterToolbarComponent {
  @Output() guardar = new EventEmitter<undefined>();
}
