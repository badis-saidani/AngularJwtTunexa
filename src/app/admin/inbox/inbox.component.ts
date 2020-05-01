import { Product } from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import { ContactusService } from 'src/app/services/contactus.service';
import { Router } from '@angular/router';
import { Contactus } from 'src/app/models/contactus';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  form: any = {};
  contactuses: Contactus[] = [];
  contactus: Contactus = new Contactus();

  prod: Product = new Product();
  isSaveFailed = false;
  toBeUpdated = false;
  errorMessage = '';

  constructor(private contactusService: ContactusService, private router: Router) { }


  ngOnInit() {


    this.getAllContactuses();
   // this.contactus= this.contactusService.getter();
   //this.contactus= new Contactus('','');
  }

  getAllContactuses() {
    this.contactusService.getAllContactus().subscribe(
      res => {
        this.contactuses = res;
      },
      err => {alert('Error occurred while downloading the list of contactuses;');}
    );
  }


  updateContactus(contactus: Contactus) {
    this.contactus = contactus;
    //this.contactus.product = this.prod;
    this.toBeUpdated = true;
    console.log('badis update? in updatecontactus : '+ this.toBeUpdated + ' code : ' + this.contactus.id);
  }

  createContactus(contactus: Contactus) {
    this.contactus = contactus;
    this.toBeUpdated = false;
  }


  onSubmit(){
    console.log('badis update? in onSubmit: '+ this.toBeUpdated + ' code : ' + this.contactus.id);
    if(this.toBeUpdated === false){
      console.log('badis look: '+ this.contactus);
      this.contactusService.postContactus(this.contactus).subscribe(
        res => {
          this.reloadPage();
        },
        err => {
          console.log(err);
          this.errorMessage= err.error.message;

          alert('An error occurred while saving the contactus');
        }
      );
    } else {
      this.contactusService.updateContactus(this.contactus).subscribe(
        res => {
          this.reloadPage();
        },
        err => {
          console.log(err);
          this.errorMessage= err.error.message;

          alert('An error occurred while updating the contactus');
        }
      );
    }

  }

  deleteContactus(contactus: Contactus){
    // console.log('si badis: ' + this.toBeDeleted);
    this.contactus = contactus;
  }

  comfirmDelete(){
    this.contactusService.deleteContactus(this.contactus.id).subscribe(
      res =>{
        let indexOfContactus = this.contactuses.indexOf(this.contactus);
        this.contactuses.splice(indexOfContactus, 1);
        this.reloadPage();
      },
      err=>{alert("An error has occurred deleting the contactus");}
    );
  }

  reloadPage() {
    window.location.reload();
  }



}
