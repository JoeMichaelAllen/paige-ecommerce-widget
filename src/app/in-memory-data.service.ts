import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './product';

import productsData from '../assets/products.json';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const products = productsData;
    return {products};
  }

  // Overrides the genId method to ensure that a product always has an id.
  // If the products array is empty, the method below returns the initial 
  // number (0). If the products array is not empty, the method below returns 
  // the highest product id + 1.
  // genId(products: Product[]): number {
    // return products.length > 0 ? Math.max(Number(...products.map(p => p.id))) + 1 : 0;
  // }
}