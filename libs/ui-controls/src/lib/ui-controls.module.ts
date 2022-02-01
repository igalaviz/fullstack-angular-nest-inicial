import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MaterialModule } from '@fullstack-angular-nest/material';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    FileUploadComponent
  ],
  exports: [
    FileUploadComponent
  ]
})
export class UiControlsModule {}
