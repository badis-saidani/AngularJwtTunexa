import { Component, OnInit } from '@angular/core';
import { Contactus } from '../models/contactus';
import { ContactusService } from '../services/contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  form: any = {};
  contactuses: Contactus[] = [];
  contactus: Contactus = new Contactus();


  isSaveFailed = false;
  toBeUpdated = false;
  errorMessage = '';

  constructor(private contactService: ContactusService) { }

  ngOnInit() {
  }

  onSubmit() {
    // console.log('badis update? in onSubmit: ' + this.toBeUpdated + ' code : ' + this.contactus.id);

      console.log('badis look: ' + this.contactus);
      this.contactService.postContactus(this.contactus).subscribe(
        res => {
          this.reloadPage();
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;

          alert('An error occurred while saving the contactus');
        }
      );


  }

  reloadPage() {
    window.location.reload();
  }

}
