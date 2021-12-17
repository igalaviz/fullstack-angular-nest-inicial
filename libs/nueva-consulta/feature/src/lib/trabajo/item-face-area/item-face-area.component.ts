import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Area } from '@fullstack-angular-nest/nueva-consulta/data-access';

@Component({
  selector: 'consultas-item-face-area',
  templateUrl: './item-face-area.component.html',
  styleUrls: ['./item-face-area.component.scss']
})
export class ItemFaceAreaComponent implements OnInit {
  @Input() area!: Area;
  @Input() unidad: "ML" = "ML";

  @Output() areaSelect = new EventEmitter<Area>();
  @Output() areaUnselect = new EventEmitter<Area>();
  @Output() areaQtyChange = new EventEmitter<number>();

  selected = false;

  cantidadControl = new FormControl(0);

  ngOnInit(): void {
    this.cantidadControl.valueChanges.subscribe((cantidad) => {
      this.areaQtyChange.emit(cantidad);
    })
  }

  onSelectionChange(checked: boolean){
    if(checked){
      this.areaSelect.emit(this.area);
    }else{
      this.areaUnselect.emit(this.area);
    }
  }

}
