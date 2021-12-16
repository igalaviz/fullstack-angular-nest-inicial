import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';

@Component({
  selector: 'consultas-item-producto-por-aplicar',
  templateUrl: './item-producto-por-aplicar.component.html',
  styleUrls: ['./item-producto-por-aplicar.component.scss']
})
export class ItemProductoPorAplicarComponent implements OnInit {
  @Input() producto: ProductoConsulta;

  @Output() productDiscard = new EventEmitter<ProductoConsulta>();
  @Output() productAplicar = new EventEmitter<ProductoConsulta>();

  constructor() { }

  ngOnInit(): void {
  }

}
