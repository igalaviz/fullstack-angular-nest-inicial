import { Component, OnInit, ViewChild } from '@angular/core';
import { Consulta, ConsultaService } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { ConsultasState, getAllowNextStep, getComentarios, getDiagnosticoMedico, getFotos, getProductosSeleccionados, getSignosSintomas, getTratamientosSeleccionados, getUsarRecomendacion, loadEstigmas, loadTratsByZona, setFotos } from '../..';
import { DiagnosticoInicialComponent } from '../diagnostico-inicial/diagnostico-inicial.component';

@Component({
  selector: 'consultas-nueva-consulta',
  templateUrl: './nueva-consulta.component.html',
  styleUrls: ['./nueva-consulta.component.scss']
})
export class NuevaConsultaComponent implements OnInit {

  step: 1 | 2 | 3 | 4 = 1;

  allowNextStep = false;

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
  };

  @ViewChild('diagnosticoInicial') diagnosticoInicial!: DiagnosticoInicialComponent;

  constructor(private store: Store<ConsultasState>, private service: ConsultaService) { }

  ngOnInit(): void {
    this.store.select(getAllowNextStep).subscribe((value) => {
      this.allowNextStep = value;
    })

    this.store.select(getComentarios).subscribe((comentarios) => this.consulta.comentarios = comentarios);
    this.store.select(getSignosSintomas).subscribe(signosSintomas => this.consulta.diagnosticoPacienteSeleccionados = signosSintomas);
    this.store.select(getDiagnosticoMedico).subscribe(diagnosticoMedico => this.consulta.diagnosticoMedicoSeleccionados = diagnosticoMedico);
    this.store.select(getFotos).subscribe(fotos => this.consulta.fotos = fotos);
    this.store.select(getProductosSeleccionados).subscribe(productos => this.consulta.productosSeleccionados = productos);
    this.store.select(getTratamientosSeleccionados).subscribe(tratamientos => this.consulta.tratamientosSeleccionados = tratamientos);
    this.store.select(getUsarRecomendacion).subscribe(usarRecomendacion => this.consulta.usarRecomendacion = usarRecomendacion);
  }

  onNextClicked(){
    switch (this.step) {
      case 1:
        this.store.dispatch(setFotos({fotos: this.diagnosticoInicial.columnaFotos.fileUpload.selectedFiles.map(k => k.file)}))
        this.store.dispatch(loadEstigmas());
        this.store.dispatch(loadTratsByZona());
        this.step = 2;
        break;

      case 2:
        this.step = 3;
        break;

      case 3:
        this.step = 4;
        break;

      case 4:
        this.service.guardarDatosConsulta(this.consulta);
        break;

      default:
        break;
    }
  }

  onBackClicked() {
    this.step -= 1;
  }

  onCancelClicked() {
    //
  }

}
