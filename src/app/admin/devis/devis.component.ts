import { Product } from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import { DevisService } from 'src/app/services/devis.service';
import { Router } from '@angular/router';
import { Devis } from 'src/app/models/devis';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {

  form: any = {};
  devises: Devis[] = [];
  devis: Devis = new Devis();

  prod: Product = new Product();
  isSaveFailed = false;
  toBeUpdated = false;
  errorMessage = '';

  constructor(private devisService: DevisService, private router: Router) { }


  ngOnInit() {


    this.getAllDevises();
   // this.devis= this.devisService.getter();
   //this.devis= new Devis('','');
  }

  getAllDevises() {
    this.devisService.getAllDevis().subscribe(
      res => {
        this.devises = res;
      },
      err => {alert('Error occurred while downloading the list of devises;');}
    );
  }


  updateDevis(devis: Devis) {
    this.devis = devis;
    //this.devis.product = this.prod;
    this.toBeUpdated = true;
    console.log('badis update? in updatedevis : '+ this.toBeUpdated + ' code : ' + this.devis.id);
  }

  createDevis(devis: Devis) {
    this.devis = devis;
    this.toBeUpdated = false;
  }


  onSubmit(){
    console.log('badis update? in onSubmit: '+ this.toBeUpdated + ' code : ' + this.devis.id);
    if(this.toBeUpdated === false){
      console.log('badis look: '+ this.devis);
      this.devisService.postDevis(this.devis).subscribe(
        res => {
          this.reloadPage();
        },
        err => {
          console.log(err);
          this.errorMessage= err.error.message;

          alert('An error occurred while saving the devis');
        }
      );
    } else {
      this.devisService.updateDevis(this.devis).subscribe(
        res => {
          this.reloadPage();
        },
        err => {
          console.log(err);
          this.errorMessage= err.error.message;

          alert('An error occurred while updating the devis');
        }
      );
    }

  }

  deleteDevis(devis: Devis){
    // console.log('si badis: ' + this.toBeDeleted);
    this.devis = devis;
  }

  comfirmDelete(){
    this.devisService.deleteDevis(this.devis.id).subscribe(
      res =>{
        let indexOfDevis = this.devises.indexOf(this.devis);
        this.devises.splice(indexOfDevis, 1);
        this.reloadPage();
      },
      err=>{alert("An error has occurred deleting the devis");}
    );
  }

  reloadPage() {
    window.location.reload();
  }



}
