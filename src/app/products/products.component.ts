
import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../product'
import { ProductService } from '../product.service';
import { DataFilterComponent } from '../data-filter/data-filter.component'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  productColors: string[] = [];
  activeColorFilters?: string[];

  /* Flag to trigger async values in child */
  gotColors: boolean = false;

  /* Variables used for pagination */
  p: number = 1;
  count: number = 10;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getProductColors();
  }

  // Get all products for main view
  getProducts(): void {
    this.productService.getProducts()
        .subscribe(products => this.products = products);
  }

  // Handle item deletion
  delete(product: Product): void {
    this.products = this.products.filter(p => p !== product);
    this.productService.deleteProduct(product.id).subscribe();
  }

  // Get all unique product colors
  // FIXME: Should be called once product color is changed to check for new color
  getProductColors(): void {
    this.productService.getProducts()
      .subscribe(products => products.forEach ( (p, i) => {
          if (!this.productColors.includes(p.color)) {
            this.productColors.push(p.color);
            this.productColors.sort();
          }

          /* Set flag for child that colors are done */
          if (i == products.length - 1) {
            this.gotColors = true;
          }
    }));
  }

  // Handle message receive from child component (data-filter)
  receiveMessage($event: any) {
    this.activeColorFilters = $event;

    if (this.activeColorFilters) {
      this.filterProductsByColor(this.activeColorFilters);
    }
  }

  // Handle product filter
  filterProductsByColor(filterColors: string[]) {

    /* If no filters given, show all */
    if (filterColors.length == 0) {
      this.getProducts();
    }
    else {
      this.productService.filterProductsByColor(filterColors)
          .subscribe(products => this.products = products);
    }
  }
}
