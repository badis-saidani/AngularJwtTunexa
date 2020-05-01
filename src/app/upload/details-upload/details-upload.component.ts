import { TokenStorageService } from './../../auth/token-storage.service';
import {Component, OnInit, Input} from '@angular/core';
import { fileModel } from 'src/app/models/file-model';
import { UploadFileService } from 'src/app/upload/upload-file.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  // @Input() fileUpload: string;
  @Input() fileUpload: fileModel;

  info: string;
  result: any;

  constructor(private downService: UploadFileService) {}

  ngOnInit() {
    //this.info = this.token.getToken();
  }

  getFile(){
    this.downService.getFile(this.fileUpload.id).subscribe(
      res => {
        this.result = res;
        console.log('res: ' + this.result);

      },
      err => {
        console.log('err: ' + err.error );
        alert('Error occurred while downloading the  File;');
      }
    );
  }


}
