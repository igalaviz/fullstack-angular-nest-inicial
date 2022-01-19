import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Consulta, ConsultaService } from '@fullstack-angular-nest/nueva-consulta/data-access';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ConsultasState, getAllowNextStep, getComentarios, getConsultasError, getDiagnosticoMedico, getFotos, getProductosSeleccionados, getSignosSintomas, getTratamientosSeleccionados, getUsarRecomendacion, loadEstigmas, loadTratsByZona, setFotos } from '../..';
import { DiagnosticoInicialComponent } from '../diagnostico-inicial/diagnostico-inicial.component';

@Component({
  selector: 'consultas-nueva-consulta',
  templateUrl: './nueva-consulta.component.html',
  styleUrls: ['./nueva-consulta.component.scss']
})
export class NuevaConsultaComponent implements OnInit, OnDestroy{

  step: 1 | 2 | 3 | 4 = 1;

  allowNextStep = false;
  whyUserCantMoveToNext = "";

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

  subscriptions: Subscription[] = [];

  @ViewChild('diagnosticoInicial') diagnosticoInicial!: DiagnosticoInicialComponent;

  constructor(private store: Store<ConsultasState>, private service: ConsultaService) { }

  ngOnInit(): void {
    const allowSub = this.store.select(getAllowNextStep).subscribe((value) => {
      setTimeout(() => {
        this.allowNextStep = value;
      }, 0)
    })
    this.subscriptions.push(allowSub);

    const cErrSub = this.store.select(getConsultasError).subscribe((error) => {
      //setTimeout(() => {
        console.log(error);
        this.whyUserCantMoveToNext = error ?? '';
      //}, 0)
      
    })
    this.subscriptions.push(cErrSub);

    this.subscriptions.push(this.store.select(getComentarios).subscribe((comentarios) => this.consulta.comentarios = comentarios));
    this.subscriptions.push(this.store.select(getSignosSintomas).subscribe(signosSintomas => this.consulta.diagnosticoPacienteSeleccionados = signosSintomas));
    this.subscriptions.push(this.store.select(getDiagnosticoMedico).subscribe(diagnosticoMedico => this.consulta.diagnosticoMedicoSeleccionados = diagnosticoMedico));
    this.subscriptions.push(this.store.select(getFotos).subscribe(fotos => this.consulta.fotos = fotos));
    this.subscriptions.push(this.store.select(getProductosSeleccionados).subscribe(productos => this.consulta.productosSeleccionados = productos));
    this.subscriptions.push(this.store.select(getTratamientosSeleccionados).subscribe(tratamientos => this.consulta.tratamientosSeleccionados = tratamientos));
    this.subscriptions.push(this.store.select(getUsarRecomendacion).subscribe(usarRecomendacion => this.consulta.usarRecomendacion = usarRecomendacion));
  }

  ngOnDestroy(): void {
      for(const sub of this.subscriptions){
        sub.unsubscribe();
      }
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
