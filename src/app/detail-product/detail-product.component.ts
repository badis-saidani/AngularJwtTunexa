import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { DevisService } from '../services/devis.service';
import { Devis } from '../models/devis';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  tab: Number[] = [1,2,3,3,5,5,5,5,6];

  devis: Devis = new Devis();

  form: any = {};

  product$: Observable<Product>;
  product: Product = new Product();

  isSaveFailed = false;
  toBeUpdated = false;
  errorMessage = '';

  constructor(private devisService: DevisService, private prodService: ProductService,
     private route: ActivatedRoute) { }

  ngOnInit() {

    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.prodService.getAllowedProduct(params.get('id')))
    );

     this.product$.subscribe(
       res => {
        this.product = res;
       },
       err => {console.log('errroor wev cant');
       }
     );
  }

  onSubmit(){
    console.log('badis update? in onSubmit: '+ this.toBeUpdated + ' code : ' + this.devis.id);

      console.log('badis look: '+ this.devis);
      this.devis.productId = this.product.id;
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


  }

  reloadPage() {
    window.location.reload();
  }

  passProd(prod: Product){
    this.product = prod;
  }

  }


