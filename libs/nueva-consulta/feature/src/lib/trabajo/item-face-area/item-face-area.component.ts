import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectableFaceArea } from '@fullstack-angular-nest/nueva-consulta/data-access';

@Component({
  selector: 'consultas-item-face-area',
  templateUrl: './item-face-area.component.html',
  styleUrls: ['./item-face-area.component.scss']
})
export class ItemFaceAreaComponent implements OnInit {
  @Input() area!: SelectableFaceArea;
  @Input() unidad: "ML" = "ML";
  @Input() showAll = true;

  @Output() areaSelect = new EventEmitter<{area: SelectableFaceArea, cantidad: number}>();
  @Output() areaUnselect = new EventEmitter<SelectableFaceArea>();
  @Output() areaQtyChange = new EventEmitter<number>();

  @Input() selected = false;

  cantidadControl = new FormControl(0);

  ngOnInit(): void {
    this.cantidadControl.valueChanges.subscribe((cantidad) => {
      this.areaQtyChange.emit(cantidad);
    })
  }

  onSelectionChange(checked: boolean){
    if(checked){
      this.areaSelect.emit({area: this.area, cantidad: this.cantidadControl.value});
    }else{
      this.areaUnselect.emit(this.area);
    }
  }

}
