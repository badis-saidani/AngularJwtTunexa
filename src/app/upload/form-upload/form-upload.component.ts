import { Product } from './../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from '../upload-file.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }
  errMsg: String;

  @Input() product: Product;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.errMsg = "";
  }

  selectFile(event) {
    const file = event.target.files.item(0)

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0)
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.product.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        
      }
      this.errMsg = "";
    },
    err => {
      this.errMsg = "Failed, File size shouldn\'t be > 1MB";
      //alert(this.errMsg);
    }
    
    )

    this.selectedFiles = undefined
  }
}
