import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

interface KoFile {
  file: File,
  hasSizeError: boolean
}

export enum FileUploadErrorTypes {
  MAX_COUNT_ERROR = "max_count",
  MAX_SIZE_ERROR = "max_size"
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

  @Output() fileError = new EventEmitter<{error: FileUploadErrorTypes}>();
  @Output() fileSuccess = new EventEmitter<string>();

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

          if(hasSizeError){
            this.fileError.emit({error: FileUploadErrorTypes.MAX_SIZE_ERROR})
          }
        }
      }
    }
    
    this.doCountValidation();
    this.doSizeValidation();
  }

  doCountValidation(){
    if(this.selectedFiles.length === this.fileMaxCount){
      this.reachedLimit = true;
      this.surpassedLimit = false;
      this.selectButton.disabled = true;
      this.fileSuccess.emit('');
      
    }else if(this.selectedFiles.length > this.fileMaxCount){
      this.reachedLimit = true;
      this.surpassedLimit = true;
      this.selectButton.disabled = true;
      this.fileError.emit({error: FileUploadErrorTypes.MAX_COUNT_ERROR})
    }else{
      this.reachedLimit = false;
      this.surpassedLimit = false;
      this.selectButton.disabled = false;
      this.fileSuccess.emit('');
    }
  }

  doSizeValidation(){
    // try to find an item where hasSizeError is true
    const errorIndex = this.selectedFiles.findIndex(f => f.hasSizeError);

    if(errorIndex !== -1){
      this.fileError.emit({error: FileUploadErrorTypes.MAX_SIZE_ERROR});
    }else{
      this.fileSuccess.emit('');
    }
  }

  onFileRemove(file: File){
    //remove the file from the selectedFiles list
    const index = this.selectedFiles.findIndex(f => f.file == file);

    if(index !== -1){
      this.selectedFiles.splice(index, 1);
    }

    this.doCountValidation();
    this.doSizeValidation();
  }
}
