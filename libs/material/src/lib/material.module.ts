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
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
 
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
  MatIconModule,
  MatSelectModule,
  MatCardModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatDialogModule,
  MatRadioModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule,
]

@NgModule({
  imports: [modules],
  exports: [modules]
})
export class MaterialModule {}
