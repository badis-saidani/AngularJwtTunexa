import { Injectable } from '@angular/core';
import { Devis } from '../models/devis';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevisService {

  private baseUrl = window["cfgApiBaseUrl"] + "/api";

  private ALL_ATELIER_URL = this.baseUrl + '/devises';
  private SAVE_UPDATE_ATELIER_URL = this.baseUrl + '/allowed/devis/';
  private DELETE_ATELIER_URL = this.baseUrl + '/devises/';

  constructor(private http: HttpClient) { }

  getAllDevis(): Observable<Devis[]> {
    return this.http.get<Devis[]>(this.ALL_ATELIER_URL);
  }
  postDevis(devis: Devis): Observable<Devis> {
    return this.http.post<Devis>(this.SAVE_UPDATE_ATELIER_URL + devis.productId, devis);
  }

  updateDevis(devis: Devis): Observable<Devis> {
    return this.http.put<Devis>(this.SAVE_UPDATE_ATELIER_URL, devis);
  }
// + 's/' + devis.id
  deleteDevis(id: Number): Observable<any>{

    return this.http.delete(this.DELETE_ATELIER_URL + id);
  }

  errorHandler(error:Response){

    return Observable.throw(error||"SERVER ERROR");
 }

}
