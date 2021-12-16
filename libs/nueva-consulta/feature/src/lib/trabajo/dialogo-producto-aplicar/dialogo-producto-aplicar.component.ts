import { Component, Inject, OnInit } from '@angular/core';
import { Aplicador, ConsultaService, Lote, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'consultas-dialogo-producto-aplicar',
  templateUrl: './dialogo-producto-aplicar.component.html',
  styleUrls: ['./dialogo-producto-aplicar.component.scss']
})
export class DialogoProductoAplicarComponent implements OnInit {
  opcionesAplicadores: Aplicador[] = [];
  lotesDisponibles: Lote[] = [];

  tipoAplicador: "AGUJA" | "CANULA" = "AGUJA";
  aplicador?: Aplicador;
  loteSeleccionado?: Lote;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: ProductoConsulta}, private consultasService: ConsultaService, private store: Store<ConsultaService>) { }

  ngOnInit(): void {
    this.consultasService.getLotesDisponiblesParaProducto(this.data.product.producto.id).subscribe((value) => {
      this.lotesDisponibles = value;
    })
  }

}
