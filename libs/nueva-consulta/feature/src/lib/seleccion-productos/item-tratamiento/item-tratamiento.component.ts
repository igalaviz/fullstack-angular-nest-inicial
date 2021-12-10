import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto, ProductoConsulta, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';

@Component({
  selector: 'consultas-item-tratamiento',
  templateUrl: './item-tratamiento.component.html',
  styleUrls: ['./item-tratamiento.component.scss']
})
export class ItemTratamientoComponent implements OnInit {
  @Input() tratamiento: Tratamiento = {
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
  };
  @Input() productos: ProductoConsulta[] = [
    {
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
    }
  ]
  @Input() chosen = false;

  @Output() toggle = new EventEmitter<Tratamiento>();
  @Output() productoRemove = new EventEmitter<{producto: ProductoConsulta, tratamiento: Tratamiento}>();

  constructor() { }

  ngOnInit(): void {
  }

  onProductoRemoved(producto: ProductoConsulta){
    this.productoRemove.emit({producto, tratamiento: this.tratamiento})
  }

  onMostrarProductosClicked(){
    this.toggle.emit(this.tratamiento);
  }

}
