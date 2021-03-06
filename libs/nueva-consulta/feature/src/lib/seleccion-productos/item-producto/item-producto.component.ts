import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductoConsulta, Tratamiento } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Subscription } from 'rxjs';

@Component({
  selector: 'consultas-item-producto',
  templateUrl: './item-producto.component.html',
  styleUrls: ['./item-producto.component.scss']
})
export class ItemProductoComponent implements OnInit, OnDestroy {
  @Input() tratamientos?: Tratamiento[] = [];
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
    selected: false,
    aplicaciones: [],
    proximaAplicacion: "",
    aplicado: false
  };
  @Input() activarRecomendaciones = true;
  @Input() opcionesTratamientos: Tratamiento[] = [
    {
      clave: "a",
      nombre: "Contorno en F's",
      primario: true,
      selected: false,
      faceAreas: [
        {
          pathId: "a",
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

  tratamientosControl: FormControl = new FormControl(this.producto.tratamientos);

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(this.tratamientosControl.valueChanges.subscribe((tratamientos: Tratamiento[]) => {
      // asignar los tratamientos actualizados al objeto de Producto
      this.producto = Object.assign({}, {...this.producto, tratamientos});

      if(tratamientos.length === 0){
        this.producto.selected = false;
      }else {
        this.producto.selected = true;
      }
      
    }))
  }
  
  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
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
    let tratamientos = this.tratamientosControl.value as Tratamiento[];
    tratamientos = tratamientos.filter(t => t.clave !== tratamiento.clave);
    
    this.tratamientosControl.setValue(tratamientos); // To trigger change detection
    this.productoUnselectTratamiento.emit({producto: this.producto, tratamiento});
  }

  onTratamientoSelectionChanged(tratamiento: Tratamiento, checked: boolean){
    
    if(checked){
      // se a??adi?? un tratamiento
      this.productoSelectTratamiento.emit({producto: this.producto, tratamiento: tratamiento})
    }else {
      // se deseleccion?? un tratamiento
      this.productoUnselectTratamiento.emit({producto: this.producto, tratamiento});
    }
  }
}