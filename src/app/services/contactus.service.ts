import { Injectable } from '@angular/core';
import { Contactus } from '../models/contactus';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  private baseUrl = window["cfgApiBaseUrl"] + "/api";

  private ALL_ATELIER_URL = this.baseUrl + '/contactuses';
  private SAVE_UPDATE_ATELIER_URL = this.baseUrl + '/allowed/contactus/';
  private DELETE_ATELIER_URL = this.baseUrl + '/contactuses/';

  constructor(private http: HttpClient) { }

  getAllContactus(): Observable<Contactus[]> {
    return this.http.get<Contactus[]>(this.ALL_ATELIER_URL);
  }
  postContactus(contactus: Contactus): Observable<Contactus> {
    return this.http.post<Contactus>(this.SAVE_UPDATE_ATELIER_URL, contactus);
  }

  updateContactus(contactus: Contactus): Observable<Contactus> {
    return this.http.put<Contactus>(this.SAVE_UPDATE_ATELIER_URL, contactus);
  }
// + 's/' + contactus.id
  deleteContactus(id: Number): Observable<any>{

    return this.http.delete(this.DELETE_ATELIER_URL + id);
  }

  errorHandler(error:Response){

    return Observable.throw(error||"SERVER ERROR");
 }

}
