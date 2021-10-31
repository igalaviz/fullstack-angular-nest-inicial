import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './products/products.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [ProductsComponent],
  exports: [ProductsComponent],
})
export class UserInterfazModule {}
