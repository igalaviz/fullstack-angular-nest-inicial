import { Component, Input, ViewChild } from '@angular/core';

interface KoFile {
  file: File,
  hasSizeError: boolean
}

@Component({
  selector: 'ko-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent{
  @Input() allowedExtensions: string[] = ["image/*"];
  @Input() fileMaxSize = 2048000;
  @Input() fileMaxCount = 5;

  selectedFiles: KoFile[] = [];

  reachedLimit = false;
  surpassedLimit = false;

  @ViewChild('selectButton') selectButton!: HTMLButtonElement;

  onFilesSelected(event: Event){
    const files = (<HTMLInputElement>event.target).files;
    if(files){
      for (let i = 0; i < files.length; i++) {
        // get item
        const file = files.item(i);
        if(file !== null){
          const hasSizeError = file.size > this.fileMaxSize;
          this.selectedFiles.push({file, hasSizeError});
        }
      }
    }
    
    this.doCountValidation();
  }

  showLimitErrors(){
    
    // mostrar un mensaje de error, no permitir al usuario que continúe
      // (podría haber una propiedad global en el state que se llame 'valid')
      // y pedirle que elimine algunos archivos
  }

  doCountValidation(){
    if(this.selectedFiles.length === this.fileMaxCount){
      this.reachedLimit = true;
      this.surpassedLimit = false;
      this.selectButton.disabled = true;
      
    }else if(this.selectedFiles.length > this.fileMaxCount){
      this.reachedLimit = true;
      this.surpassedLimit = true;
      this.selectButton.disabled = true;
    }else{
      this.reachedLimit = false;
      this.surpassedLimit = false;
      this.selectButton.disabled = false;

    }
  }

  onFileRemove(file: File){
    //remove the file from the selectedFiles list
    const index = this.selectedFiles.findIndex(f => f.file == file);

    if(index !== -1){
      this.selectedFiles.splice(index, 1);
    }

    this.doCountValidation();
  }
}
