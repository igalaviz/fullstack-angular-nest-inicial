import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductoConsulta, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';

@Component({
  selector: 'consultas-item-producto',
  templateUrl: './item-producto.component.html',
  styleUrls: ['./item-producto.component.scss']
})
export class ItemProductoComponent implements OnInit {
  @Input() producto: ProductoConsulta = {
    producto: {
      id: "a",
      nombre: "Botox",
      laboratorio: {
        id: "a",
        nombre: "Allergan",
        funcionesDisponibles: ["t"]
      },
      funcion: {
        id: "t",
        nombre: "Toxina",
        laboratoriosDisponibles: ["a"]
      }
    },
    disponibleEnInventario: true,
    tratamientos: [],
    selected: false
  };
  @Input() activarRecomendaciones = true;
  @Input() opcionesTratamientos: Tratamiento[] = [
    {
      id: "a",
      nombre: "Contorno en F's",
      primario: true,
      selected: false,
      faceAreas: [
        {
          id: "a",
          nombre: "f1-d"
        }
      ]
    },
  ];
  @Input() highlight = true;

  @Output() productoSelect = new EventEmitter<ProductoConsulta>();
  @Output() productoUnselect = new EventEmitter<ProductoConsulta>();
  @Output() productoSelectTratamiento = new EventEmitter<{producto: ProductoConsulta, tratamiento: Tratamiento}>();
  @Output() productoUnselectTratamiento = new EventEmitter<{producto: ProductoConsulta, tratamiento: Tratamiento}>();

  tratamientosControl: FormControl = new FormControl([]);

  ngOnInit(): void {
    this.tratamientosControl.valueChanges.subscribe((tratamientos: Tratamiento[]) => {
      // asignar los tratamientos actualizados al objeto de Producto
      this.producto.tratamientos = tratamientos;

      if(tratamientos.length === 0){
        this.producto.selected = false;
      }else {
        this.producto.selected = true;
      }
      
    })
  }

  onCheckboxChange(checked: boolean){
    this.producto.selected = checked;
    if(checked){
      this.productoSelect.emit(this.producto);
    }else{
      this.productoUnselect.emit(this.producto);
    }
  }

  onTratamientoRemoved(tratamiento: Tratamiento){
    const tratamientos = this.tratamientosControl.value as Tratamiento[];
    this.removeFirst(tratamientos, tratamiento);
    
    this.tratamientosControl.setValue(tratamientos); // To trigger change detection
    this.productoUnselectTratamiento.emit({producto: this.producto, tratamiento});
  }

  onTratamientoSelectionChanged(tratamientos: Tratamiento[]){
    if(this.producto.tratamientos && tratamientos.length > this.producto.tratamientos.length){
      // se añadió un tratamiento
      this.producto.selected = true;
      const tratamientoAgregado: Tratamiento = tratamientos.filter(t => this.producto.tratamientos?.findIndex(l => l.id === t.id) === -1)[0]
      this.productoSelectTratamiento.emit({producto: this.producto, tratamiento: tratamientoAgregado})
    }
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
