import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AplicacionProducto, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';

@Component({
  selector: 'consultas-item-producto-aplicado',
  templateUrl: './item-producto-aplicado.component.html',
  styleUrls: ['./item-producto-aplicado.component.scss']
})
export class ItemProductoAplicadoComponent implements OnInit {
  @Input() producto!: ProductoConsulta;

  @Output() proximaAplicacionChange = new EventEmitter<string>();
  @Output() editarAplicacionesClick = new EventEmitter<{producto: ProductoConsulta}>();
  @Output() aplicacionDiscard = new EventEmitter<{aplicacion: AplicacionProducto, producto: ProductoConsulta}>();

  specifyProximaAplicacion = false;
  showAplicaciones = false;

  proximaAplicacionControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.proximaAplicacionControl.valueChanges.subscribe((value) => {
      this.proximaAplicacionChange.emit(value);
    })
  }

  onEspecificarProximaAplicacionClicked(){
    this.specifyProximaAplicacion = true;
    this.proximaAplicacionChange.emit('');
  }

  onEliminarProximaAplicacionClicked(){
    this.specifyProximaAplicacion = false;
    this.proximaAplicacionChange.emit(undefined);
  }

  onDiscardAplicacionClicked(aplicacion: AplicacionProducto) {
    this.aplicacionDiscard.emit({aplicacion, producto: this.producto})
  }

  onEditarAplicacionesClicked(){
    this.editarAplicacionesClick.emit({producto: this.producto});
  }

}
