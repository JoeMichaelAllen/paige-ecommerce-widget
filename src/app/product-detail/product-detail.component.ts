import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  // Get current product being viewed
  getProduct(): void {
    const sku : string = this.route.snapshot.paramMap.get('sku')!;
    this.productService.getProduct(sku)
      .subscribe( (product: Product) => {this.product = product});
  }

  // Go back to previous page 
  goBack(): void {
    this.location.back();
  }

  // Save / Update values in the database
  save(): void {
    if (this.product) {
      this.productService.updateProduct(this.product)
        .subscribe(() => this.goBack());
    }
  }
}
