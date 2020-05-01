import { Component, OnInit, Input } from '@angular/core';
import { Devis } from '../models/devis';
import { DevisService } from '../services/devis.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  product: Product = new Product();
  tab: Number[] = [1, 2, 3, 3, 5, 5, 5, 5, 6];

  devis: Devis = new Devis();

  form: any = {};



  isSaveFailed = false;
  toBeUpdated = false;
  errorMessage = '';

  catId: string = '';
  products$: Observable<Product[]>;
  
  private notifier: NotifierService;

  constructor(private devisService: DevisService,
    private prodService: ProductService,
    private route: ActivatedRoute, notifier: NotifierService ) {
      this.notifier = notifier;
    }

  ngOnInit() {

 
    this.route.paramMap.subscribe(
      params => this.catId = params.get('id')
    );
    if (this.catId != '' && this.catId != null) {
      this.products$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.prodService.getAllowedProductsByCat(params.get('id')))
      );

      this.products$.subscribe(
        res => {
         this.products = res;
         this.notifier.notify( 'success', 'data successfully loaded.' );
        },
        err => {
        this.notifier.notify( 'error', 'Whoops, something went wrong while loading products.' );
        }
      );
      
      } else {
        this.getAllProducts();
      }



  }

  onSubmit() {
      this.devis.productId = this.product.id;
      this.devisService.postDevis(this.devis).subscribe(
        res => {
          this.reloadPage();
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;

          alert('An error occurred while saving the devis');
        }
      );


  }

  reloadPage() {
    window.location.reload();
  }

  getAllProducts() {
  this.notifier.notify('info','       loading data, wait please .....     ');
    this.prodService.getAllowedProducts().subscribe(
      res => {
        this.products = res;
        this.notifier.notify( 'success', 'data successfully loaded.' );
      },
      err => {
        console.log('Error occurred while downloading the list of products;');
    	this.notifier.notify( 'error', 'Whoops, something went wrong while loading products.' );
        
    }
    );
  }

  getAllProductsByCat(id: string) {
  this.notifier.notify('info','       loading data, wait please .....     ');
    this.prodService.getAllowedProductsByCat(id).subscribe(
      res => {
        this.products = res;
        this.notifier.notify( 'success', 'data successfully loaded.' );
      },
      err => {
        console.log('Error occurred while downloading the list of products;');
    	this.notifier.notify( 'error', 'Whoops, something went wrong while loading products.' );
        
    }
    );
  }

  passProd(prod: Product){
    this.product = prod;
  }
}
