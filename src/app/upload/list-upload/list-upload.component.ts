import {Component, OnInit, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UploadFileService} from '../upload-file.service';
import { fileModel } from 'src/app/models/file-model';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  showFile = false
  // fileUploads: Observable<string[]>
  fileUploads: fileModel[];

  @Input() productId: Number;

  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {
  }

  showFiles(enable: boolean) {
    this.showFile = enable

    if (enable) {
      // this.fileUploads = this.uploadService.getFiles();
      this.uploadService.getFilesByDemande(this.productId).subscribe(
        res => {
          this.fileUploads = res;
          this.fileUploads.forEach(element => {
            console.log('asami files : ' + element.name);
          });
        },
        err => {
          console.log('sorryyyy');

        }
      );
    }
  }
}
