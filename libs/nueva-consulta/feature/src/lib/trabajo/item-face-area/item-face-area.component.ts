import { Component, EventEmitter, Input, OnInit, Output, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  @Output() areaQtyChange = new EventEmitter<{area: SelectableFaceArea, cantidad: number}>();

  @Input() selected = false;

  cantidadControl = new FormControl(1, [Validators.min(1)]);

  ngOnInit(): void {
    this.cantidadControl.valueChanges.subscribe((cantidad) => {
      this.areaQtyChange.emit({area: this.area, cantidad});
    })
  }

  onSelectionChange(checked: boolean){
    if(checked){
      this.areaSelect.emit({area: this.area, cantidad: this.cantidadControl.value});
    }else{
      // just so this isn't marked as invalid when it's not selected anymore
      this.cantidadControl.setValue(1);
      this.areaUnselect.emit(this.area);
    }
  }

}
