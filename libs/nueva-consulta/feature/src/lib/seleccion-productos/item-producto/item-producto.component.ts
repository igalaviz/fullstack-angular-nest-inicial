import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoConsulta, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';

@Component({
  selector: 'consultas-item-producto',
  templateUrl: './item-producto.component.html',
  styleUrls: ['./item-producto.component.css']
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
  @Input() activarRecomendaciones = false;
  @Input() opcionesTratamientos: Tratamiento[] = [];
  @Input() highlight = false;

  @Output() productoSelect = new EventEmitter<ProductoConsulta>();
  @Output() productoUnselect = new EventEmitter<ProductoConsulta>();
  @Output() productoSelectTratamiento = new EventEmitter<{producto: ProductoConsulta, tratamiento: Tratamiento}>();
  @Output() productoUnselectTratamiento = new EventEmitter<{producto: ProductoConsulta, tratamiento: Tratamiento}>();

  constructor() { }

  ngOnInit(): void {
  }

  onCheckboxChange(checked: boolean){
    this.producto.selected = checked;
    if(checked){
      this.productoSelect.emit(this.producto);
    }else{
      this.productoUnselect.emit(this.producto);
    }
  }
}
