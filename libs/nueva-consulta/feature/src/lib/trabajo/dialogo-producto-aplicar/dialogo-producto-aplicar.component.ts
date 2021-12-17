import { Component, Inject, OnInit } from '@angular/core';
import { Aplicador, ConsultaService, Lote, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'consultas-dialogo-producto-aplicar',
  templateUrl: './dialogo-producto-aplicar.component.html',
  styleUrls: ['./dialogo-producto-aplicar.component.scss']
})
export class DialogoProductoAplicarComponent implements OnInit {
  opcionesAplicadores$: Observable<Aplicador[]> = new Observable();
  lotesDisponibles: Lote[] = [];

  tipoAplicador: "A" | "C" = "A";
  aplicador?: Aplicador;
  loteSeleccionado?: Lote;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: ProductoConsulta}, private consultasService: ConsultaService, private store: Store<ConsultaService>) { }

  ngOnInit(): void {
    this.consultasService.getLotesDisponiblesParaProducto(this.data.product.producto.id).subscribe((value) => {
      this.lotesDisponibles = value;
    })
  }

  onTipoAplicadorChange(tipo: "A" | "C") {
    this.tipoAplicador = tipo;
    this.opcionesAplicadores$ = this.consultasService.getOpcionesAplicadores(this.tipoAplicador);
  }

  onAplicadorChange(aplicador: Aplicador) {
    this.aplicador = aplicador;
  }

  onLoteChange(lote: Lote) {
    this.loteSeleccionado = lote;
  }
}
