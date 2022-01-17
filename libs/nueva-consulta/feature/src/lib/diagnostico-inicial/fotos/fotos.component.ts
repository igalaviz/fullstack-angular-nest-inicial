import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FileUploadErrorTypes } from '@fullstack-angular-nest/ui-controls';
import { Store } from '@ngrx/store';
import { FileUploadComponent } from '@fullstack-angular-nest/ui-controls';
import { setFileSelectorError } from '../../state/consultas/consultas.actions';
import { ConsultasState } from '../../state/consultas/consultas.reducer';
import { getFotos } from '../../state/consultas/consultas.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'consultas-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.scss']
})
export class FotosComponent implements AfterViewInit, OnDestroy{
  @ViewChild('fileUpload') fileUpload!: FileUploadComponent;

  // keep track of subscriptions so I can unsubscribe when the component gets destroyed
  subscriptions: Subscription[] = [];

  constructor(private store: Store<ConsultasState>){}

  ngAfterViewInit(): void {
    const fotosSub = this.store.select(getFotos).subscribe(fotos => {
      this.fileUpload.selectedFiles = fotos.map(f => Object.assign({}, {file: f, hasSizeError: false}));
      this.fileUpload.doCountValidation();
      this.fileUpload.doSizeValidation();
    })

    this.subscriptions.push(fotosSub);
  }

  ngOnDestroy(): void {
    for(const sub of this.subscriptions){
      sub.unsubscribe();
    }
  }

  onFileUploadError(errorType: FileUploadErrorTypes){
    // let the user know why they can't advance to the next step
    this.store.dispatch(setFileSelectorError({error: errorType === FileUploadErrorTypes.MAX_COUNT_ERROR ? "Demasiados archivos han sido seleccionados. Por favor remueva 1 o más archivos." : errorType === FileUploadErrorTypes.MAX_SIZE_ERROR ? 'Uno o más archivos exceden el tamaño límite. Por favor reemplácelos o remuévalos.' : 'Un error ha ocurrido.'}))
  }

  onFileUploadSuccess(){
    this.store.dispatch(setFileSelectorError({error: null}))
  }
}
