import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';

@Component({
  selector: 'consultas-item-producto-por-aplicar',
  templateUrl: './item-producto-por-aplicar.component.html',
  styleUrls: ['./item-producto-por-aplicar.component.scss']
})
export class ItemProductoPorAplicarComponent {
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
    tratamientos: [
      {
        clave: "wow",
        nombre: "Contorno en F's",
        primario: true,
        faceAreas: []
      }
    ],
    selected: false,
    aplicaciones: [],
    proximaAplicacion: "",
    aplicado: false
  };

  @Output() productDiscard = new EventEmitter<ProductoConsulta>();
  @Output() productAplicar = new EventEmitter<ProductoConsulta>();

  onProductoDiscardClick(){
    this.productDiscard.emit(this.producto);
  }

  onProductoAplicarClick(){
    this.productAplicar.emit(this.producto);
  }

}
