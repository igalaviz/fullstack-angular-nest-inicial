import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadErrorTypes } from '@fullstack-angular-nest/ui-controls';
import { Store } from '@ngrx/store';
import { FileUploadComponent } from '@fullstack-angular-nest/ui-controls';
import { setFileSelectorError } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getFotos } from '../../state/consultas/consultas.selectors';

@Component({
  selector: 'consultas-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements AfterViewInit{
  @ViewChild('fileUpload') fileUpload!: FileUploadComponent;

  constructor(private store: Store<ConsultasState>){}

  ngAfterViewInit(): void {
    this.store.select(getFotos).subscribe(fotos => {
      this.fileUpload.selectedFiles = fotos.map(f => Object.assign({}, {file: f, hasSizeError: false}));
      this.fileUpload.doCountValidation();
      this.fileUpload.doSizeValidation();
    })
  }

  onFileUploadError(errorType: FileUploadErrorTypes){
    // let the user know why they can't advance to the next step
    this.store.dispatch(setFileSelectorError({error: errorType === FileUploadErrorTypes.MAX_COUNT_ERROR ? "Demasiados archivos han sido seleccionados. Por favor remueva 1 o más archivos." : errorType === FileUploadErrorTypes.MAX_SIZE_ERROR ? 'Uno o más archivos exceden el tamaño límite. Por favor reemplácelos o remuévalos.' : 'Un error ha ocurrido.'}))
  }

  onFileUploadSuccess(){
    this.store.dispatch(setFileSelectorError({error: null}))
  }
}
