import { Component, ViewChild } from '@angular/core';
import { FileUploadErrorTypes } from '@fullstack-angular-nest/ui-controls';
import { Store } from '@ngrx/store';
import { FileUploadComponent } from '@fullstack-angular-nest/ui-controls';
import { setAllowNextStep, setError } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';

@Component({
  selector: 'consultas-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent {
  @ViewChild('fileUpload') fileUpload!: FileUploadComponent;

  constructor(private store: Store<ConsultasState>){}

  onFileUploadError(errorType: FileUploadErrorTypes){
    this.store.dispatch(setAllowNextStep({allow: false}))
    this.store.dispatch(setError({error: errorType === FileUploadErrorTypes.MAX_COUNT_ERROR ? "Demasiados archivos han sido seleccionados. Por favor remueva 1 o más archivos." : errorType === FileUploadErrorTypes.MAX_SIZE_ERROR ? 'Uno o más archivos exceden el tamaño límite. Por favor reemplácelos o remuevalos.' : 'Un error ha ocurrido.'}))
  }

  onFileUploadSuccess(){
    this.store.dispatch(setAllowNextStep({allow: true}))
    this.store.dispatch(setError({error: null}))
  }
}
