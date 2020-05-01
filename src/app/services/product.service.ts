import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //private baseUrl = 'http://localhost:8080/api';
  private baseUrl = '/api';

  private ALL_ATELIER_URL = this.baseUrl + '/products';
  private ALLOWED_ATELIER_URL = this.baseUrl + '/allowed/products';
  private ALLOWED_PROD_URL = this.baseUrl + '/allowed/product/';
  private SAVE_UPDATE_ATELIER_URL = this.baseUrl + '/product';
  private DELETE_ATELIER_URL = this.baseUrl + '/products/';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.ALL_ATELIER_URL);
  }

  getAllowedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.ALLOWED_ATELIER_URL);
  }

  getAllowedProductsByCat(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.ALLOWED_ATELIER_URL + '/' + id);
  }

  getAllowedProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.ALLOWED_PROD_URL + id);
  }
  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.SAVE_UPDATE_ATELIER_URL, product);
  }



  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.SAVE_UPDATE_ATELIER_URL, product);
  }
// + 's/' + product.id
  deleteProduct(id: Number): Observable<any>{

    return this.http.delete(this.DELETE_ATELIER_URL + id);
  }

  errorHandler(error:Response){

    return Observable.throw(error||"SERVER ERROR");
 }

}
