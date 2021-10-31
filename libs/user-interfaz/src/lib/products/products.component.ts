import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Product } from '@prisma/client';
import { ProductService } from '../product.service';

@Component({
  selector: 'fullstack-angular-nest-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public $products!: Observable<Product[]>;
  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.$products = this.productService.getProducts();
  }
}
