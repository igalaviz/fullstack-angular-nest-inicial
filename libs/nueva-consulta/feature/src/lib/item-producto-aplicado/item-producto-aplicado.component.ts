import { Component, Input, OnInit } from '@angular/core';
import { ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';

@Component({
  selector: 'consultas-item-producto-aplicado',
  templateUrl: './item-producto-aplicado.component.html',
  styleUrls: ['./item-producto-aplicado.component.scss']
})
export class ItemProductoAplicadoComponent implements OnInit {
  @Input() producto!: ProductoConsulta;

  constructor() { }

  ngOnInit(): void {
  }

}
