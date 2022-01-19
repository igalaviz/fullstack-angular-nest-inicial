import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AplicacionProducto, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Subscription } from 'rxjs';

@Component({
  selector: 'consultas-item-producto-aplicado',
  templateUrl: './item-producto-aplicado.component.html',
  styleUrls: ['./item-producto-aplicado.component.scss']
})
export class ItemProductoAplicadoComponent implements OnInit, OnDestroy {
  @Input() producto!: ProductoConsulta;

  @Output() proximaAplicacionChange = new EventEmitter<{proximaAplicacion: string, producto: ProductoConsulta}>();
  @Output() editarAplicacionesClick = new EventEmitter<{producto: ProductoConsulta}>();
  @Output() aplicacionDiscard = new EventEmitter<{aplicacion: AplicacionProducto, producto: ProductoConsulta}>();

  specifyProximaAplicacion = false;
  showAplicaciones = false;

  proximaAplicacionControl = new FormControl('');

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    if(this.producto.proximaAplicacion && this.producto.proximaAplicacion !== ''){
      this.specifyProximaAplicacion = true;
      this.proximaAplicacionControl.setValue(this.producto.proximaAplicacion);
    }else{
      this.specifyProximaAplicacion = false;
    }
    this.subscriptions.push(this.proximaAplicacionControl.valueChanges.subscribe((value) => {
      this.proximaAplicacionChange.emit({proximaAplicacion: value, producto: this.producto});
    }))
  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
  }

  onEspecificarProximaAplicacionClicked(){
    this.specifyProximaAplicacion = true;
    this.proximaAplicacionChange.emit({proximaAplicacion: new Date().toString(), producto: this.producto});
  }

  onEliminarProximaAplicacionClicked(){
    this.specifyProximaAplicacion = false;
    this.proximaAplicacionChange.emit({proximaAplicacion: '', producto: this.producto});
  }

  onDiscardAplicacionClicked(aplicacion: AplicacionProducto) {
    this.aplicacionDiscard.emit({aplicacion, producto: this.producto})
  }

  onEditarAplicacionesClicked(){
    this.editarAplicacionesClick.emit({producto: this.producto});
  }

}
