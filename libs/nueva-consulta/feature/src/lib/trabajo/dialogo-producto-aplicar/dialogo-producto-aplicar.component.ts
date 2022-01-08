import { Component, Inject, OnInit } from '@angular/core';
import { Aplicador, ConsultaService, Lote, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'consultas-dialogo-producto-aplicar',
  templateUrl: './dialogo-producto-aplicar.component.html',
  styleUrls: ['./dialogo-producto-aplicar.component.scss']
})
export class DialogoProductoAplicarComponent implements OnInit {
  opcionesAplicadores$: Observable<Aplicador[]> = new Observable();
  lotesDisponibles: Lote[] = [];

  tipoAplicador: "A" | "C" = "A";
  aplicadorSeleccionado?: Aplicador;
  loteSeleccionado?: Lote;

  formGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogoProductoAplicarComponent>, @Inject(MAT_DIALOG_DATA) public data: {product: ProductoConsulta}, private consultasService: ConsultaService, private store: Store<ConsultaService>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.consultasService.getLotesDisponiblesParaProducto(this.data.product.producto.id).subscribe((value) => {
      this.lotesDisponibles = value;
    })

    this.buildFormGroup();
  }

  onTipoAplicadorChange(tipo: "A" | "C") {
    this.tipoAplicador = tipo;
    this.opcionesAplicadores$ = this.consultasService.getOpcionesAplicadores(this.tipoAplicador);
  }

  onAplicadorChange(aplicador: Aplicador) {
    this.aplicadorSeleccionado = aplicador;
    this.formGroup.get('aplicador')?.setValue(aplicador);
  }

  onLoteChange(lote: Lote) {
    this.loteSeleccionado = lote;
    this.formGroup.get('lote')?.setValue(lote);
  }

  onCancelarClicked(){
    this.dialogRef.close();
  }

  buildFormGroup(){
    this.formGroup = this.formBuilder.group(
      {
        aplicador: [undefined, Validators.required],
        lote: [undefined, Validators.required]
      }
    )
  }
}
