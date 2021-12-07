import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
 
const modules = [
  MatExpansionModule,
  MatCheckboxModule,
  MatListModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatIconModule
]

@NgModule({
  imports: [modules],
  exports: [modules]
})
export class MaterialModule {}
