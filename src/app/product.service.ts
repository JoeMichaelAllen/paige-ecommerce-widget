import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'api/products';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET products from the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  // GET: get product from the server
  // Used any becuase getProduct does not guarentee we find a valid product
  getProduct(sku: string): any {
    return this.getProducts().pipe(
      map(products => products.find(product => product.sku == sku))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** PUT: update the product on the server */
  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.productsUrl, product, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteProduct(id: string): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  /* GET products whose name contains search term */
  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productsUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  }

  /* GET products whose color matches the filter color */
  // FIXME: only works with colors for now
  filterProductsByColor(filterColors: string[]): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => filterColors.includes(product.color)))
    );
  }

}
