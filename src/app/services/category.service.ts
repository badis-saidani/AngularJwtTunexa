import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = window["cfgApiBaseUrl"] + "/api";
  
  private ALL_ATELIER_URL = this.baseUrl + '/categories';
  private ALL_ALLOWED_URL = this.baseUrl + '/allowed/categories';
  private SAVE_UPDATE_ATELIER_URL = this.baseUrl + '/category';
  private DELETE_ATELIER_URL = this.baseUrl + '/categories/';

  constructor(private http: HttpClient) { }

  getAllcategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.ALL_ATELIER_URL);
  }

  getAllowedCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.ALL_ALLOWED_URL);
  }

  postCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.SAVE_UPDATE_ATELIER_URL, category);
  }



  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.SAVE_UPDATE_ATELIER_URL, category);
  }
// + 's/' + category.id
  deleteCategory(id: Number): Observable<any>{

    return this.http.delete(this.DELETE_ATELIER_URL + id);
  }

  errorHandler(error:Response){

    return Observable.throw(error||"SERVER ERROR");
 }

}
