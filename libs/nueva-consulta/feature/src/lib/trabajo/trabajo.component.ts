import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Consulta, ConsultaService, ProductoConsulta } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { ConsultasState, getComentarios, getDiagnosticoMedico, getFotos, getProductoSiendoAplicado, getProductosSeleccionados, getSignosSintomas, getTratamientosSeleccionados, getUsarRecomendacion, setProductoAsAplicado, setProductoSiendoAplicado, setSelectedFaceAreas } from '../..';
import { ListaFaceAreasComponent } from './lista-face-areas/lista-face-areas.component';
import { switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'consultas-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss']
})
export class TrabajoComponent implements OnInit {
  productoEnUso?: ProductoConsulta;
  allowFaceAreasSelection = false;
  diagramType: 'musculos' | 'zonas' = 'zonas';

  consulta: Consulta = {
    id: '',
    idPaciente: '',
    fecha: new Date().toString(),
    comentarios: '',
    diagnosticoPacienteSeleccionados: [],
    diagnosticoMedicoSeleccionados: [],
    fotos: [],
    productosSeleccionados: [],
    tratamientosSeleccionados: [],
    usarRecomendacion: false
  };;

  isListaFaceAreasValid = false;

  @ViewChild('listaFaceAreas') listaFaceAreas!: ListaFaceAreasComponent;

  constructor(private store: Store<ConsultasState>, private consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.store.pipe(select(getProductoSiendoAplicado)).subscribe((value) => {
      this.productoEnUso = value;
      if(this.productoEnUso !== undefined){
        this.allowFaceAreasSelection = true;
        if(this.productoEnUso .producto.funcion.id === 't'){
          this.diagramType = 'musculos';
        }else {
          this.diagramType = 'zonas';
        }
      }else {
        this.allowFaceAreasSelection = false;
      }
    })

    this.store.select(getComentarios).subscribe((comentarios) => this.consulta.comentarios = comentarios);
    this.store.select(getSignosSintomas).subscribe(signosSintomas => this.consulta.diagnosticoPacienteSeleccionados = signosSintomas);
    this.store.select(getDiagnosticoMedico).subscribe(diagnosticoMedico => this.consulta.diagnosticoMedicoSeleccionados = diagnosticoMedico);
    this.store.select(getFotos).subscribe(fotos => this.consulta.fotos = fotos);
    this.store.select(getProductosSeleccionados).subscribe(productos => this.consulta.productosSeleccionados = productos);
    this.store.select(getTratamientosSeleccionados).subscribe(tratamientos => this.consulta.tratamientosSeleccionados = tratamientos);
    this.store.select(getUsarRecomendacion).subscribe(usarRecomendacion => this.consulta.usarRecomendacion = usarRecomendacion);
  }

  onGuardarConsultaClicked(){
    this.consultaService.guardarDatosConsulta(this.consulta);
  }

}
