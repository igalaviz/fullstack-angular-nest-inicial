import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SelectableFaceArea } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Subscription } from 'rxjs';

@Component({
  selector: 'consultas-item-face-area',
  templateUrl: './item-face-area.component.html',
  styleUrls: ['./item-face-area.component.scss']
})
export class ItemFaceAreaComponent implements OnInit, OnDestroy {
  @Input() area!: SelectableFaceArea;
  @Input() unidad: "ML" = "ML";
  @Input() showAll = true;
  @Input() qty = 1;

  @Output() areaSelect = new EventEmitter<{area: SelectableFaceArea, cantidad: number}>();
  @Output() areaUnselect = new EventEmitter<SelectableFaceArea>();
  @Output() areaQtyChange = new EventEmitter<{area: SelectableFaceArea, cantidad: number}>();

  @Input() selected = false;

  cantidadControl = new FormControl(1, [Validators.min(1)]);

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(this.cantidadControl.valueChanges.subscribe((cantidad) => {
      if(cantidad !== this.qty){
        this.qty = cantidad;
        this.areaQtyChange.emit({area: this.area, cantidad});
      }
      
    }))
  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
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
