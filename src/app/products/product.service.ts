import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private products: IProduct[];

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<IProduct[]> {
    if (this.products) {
      return of(this.products);
    }
    return this.http.get<IProduct[]>(this.productsUrl)
      .pipe(
        tap((data) => this.products = data),
        catchError(this.handleError),
      );
  }

  public createProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = null;
    return this.http.post<IProduct>(this.productsUrl, product, { headers })
      .pipe(
        tap((data) => {
          this.products.push(data);
        }),
        catchError(this.handleError),
      );
  }

  public deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<IProduct>(url, { headers })
      .pipe(
        tap((data) => {
          const foundIndex = this.products.findIndex((item) => item.id === id);
          if (foundIndex > -1) {
            this.products.splice(foundIndex, 1);
          }
        }),
        catchError(this.handleError),
      );
  }

  public updateProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<IProduct>(url, product, { headers })
      .pipe(
        // Update the item in the list
        // This is required because the selected product that was edited
        // was a copy of the item from the array.
        tap(() => {
          const foundIndex = this.products.findIndex((item) => item.id === product.id);
          if (foundIndex > -1) {
            this.products[foundIndex] = product;
          }
        }),
        // Return the product on an update
        map(() => product),
        catchError(this.handleError),
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    return throwError(errorMessage);
  }

}
