import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import { Http ,HttpModule} from '@angular/http'
import { Observable } from 'rxjs';
import { fileModel } from '../models/file-model';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private urlbase = window["cfgApiBaseUrl"] + "/api";

  constructor(private http: HttpClient) {}

  getFiles(): Observable<any> {
    return this.http.get(this.urlbase+'/getallfiles');
  }

  /******************************** */
  /* jdiiiiid */

  pushFileToStorage(file: File, productId: Number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.urlbase+'/file/upload/' + productId, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
  getFilesByDemande(productId: Number): Observable<fileModel[]> {
    return this.http.get<fileModel[]>(this.urlbase+'/file/all/' + productId);
  }
  getFile(id: Number){
    return this.http.get(this.urlbase+'/file/' + id);
  }

  deleteFile(id: Number): Observable<any>{

    return this.http.delete(this.urlbase+'/file/delete/' + id);
  }
}
