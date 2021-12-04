import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const modules = [
  MatExpansionModule,
  MatCheckboxModule,
  MatListModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
]

@NgModule({
  imports: [modules],
  exports: [modules]
})
export class MaterialModule {}
